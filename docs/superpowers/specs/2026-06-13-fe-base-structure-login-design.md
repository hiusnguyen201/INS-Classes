# FE Base Structure + Login Page — Design

**Date:** 2026-06-13
**Module:** INS-Classes-FE
**Figma:** [INS-Classes-Management, node 131-1351](https://www.figma.com/design/XJJGiCIHh65mmSYgu76viC/INS-Classes-Management?node-id=131-1351) (Đăng nhập / Login screen)
**Status:** Approved

## Goal

Replace the untouched Vite scaffold with a scalable base structure for the whole FE app (admin / teacher / student), then build the first real page: the Login screen from Figma, wired to the backend `POST /auth/login`.

## Decisions (confirmed with user)

1. **Scope:** Login UI faithful to Figma **and** wired to the real `POST /auth/login`. Google button, "Quên mật khẩu?", "Đăng ký ngay" are UI-only (no BE support yet). No router yet.
2. **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin. Design tokens (colors, fonts from Figma) live in the Tailwind CSS entry file.
3. **Structure:** feature-based (bulletproof-react style) — the user explicitly asked for a senior-level base structure, rejecting a minimal one-page layout.
4. **Tokens:** `accessToken` + `refreshToken` stored in `localStorage`. On login success show a logged-in confirmation state (no page to redirect to until routing lands).

## Base structure

```
INS-Classes-FE/src/
├─ app/                       # App bootstrap layer
│  ├─ App.tsx                 # Root: providers + (later) router
│  ├─ provider.tsx            # All context providers in one place
│  └─ index.css               # Tailwind entry + design tokens
├─ features/                  # One folder per business module
│  └─ auth/
│     ├─ api/                 # One file per endpoint (login.ts)
│     ├─ components/          # LoginForm, GoogleLoginButton… (auth-only)
│     ├─ hooks/               # useLogin…
│     ├─ pages/               # LoginPage.tsx
│     ├─ stores/              # auth state (current user, tokens)
│     └─ types/               # AuthDto, UserDto, LoginInput
├─ components/                # Shared UI, NO business logic
│  ├─ ui/                     # Button, Input, Checkbox, Card…
│  └─ layouts/                # AuthLayout (gradient bg + logo + footer)
├─ lib/                       # Wrappers around infrastructure
│  ├─ http.ts                 # fetch client: base /api, parses ApiResponse{data,error}
│  └─ storage.ts              # typed localStorage access
├─ hooks/                     # Shared hooks (create on first use)
├─ utils/                     # Shared pure functions (create on first use)
├─ types/                     # Shared types: ApiResponse, ListResponse
├─ config/                    # env.ts, paths.ts
└─ main.tsx
```

Conventions:

1. **One-way imports:** `app → features → components/lib/utils/types`. Features never import each other; shared code moves down to `components/` or `lib/`.
2. **`@/` alias** → `src/` (vite.config.ts + tsconfig paths).
3. **One BE endpoint = one file** in `features/x/api/`, all through `lib/http.ts`, matching the BE `ApiResponse<T>` / `ListResponse` envelope.
4. Empty folders (`hooks/`, `utils/`) are only created with their first file.

## Login page

- `components/layouts/AuthLayout.tsx` — light-blue gradient background, "INS Classes" logo on top, copyright footer; reused later by Register.
- `features/auth/pages/LoginPage.tsx` — white card: title "Đăng nhập", subtitle, Email + Mật khẩu inputs (icons, show/hide password toggle), "Ghi nhớ đăng nhập" checkbox, "Quên mật khẩu?" link, primary submit button, "hoặc" divider, "Tiếp tục với Google" button, "Đăng ký ngay" link.
- Visual details (colors, spacing, typography) are taken from the Figma node via the Figma MCP design context at implementation time.

## Data flow & errors

- Submit → `POST /api/auth/login` (Vite dev proxy `/api` → `http://localhost:8080`) → success: persist tokens via `lib/storage.ts`, set user in auth store, show welcome state.
- BE business error (`INVALID_CREDENTIALS`): show `error.message` from the envelope above the form. Network/5xx: generic Vietnamese error message. Button disabled + loading state while in flight.
- Client validation: email format, non-empty password — per-field messages under the inputs.

## Testing / verification

`npm run build` must pass. Manual check with `npm run dev` + running BE: successful login with a real DB user, and the wrong-password path showing the BE error message. UI compared against the Figma screenshot.

## Out of scope

Routing, refresh-token flow, Google OAuth, forgot password, register page, automated FE tests.
