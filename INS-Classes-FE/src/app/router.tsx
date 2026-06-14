import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { HomePage } from '@/features/landing/pages/HomePage'
import { UsersPage } from '@/features/users/pages/UsersPage'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { PATHS } from '@/config/paths'

export const router = createBrowserRouter([
  { path: PATHS.home, element: <HomePage /> },
  { path: PATHS.login, element: <LoginPage /> },
  { path: PATHS.register, element: <RegisterPage /> },
  { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
  { path: PATHS.resetPassword, element: <ResetPasswordPage /> },
  {
    path: '/admin',
    element: <AdminLayout><div className="py-8 text-center text-muted">Dashboard (coming soon)</div></AdminLayout>,
  },
  {
    path: PATHS.adminUsers,
    element: <AdminLayout><UsersPage /></AdminLayout>,
  },
])
