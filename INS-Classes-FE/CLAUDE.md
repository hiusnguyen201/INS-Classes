# INS Classes FE

React SPA for the INS Classes management system. Talks to the Spring Boot BE (`INS-Classes-BE/`) through its `/api` context path.

> **Purpose of this file:** single source of truth for FE structure and conventions. Update the **Implementation Status** section when pages/features are added or changed.

## Tech Stack

- **React 18 + TypeScript + Vite 5**
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin — design tokens live in `src/app/index.css` (`@theme` block)
- Font: **Be Vietnam Pro** (Google Fonts, loaded in `index.html`)
- **react-router-dom** for client-side routing (`app/router.tsx`, `config/paths.ts`)
- **Formik + Yup** for form state and validation in all auth forms
- Design source: Figma file `INS-Classes-Management` (key `XJJGiCIHh65mmSYgu76viC`)

Run: `npm run dev` (http://localhost:5173; proxies `/api` → `http://localhost:8080`, so the BE must be running for API calls). Build: `npm run build`. Lint: `npm run lint`.

## Project Structure

```
src/
├── app/                  # App bootstrap layer
│   ├── App.tsx               # Root component: providers + router
│   ├── provider.tsx          # AppProvider — stack all context providers here
│   └── index.css             # Tailwind entry + design tokens (@theme)
├── features/             # One folder per business module
│   ├── auth/
│   │   ├── api/              # login.ts, register.ts
│   │   ├── components/       # LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm, GoogleLoginButton
│   │   ├── hooks/            # useAuth, useLogin, useRegister
│   │   ├── pages/            # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│   │   ├── stores/           # AuthContext + AuthProvider (current user)
│   │   └── types/            # UserDto, AuthDto, LoginInput, RegisterInput
│   └── users/
│       ├── api/              # getUsers.ts, createUser.ts, updateUser.ts, deleteUser.ts, checkEmail.ts
│       ├── components/       # UserTypeBadge, CreateUserModal, UpdateUserModal, DeleteUserModal
│       ├── hooks/            # useUsers, useCreateUser, useUpdateUser, useDeleteUser
│       ├── pages/            # UsersPage
│       └── types/            # UserType (enum), UserDto, CreateUserInput, UpdateUserInput
├── components/           # Shared UI, no business logic
│   ├── ui/                   # Button, TextField, Checkbox, icons.tsx, UserAvatarInitials (shared across features + layouts)
│   └── layouts/              # AuthLayout, AdminLayout (sticky sidebar 230px + sticky header 60px)
├── lib/                  # Infrastructure wrappers
│   ├── http.ts               # fetch client: base /api, unwraps ApiResponse{data,error}, throws HttpError
│   └── storage.ts            # tokenStorage: localStorage (remember) / sessionStorage
├── types/                # Shared API types: ApiResponse, ListResponse, PageMetadata
├── config/               # env.ts, paths.ts (PATHS const for all routes)
├── hooks/, utils/        # Shared hooks / pure functions (utils/cn.ts)
└── main.tsx
```

## Conventions

1. **One-way imports:** `app → features → components/lib/utils/types`. Features never import other features — shared code moves down to `components/` or `lib/`.
2. **`@/` alias** → `src/` (configured in `vite.config.ts` + `tsconfig.app.json`).
3. **API calls** — one file per BE endpoint in `features/x/api/`, always through `lib/http.ts`. `http.*` returns the unwrapped `data`; errors are thrown as `HttpError { status, code, message }` with the BE's error code/message.
4. **DTO types mirror the BE** (`XxxDto`, `XxxInput`) and live in `features/x/types/`; shared envelope types in `src/types/api.ts`.
5. **Shared UI** (`components/ui/`) takes no business props; icons are inline SVG components (traced from Figma, `currentColor` strokes) in `components/ui/icons.tsx`. `UserAvatarInitials` lives here (not in `features/`) because `AdminLayout` (a shared layout) also needs it.
8. **MUI + Tailwind margin**: Tailwind margin classes (`mt-*`) do not apply directly on MUI components — always wrap them in a plain `<div className="mt-*">` instead.
6. **Design tokens** — Figma colors are named tokens in `app/index.css` (`primary`, `ink`, `muted`, `label`, `faint`, `edge`, `card-edge`, `line`, `ring-soft`). Use tokens, not raw hex, in components.
7. **Forms** — use `useFormik` + Yup `validationSchema` for all forms. Errors show only after field is touched (`formik.touched.field && formik.errors.field`). Wire fields via `{...formik.getFieldProps('field')}` spread on `TextField`; for checkboxes use `formik.setFieldValue` / `setFieldTouched`.

## Implementation Status

- [x] Base structure + Tailwind v4 + design tokens + dev proxy
- [x] Login page (Figma node `131-1351`) wired to `POST /auth/login`; tokens persisted per "remember me" (localStorage vs sessionStorage); BE error message shown on the form
- [x] react-router-dom: `app/router.tsx`, `config/paths.ts` — routes: `/`, `/login`, `/register`, `/forgot-password`, `/reset-password`
- [x] Home / Landing page (Figma node `131-988`) — fully static, 10 components: Navbar, HeroSection, HeroMockup, StatsBar, FeaturesSection, AiSection, AiChatMockup, RolesSection, TestimonialSection, CtaSection, Footer; content in `features/landing/content.ts`
- [x] Register page (Figma node `147-3`) wired to `POST /auth/register`; role selector (Học viên / Giảng viên) is UI-only — BE always assigns USER type
- [x] Forgot Password page (Figma node `147-80`) — UI-only (success state); BE endpoint not yet implemented
- [x] Reset Password page (Figma node `147-115`) — UI-only (success state); BE endpoint not yet implemented
- [x] All auth forms migrated to Formik + Yup (LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm)
- [x] Admin Users CRUD (Figma nodes `150-2187/2416/2687/2958`) — List (paginated, tab filter by type, debounced keyword search, size select 10/25/50/100, all filters synced to URL `?page&size&type&keyword` — survives refresh), Create (password auto-gen on first focus, debounced email-exists check via `GET /users/check-email`, `isSendPasswordViaEmail` checkbox), Update (name + type), Delete (hard-delete via BE); `AdminLayout` with sticky sidebar + sticky header + logout dropdown (shows real user name + type label); `UserAvatarInitials` (deterministic color, circular, `size` prop — lives in `components/ui/`), `UserTypeBadge`; Edit/Delete actions hidden for the currently logged-in user's own row; route `/admin/users`
- [x] Auth form spacing aligned to Figma — card `pt-8.5`, field-to-field gaps `mt-5` via wrapper divs (Tailwind margin on MUI requires a wrapper div), "hoặc" dividers `my-7.25–7.5`, consistent across Login/Register/ForgotPassword/ResetPassword
- [x] `lib/http.ts` auto-injects `Authorization: Bearer <token>` on every request (reads from `tokenStorage`)
- [ ] Google login — button is UI-only
- [x] Token refresh flow (`/auth/refresh`) + TOKEN_EXPIRED interceptor in `lib/http.ts`: queue pattern (one refresh in-flight, others wait), retry original request; on refresh failure clears storage + redirects to `/login`
- [x] User restore on page refresh: `AuthProvider` calls `GET /auth/me` on mount when a token exists in storage; on failure clears storage + deauthorizes
- [ ] Post-login redirect to dashboard (LoginPage still shows welcome placeholder)
- [ ] Admin dashboard, courses, classes, roles pages
