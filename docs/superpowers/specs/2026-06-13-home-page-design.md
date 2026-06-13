# Home / Landing Page — Design

**Date:** 2026-06-13
**Module:** INS-Classes-FE — `features/landing/`
**Figma:** [INS-Classes-Management, node 131-988](https://www.figma.com/design/XJJGiCIHh65mmSYgu76viC/INS-Classes-Management?node-id=131-988) (Landing / Home screen)
**Branch:** feature/home
**Status:** Approved

## Goal

Build the public-facing landing page (trang giới thiệu sản phẩm) from Figma. All content is static. Add `react-router-dom` so `/` renders HomePage and `/login` renders LoginPage, removing the current single-page hardwire.

## Routing

Install `react-router-dom`. `app/router.tsx` declares two routes:

- `/` → `features/landing/pages/HomePage`
- `/login` → `features/auth/pages/LoginPage`

`App.tsx` wraps providers around `RouterProvider`. Nav anchor links scroll to in-page sections (`#tinh-nang`, `#tro-ly-ai`, `#vai-tro`). CTA buttons ("Đăng nhập", "Dùng thử miễn phí", "Bắt đầu ngay") route to `/login`.

## Structure

```
features/landing/
├── pages/HomePage.tsx        # Assembles sections in order, ~20 lines
├── content.ts                # ALL static text/data (stats, features, roles, footer links…)
└── components/
    ├── Navbar.tsx             # Logo + 4 nav links + Đăng nhập + CTA pill
    ├── HeroSection.tsx        # Badge, headline, description, 2 CTAs, trust row + avatars
    ├── HeroMockup.tsx         # "Lớp học của tôi" dashboard card + floating badges (94%, 2.4 tỷ)
    ├── StatsBar.tsx           # Dark-blue bar with 4 stats
    ├── FeaturesSection.tsx    # Section heading + 3×2 grid of FeatureCard
    ├── AiSection.tsx          # Light-purple bg, 4 bullet list + AiChatMockup
    ├── AiChatMockup.tsx       # Chat card "Trợ lý AI INS"
    ├── RolesSection.tsx       # 3 RoleCard columns
    ├── TestimonialSection.tsx # Single quote + avatar
    ├── CtaSection.tsx         # Gradient-blue banner + 2 buttons
    └── Footer.tsx             # Logo/tagline + 3 link columns + bottom bar
```

`FeatureCard` and `RoleCard` live in the same file as their section parent when < ~40 lines; extracted to own files otherwise.

## Content (content.ts)

- **Stats:** 1.200+ người dùng, 48 trung tâm, 15.000+ buổi/tháng, 99,9% thời gian hoạt động
- **Features (6):** Quản lý lớp & học viên, Điểm danh thông minh, Giao & chấm bài tập, Quản lý học phí, Phân quyền RBAC, Báo cáo & thống kê
- **AI bullets (4):** Soạn đề & bài tập tự động, Chấm bài & gợi ý nhận xét, Tóm tắt buổi học, Gợi ý lộ trình cá nhân hoá
- **Roles (3):** Quản trị viên (4 bullets), Giảng viên (4 bullets), Học viên (4 bullets)
- **Testimonial:** Cô Lê Thu Hương, Giám đốc trung tâm, quote
- **Footer links (3 columns):** Sản phẩm, Công ty, Hỗ trợ

## Icons

New icons traced from Figma added to `components/ui/icons.tsx` (same inline-SVG, `currentColor` pattern): users/class, calendar-check, file-check, wallet, shield, bar-chart, AI-bot, check-circle.

## Responsive

Desktop-first per Figma (1920px). Grid collapses via Tailwind breakpoints only — no separate mobile design. Hero: 2-col → 1-col (`md:`). Features: 3-col → 2-col (`md:`) → 1-col (`sm:`). Roles: 3-col → 1-col.

## Verification

`npm run build` + `npm run lint` pass. Headless screenshot compared to Figma. Nav links and CTA buttons navigate correctly (`/` → `/login`).

## Out of scope

Pages behind login, mobile-specific design, i18n, footer link targets (all `#`).
