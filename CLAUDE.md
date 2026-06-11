# INS Classes — Monorepo

Class management system (admin / teacher / student).

- **`INS-Classes-BE/`** — Spring Boot 4 REST API (Java 21, Gradle, MySQL). The active project.
- **`INS-Classes-FE/`** — React + Vite + TypeScript. Untouched scaffold, no real code yet.
- Root `README.md` — 5-day sprint plan (UTF-16 encoded, Vietnamese). It is a planning reference only; its package layout and entity design do NOT match the actual code.

## Before working on the backend

**Read `INS-Classes-BE/README.md` first** — it documents the real structure, conventions, endpoints, and implementation status. Keep its "API Endpoints" and "Implementation Status" sections updated when adding or changing modules.

Key conventions (full details in that file):

1. Every endpoint returns `ApiResponse<T>` (`ApiResponse.ok(...)`); lists use `ListResponse.from(page, mapper)`.
2. Business errors: `throw new BusinessException(ExceptionError.XXX)`; add new codes to the `ExceptionError` enum. Handled centrally by `GlobalExceptionHandler`.
3. Entities extend `BaseEntity` and use Hibernate `@SoftDelete(strategy = TIMESTAMP)` — never handle `deletedAt` manually.
4. DTO naming: `CreateXxxInput` / `UpdateXxxInput` (requests, jakarta validation), `XxxDto` (responses). Partial updates apply non-null fields only.
5. MapStruct mappers live in `service/mapper` (`componentModel = "spring"`).
6. Context path is `/api`; pagination is 1-indexed via `Pageable`.
