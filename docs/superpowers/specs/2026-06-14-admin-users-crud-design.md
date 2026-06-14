# Admin Users CRUD — Design Spec

**Date:** 2026-06-14  
**Branch:** feature/admin-users-crud  
**Figma nodes:** 150:2187 (List), 150:2416 (Create), 150:2687 (Update), 150:2958 (Delete)

---

## 1. Scope

Build the admin Users CRUD feature on the FE:

- **List** — paginated table at `/admin/users` inside an AdminLayout shell
- **Create** — modal triggered by "Thêm người dùng"
- **Update** — modal triggered by the edit icon on a row
- **Delete** — confirmation modal triggered by the delete icon on a row

Phone field is **out of scope** (Figma shows it but BE has no `phone` column; deferred to a later sprint).

---

## 2. Routes & Layout

### New route
| Path | Component |
|------|-----------|
| `/admin/users` | `AdminLayout` → `UsersPage` |

### AdminLayout (`components/layouts/AdminLayout.tsx`)
Shared shell for all future admin pages. Two regions:

- **Header** (60 px, sticky): INS Classes logo, global search pill (UI-only placeholder), notification bell, user profile chip.
- **Sidebar** (230 px, sticky): section label "Quản trị hệ thống", nav items (Tổng quan, Người dùng, Khoá học, Lớp học, Vai trò & quyền), INS Manager info card at bottom. Active item highlighted with blue background + left blue bar.

---

## 3. Feature Structure

```
src/features/users/
├── api/
│   ├── getUsers.ts
│   ├── createUser.ts
│   ├── updateUser.ts
│   └── deleteUser.ts
├── types/index.ts
├── hooks/
│   ├── useUsers.ts
│   ├── useCreateUser.ts
│   ├── useUpdateUser.ts
│   └── useDeleteUser.ts
├── components/
│   ├── UserAvatarInitials.tsx
│   ├── UserTypeBadge.tsx
│   ├── CreateUserModal.tsx
│   ├── UpdateUserModal.tsx
│   └── DeleteUserModal.tsx
└── pages/UsersPage.tsx
```

---

## 4. Data Model

```ts
interface UserDto {
  id: number
  name: string
  email: string
  type: 'ADMIN' | 'TEACHER' | 'USER'
  role: string | null
  createdAt: string
}

interface CreateUserInput {
  name: string
  email: string
  type: 'ADMIN' | 'TEACHER' | 'USER'
  password: string // auto-generated on FE, not shown in UI
}

interface UpdateUserInput {
  name?: string
  type?: 'ADMIN' | 'TEACHER' | 'USER'
}
```

---

## 5. API Calls

| Hook | Method | Path | Notes |
|------|--------|------|-------|
| `getUsers` | GET | `/users` | params: `page`, `size=10`, `type?`, `keyword?` |
| `createUser` | POST | `/users` | body: CreateUserInput |
| `updateUser` | PUT | `/users/{id}` | body: UpdateUserInput |
| `deleteUser` | DELETE | `/users/{id}` | — |

**Known gaps:** BE `GET /users` does not yet support `type`/`keyword` params. BE `PUT /users/{id}` currently only updates `name`/`avatar` — type update deferred until BE extends it.

---

## 6. UsersPage

- **Toolbar:** title + total count + Nhập Excel / Xuất Excel (UI-only, disabled) + Thêm người dùng
- **Filter tabs:** Tất cả | Admin | Giảng viên | Học viên → `typeFilter` state
- **Search:** debounced 300 ms → `keyword` state
- **Table columns:** Avatar+Name | Email | Loại (badge) | Vai trò | Thao tác (edit + delete icons)
- **Pagination footer:** "Hiển thị X–Y trong Z kết quả" + page buttons

---

## 7. Modals

### CreateUserModal
Fields: Họ và tên, Email, Loại tài khoản (3 cards: Học viên / Giảng viên / Quản trị).  
Password auto-generated: `Ins@` + 8 random alphanumeric chars (not shown in UI).  
Validation: Formik + Yup — name required, email required + valid format.  
Submit button: "Tạo tài khoản".

### UpdateUserModal
Pre-fills name and type from selected user. Email is readonly.  
Submit button: "Lưu thay đổi".

### DeleteUserModal
400 px wide. Red trash icon. Confirms deletion of user by name (bold).  
Buttons: Huỷ | Xoá (red).

---

## 8. Avatar & Badge

**Avatar:** deterministic color from name hash → 10-color palette. Initials = first char of first + last word.

**Type badges:**
| Type | Label | bg | text |
|------|-------|----|------|
| ADMIN | Admin | `#e7eefe` | `#1d4ed8` |
| TEACHER | Giảng viên | `#f4e8fd` | `#7c46f0` |
| USER | Học viên | `#e8f0fe` | `#0a85bd` |

---

## 9. Out of Scope

- Phone field (BE not ready)
- Nhập Excel / Xuất Excel (placeholders)
- Auth token interceptor (separate TODO)
- Role assignment module
