# INS Classes BE

REST API for a class management system (INS Classes Manager). Manages users (admin / teacher / student), courses, classes, enrollment, attendance, and exercises.

> **Purpose of this file:** single source of truth for project structure and conventions, so any session (human or AI) can work on a new module without re-reading the whole codebase. Update the **API Endpoints** and **Implementation Status** sections whenever a module is added or changed.

## Tech Stack

- **Spring Boot 4.0.6** (Java 21, Gradle)
- **MySQL 8** — `localhost:3307`, database `ins_classes`, timezone `Asia/Ho_Chi_Minh`
- **Spring Data JPA** — `ddl-auto: update` (no migration tool)
- **Lombok** + **MapStruct 1.5.5** (annotation processors)
- Context path: **`/api`** (all endpoints are prefixed, e.g. `/api/users`)
- Pagination is **1-indexed** (`spring.data.web.pageable.one-indexed-parameters=true`)
- **Spring Security + JWT (jjwt 0.12, HS256)** — endpoints are locked down: `/auth/**` and `/public/**` are `permitAll`, everything else requires authentication; unauthenticated requests get a 401 with the `ApiResponse` error envelope (custom `AuthenticationEntryPoint`). Security matchers are **relative to the `/api` context path** (write `/auth/login`, not `/api/auth/login`). `JwtAuthFilter` sets the `SecurityContext` (principal = userId as `Long`) when a valid Bearer token is present. Passwords hashed with BCrypt. JWT secret/lifetimes in `application.properties` (`app.jwt.*`; access 1h, refresh 14d)

Run: `./gradlew bootRun` (MySQL must be running on port 3307)

## Project Structure

```
src/main/java/com/ins/ins_classes_be/
├── InsClassesBeApplication.java
├── config/                  # Spring configuration
│   └── SecurityConfig.java      # Filter chain (stateless, /auth/** + /public/** open, rest authenticated), JSON 401 entry point, PasswordEncoder bean
├── security/                # JWT infrastructure
│   ├── JwtService.java          # Generate/parse HS256 tokens (claims: sub=userId, email, type)
│   └── JwtAuthFilter.java       # Populates SecurityContext from Bearer token; invalid token throws BusinessException (see Known gaps)
├── common/                  # Shared infrastructure (no business logic)
│   ├── ApiResponse.java         # Response envelope: { data, error? }
│   ├── ListResponse.java        # Paginated list: { items, metadata }
│   ├── PageMetadata.java        # page, size, totalCount, totalPages, hasNext/PreviousPage
│   ├── BusinessException.java   # Runtime exception wrapping an ExceptionError
│   ├── ExceptionError.java      # Enum of all error codes (status + code + message)
│   └── GlobalExceptionHandler.java  # @RestControllerAdvice → ApiResponse.error(...)
├── controller/              # REST controllers, thin: delegate to service, wrap in ApiResponse
├── dto/
│   ├── request/             # Input DTOs, named Xxx...Input, with jakarta validation
│   └── response/            # Output DTOs, named XxxDto
├── entity/                  # JPA entities
│   ├── BaseEntity.java          # @MappedSuperclass: createdAt/By, updatedAt/By
│   └── User.java
├── enumeration/             # Enums stored as STRING (e.g. UserType: ADMIN/TEACHER/USER)
├── repository/              # Spring Data JpaRepository interfaces
└── service/                 # Business logic (one service per module)
    └── mapper/              # MapStruct mappers (entity → DTO)
```

## Conventions

These patterns are fixed. Every new module must follow them.

1. **Response envelope** — every endpoint returns `ApiResponse<T>` via `ApiResponse.ok(data)`. Lists return `ApiResponse<ListResponse<XxxDto>>` built with `ListResponse.from(page, mapper::mapToXxxDto)`. Controllers never return raw entities or `ResponseEntity` (except via the exception handler).

2. **Error handling** — business errors are thrown as `throw new BusinessException(ExceptionError.XXX)`. New error codes are added to the `ExceptionError` enum (grouped by module with `// ===== Module =====` comments), each with `HttpStatus`, string code, and default message. `GlobalExceptionHandler` converts them to `ApiResponse.error(code, message)`. Never try/catch business errors in controllers.

3. **Entities** — extend `BaseEntity` (audit timestamps, `@SuperBuilder`). Soft delete via Hibernate `@SoftDelete(strategy = TIMESTAMP, columnName = "deleted_at")` — repository `delete()` then becomes a soft delete and queries auto-filter deleted rows; no manual `deletedAt` handling. IDs are `Long` IDENTITY. Enums use `@Enumerated(EnumType.STRING)`.

4. **DTOs** — requests are `CreateXxxInput` / `UpdateXxxInput` with jakarta validation annotations (`@NotBlank`, `@Email`, ...); responses are `XxxDto`. Update services apply only non-null fields (partial update).

5. **Mappers** — MapStruct interfaces in `service/mapper`, `componentModel = "spring"`, `unmappedTargetPolicy = ReportingPolicy.IGNORE`. Naming: `mapToXxxDto(Xxx entity)`.

6. **Pagination** — controllers accept Spring's `Pageable` directly (`?page=1&size=10&sort=...`, 1-indexed).

### How to add a new module (e.g. Course)

1. `entity/Course.java` — extends `BaseEntity`, `@SoftDelete` if soft-deletable
2. `repository/CourseRepository.java` — `extends JpaRepository<Course, Long>`
3. `dto/request/CreateCourseInput.java`, `UpdateCourseInput.java` + `dto/response/CourseDto.java`
4. `service/mapper/CourseMapper.java` — MapStruct interface
5. Add error codes to `ExceptionError` (e.g. `COURSE_NOT_FOUND`)
6. `service/CourseService.java` — business logic, throws `BusinessException`
7. `controller/CourseController.java` — `@RequestMapping("/courses")`, returns `ApiResponse<T>`

## API Endpoints

All paths are under the `/api` context path.

### Auth

| Method | Path | Description |
|--------|--------------|--------------------------------------------|
| POST | `/auth/register` | Self-registration (name, email, password) — type is always `USER` → `AuthDto` (auto-login) |
| POST | `/auth/login` | Login (email, password) → `AuthDto { accessToken, refreshToken, user }` |
| POST | `/auth/refresh` | Rotate tokens; the refresh token must match `User.refreshToken` in DB |
| GET | `/auth/me` | Current user from Bearer token → `UserDto` |

Refresh tokens are stored on the `User` entity (one valid refresh token per user; a new login overwrites it). No `token_type` claim — access and refresh tokens differ only in lifetime; `/auth/refresh` validates against the stored token. Design spec: root `docs/superpowers/specs/2026-06-11-jwt-auth-design.md`.

### Users

| Method | Path | Description |
|--------|--------------|--------------------------------------------|
| POST | `/users` | Create user (type, name, email, password) |
| GET | `/users` | List users (paginated via `Pageable`) |
| GET | `/users/{id}` | Get user by id |
| PUT | `/users/{id}` | Update user (partial: name, avatar) |
| DELETE | `/users/{id}` | Soft-delete user |

## Implementation Status

Sprint plan reference: root `README.md` (5-day plan — note it describes a different package layout than the actual code; this file reflects reality).

- [x] Project setup (Gradle, MySQL, common infrastructure)
- [x] User CRUD
- [x] Auth (JWT register/login/refresh/me) + Spring Security — endpoints locked down (`/auth/**` + `/public/**` open, rest authenticated); logout not done yet
- [x] JPA auditing — `createdBy`/`updatedBy` via `AuditorAware` (`JpaAuditingConfig`): userId when authenticated, `"SYSTEM"` otherwise (incl. self-registration)
- [ ] Role / Permission (RBAC)
- [ ] Course + CourseModule + ModuleDocument (file upload)
- [ ] Class + ClassSchedule
- [ ] Enrollment (StudentClass, LearningStatus)
- [ ] Teacher Calendar + Attendance
- [ ] Exercise + SubmitExercise
- [ ] Docker / K8s deployment

## Known gaps / TODO

- Users created before BCrypt was introduced have plain-text passwords in the dev DB and cannot log in — re-create them via `POST /users`
- In `SecurityConfig`, `/auth/**` `permitAll` is declared **before** `/auth/me` — first matcher wins, so `/auth/me` and `/auth/refresh` are effectively public (they still work only because they read the `SecurityContext`/token themselves)
- `JwtAuthFilter` no longer catches `BusinessException`, so an invalid/expired Bearer token surfaces as a 500 (filter exceptions bypass `GlobalExceptionHandler`; the JSON 401 entry point only covers missing authentication)
- A refresh token is a validly signed JWT, so it also works as a Bearer token; add a `token_type` claim to fix
- `User.type` is a plain `String` column (diverges from convention #3 `@Enumerated`); the dev DB column is a MySQL `ENUM('ADMIN','TEACHER','USER')` — manually `ALTER`ed on 2026-06-12 because `ddl-auto=update` never alters existing columns, so any future `UserType` change needs a manual migration
- `JwtService.extractUserId` logs the email claim at INFO on every authenticated request (debug leftover)
- `CreateUserInput.isSendPasswordViaEmail` is accepted but not implemented
- No tests yet (only the default `InsClassesBeApplicationTests` context-load test)
