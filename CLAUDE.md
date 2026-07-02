# INS Classes — Monorepo

Class management system (admin / teacher / student).

- **`INS-Classes-BE/`** — Spring Boot 4 REST API (Java 21, Gradle, MySQL).
- **`INS-Classes-FE/`** — React 18 + Vite + TypeScript + Tailwind v4 SPA. Feature-based structure (`src/features/`), login page implemented.
- Root `README.md` — 5-day sprint plan (UTF-16 encoded, Vietnamese). It is a planning reference only; its package layout and entity design do NOT match the actual code.

## Before working on the backend or frontend

**Read the sub-project's `CLAUDE.md` first** (`INS-Classes-BE/CLAUDE.md` / `INS-Classes-FE/CLAUDE.md`) — they document the real structure, conventions, endpoints, and implementation status. Keep their "API Endpoints" / "Implementation Status" sections updated when adding or changing modules.

FE conventions in short: feature-based structure with one-way imports (`app → features → shared`), `@/` alias to `src/`, one BE endpoint per file in `features/x/api/` through `lib/http.ts`, Tailwind design tokens in `src/app/index.css`. Designs come from the Figma file `INS-Classes-Management`.

Key conventions (full details in that file):

1. Every endpoint returns `ApiResponse<T>` (`ApiResponse.ok(...)`); lists use `ListResponse.from(page, mapper)`.
2. Business errors: `throw new BusinessException(ExceptionError.XXX)`; add new codes to the `ExceptionError` enum. Handled centrally by `GlobalExceptionHandler`.
3. Entities extend `BaseEntity` and use Hibernate `@SoftDelete(strategy = TIMESTAMP)` — never handle `deletedAt` manually.
4. DTO naming: `CreateXxxInput` / `UpdateXxxInput` (requests, jakarta validation), `XxxDto` (responses). Partial updates apply non-null fields only.
5. MapStruct mappers live in `service/mapper` (`componentModel = "spring"`).
6. Context path is `/api`; pagination is 1-indexed via `Pageable`.
7. Security: `/auth/**` and `/public/**` are public, everything else requires a Bearer token. Security matchers in `SecurityConfig` are relative to the context path (write `/auth/login`, not `/api/auth/login`).
