# INS Classes FE

React SPA for the INS Classes management system. Talks to the Spring Boot BE (`INS-Classes-BE/`) through its `/api` context path.

> **Purpose of this file:** single source of truth for FE structure and conventions. Update the **Implementation Status** section when pages/features are added or changed.

## Tech Stack

- **React 18 + TypeScript + Vite 5**
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin — design tokens live in `src/app/index.css` (`@theme` block)
- Font: **Be Vietnam Pro** (Google Fonts, loaded in `index.html`)
- **react-router-dom** for client-side routing (`app/router.tsx`, `config/paths.ts`)
- Design source: Figma file `INS-Classes-Management` (key `XJJGiCIHh65mmSYgu76viC`)

Run: `npm run dev` (http://localhost:5173; proxies `/api` → `http://localhost:8080`, so the BE must be running for API calls). Build: `npm run build`. Lint: `npm run lint`.

## Project Structure

```
src/
├── app/                  # App bootstrap layer
│   ├── App.tsx               # Root component: providers + (later) router
│   ├── provider.tsx          # AppProvider — stack all context providers here
│   └── index.css             # Tailwind entry + design tokens (@theme)
├── features/             # One folder per business module
│   └── auth/
│       ├── api/              # One file per BE endpoint (login.ts, register.ts)
│       ├── components/       # LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm, GoogleLoginButton
│       ├── hooks/            # useAuth, useLogin, useRegister
│       ├── pages/            # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│       ├── stores/           # AuthContext + AuthProvider (current user)
│       └── types/            # UserDto, AuthDto, LoginInput, RegisterInput
├── components/           # Shared UI, no business logic
│   ├── ui/                   # Button, TextField, Checkbox, icons.tsx
│   └── layouts/              # AuthLayout (gradient bg + logo + footer)
├── lib/                  # Infrastructure wrappers
│   ├── http.ts               # fetch client: base /api, unwraps ApiResponse{data,error}, throws HttpError
│   └── storage.ts            # tokenStorage: localStorage (remember) / sessionStorage
├── types/                # Shared API types: ApiResponse, ListResponse, PageMetadata
├── config/               # env.ts (VITE_API_URL, defaults to /api)
├── hooks/, utils/        # Shared hooks / pure functions (utils/cn.ts)
└── main.tsx
```

## Conventions

1. **One-way imports:** `app → features → components/lib/utils/types`. Features never import other features — shared code moves down to `components/` or `lib/`.
2. **`@/` alias** → `src/` (configured in `vite.config.ts` + `tsconfig.app.json`).
3. **API calls** — one file per BE endpoint in `features/x/api/`, always through `lib/http.ts`. `http.*` returns the unwrapped `data`; errors are thrown as `HttpError { status, code, message }` with the BE's error code/message.
4. **DTO types mirror the BE** (`XxxDto`, `XxxInput`) and live in `features/x/types/`; shared envelope types in `src/types/api.ts`.
5. **Shared UI** (`components/ui/`) takes no business props; icons are inline SVG components (traced from Figma, `currentColor` strokes) in `components/ui/icons.tsx`.
6. **Design tokens** — Figma colors are named tokens in `app/index.css` (`primary`, `ink`, `muted`, `label`, `faint`, `edge`, `card-edge`, `line`, `ring-soft`). Use tokens, not raw hex, in components.

## Implementation Status

- [x] Base structure + Tailwind v4 + design tokens + dev proxy
- [x] Login page (Figma node `131-1351`) wired to `POST /auth/login`; tokens persisted per "remember me" (localStorage vs sessionStorage); BE error message shown on the form
- [x] react-router-dom: `app/router.tsx`, `config/paths.ts` — routes: `/`, `/login`, `/register`, `/forgot-password`, `/reset-password`
- [x] Home / Landing page (Figma node `131-988`) — fully static, 10 components: Navbar, HeroSection, HeroMockup, StatsBar, FeaturesSection, AiSection, AiChatMockup, RolesSection, TestimonialSection, CtaSection, Footer; content in `features/landing/content.ts`
- [x] Register page (Figma node `147-3`) wired to `POST /auth/register`; role selector (Học viên / Giảng viên) is UI-only — BE always assigns USER type
- [x] Forgot Password page (Figma node `147-80`) — UI-only (success state); BE endpoint not yet implemented
- [x] Reset Password page (Figma node `147-115`) — UI-only (success state); BE endpoint not yet implemented
- [ ] Google login — button is UI-only
- [ ] Token refresh flow (`/auth/refresh`) + authenticated http interceptor
- [ ] Post-login redirect to dashboard (LoginPage still shows welcome placeholder)
- [ ] Everything else (dashboard, classes, users…)
