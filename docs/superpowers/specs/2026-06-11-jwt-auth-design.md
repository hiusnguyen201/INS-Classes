# JWT Auth (login / refresh / me) — Design

**Date:** 2026-06-11
**Module:** INS-Classes-BE
**Status:** Approved

## Goal

Add email/password login with JWT to the backend. Scope: `POST /auth/login`, `POST /auth/refresh`, `GET /auth/me`. Register and logout are out of scope (admins create users via `/users`; logout can be added later by clearing `User.refreshToken`).

## Decisions (confirmed with user)

1. **Scope:** login + refresh + me. No register/logout.
2. **Enforcement:** token issuing only — all endpoints stay `permitAll` for now. Locking down APIs is a later step (one config change).
3. **Passwords:** BCrypt via `PasswordEncoder`. Existing plain-text dev users must be re-created via `POST /users`; no migration.
4. **Architecture:** `spring-boot-starter-security` + jjwt (HS256). Custom `JwtAuthFilter` populates the `SecurityContext` when a valid Bearer token is present.
5. **Refresh token:** stored on the `User` entity (`refreshToken` column). No `token_type` claim — `/auth/refresh` validates by comparing the presented token against the stored one. New login overwrites the stored token, so each user has exactly one valid refresh token (single refresh session).
6. **Login response:** `AuthDto { accessToken, refreshToken, user: UserDto }`.

## Endpoints

All under context path `/api`, all return `ApiResponse<T>`.

| Method | Path | Request | Response | Errors |
|--------|------|---------|----------|--------|
| POST | `/auth/login` | `LoginInput { email, password }` | `AuthDto` | `INVALID_CREDENTIALS` (unknown email or wrong password — same code, no user enumeration) |
| POST | `/auth/refresh` | `RefreshTokenInput { refreshToken }` | `AuthDto` (rotated pair) | `TOKEN_EXPIRED`, `TOKEN_INVALID` (bad signature, unknown user, or mismatch with stored token) |
| GET | `/auth/me` | Bearer token | `UserDto` | `UNAUTHORIZED` (missing/invalid token) |

## Components

New files:

- `config/SecurityConfig.java` — `SecurityFilterChain`: CSRF off, stateless sessions, `anyRequest().permitAll()`, registers `JwtAuthFilter`; `BCryptPasswordEncoder` bean.
- `security/JwtService.java` — generates/parses HS256 JWTs (jjwt 0.12.x). Claims: `sub` = userId, `email`, `type` (UserType). Access and refresh tokens differ only in lifetime. Throws `BusinessException(TOKEN_EXPIRED / TOKEN_INVALID)` on parse failure.
- `security/JwtAuthFilter.java` — `OncePerRequestFilter`; if a valid Bearer token is present, sets a `UsernamePasswordAuthenticationToken` (principal = userId) in the `SecurityContext`; otherwise lets the request through unauthenticated (nothing is enforced yet).
- `dto/request/LoginInput.java`, `dto/request/RefreshTokenInput.java` — jakarta validation.
- `dto/response/AuthDto.java` — `accessToken`, `refreshToken`, `user`.
- `service/AuthService.java` — `login`, `refresh`, `getCurrentUser`. On login/refresh: issue both tokens, persist the refresh token on the user, return `AuthDto`.
- `controller/AuthController.java` — `@RequestMapping("/auth")`, `@Valid` inputs, thin delegation.

Changed files:

- `build.gradle` — add `spring-boot-starter-security`, `jjwt-api` / `jjwt-impl` / `jjwt-jackson` 0.12.x.
- `application.properties` — `app.jwt.secret` (dev value; >= 32 bytes), `app.jwt.access-token-expiration-ms` = 3 600 000 (1h), `app.jwt.refresh-token-expiration-ms` = 1 209 600 000 (14d).
- `entity/User.java` — add `@Column(length = 512) private String refreshToken;` (`ddl-auto: update` adds the column).
- `repository/UserRepository.java` — add `Optional<User> findByEmail(String email)`.
- `service/UserService.java` — hash password with `PasswordEncoder` in `createUser`.
- `controller/UserController.java` — add missing `@Valid` to create/update (known gap; needed so password/email validation actually runs).
- `INS-Classes-BE/CLAUDE.md` — endpoints table, implementation status, remove the plain-text-password gap.

## Known accepted trade-offs

- A refresh token is a validly signed JWT, so it technically works as an access token on `/auth/me`. Harmless at current scope; add a `token_type` claim later if enforcement requires it.
- Single refresh session per user: logging in on a new device invalidates the previous device's refresh token.
- Expired access tokens on `/auth/me` surface as `UNAUTHORIZED` (filter is lenient and never blocks; the service checks the `SecurityContext`).

## Testing

Unit tests (no Spring context, no DB):

- `JwtServiceTest` — generate/parse round-trip, expired token → `TOKEN_EXPIRED`, garbage/wrong-key token → `TOKEN_INVALID`.
- `AuthServiceTest` (Mockito) — login success persists refresh token; wrong password and unknown email → `INVALID_CREDENTIALS`; refresh with token not matching the stored one → `TOKEN_INVALID`.

No integration tests for the filter at this step.
