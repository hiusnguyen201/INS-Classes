import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { HomePage } from '@/features/landing/pages/HomePage'
import { UsersPage } from '@/features/users/pages/UsersPage'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { AdminGuard } from '@/components/guards/AdminGuard'
import { GuestGuard } from '@/components/guards/GuestGuard'
import { PATHS } from '@/config/paths'

const adminRoute = (element: React.ReactNode) => (
  <AdminGuard>
    <AdminLayout>{element}</AdminLayout>
  </AdminGuard>
)

const guestRoute = (element: React.ReactNode) => (
  <GuestGuard>{element}</GuestGuard>
)

export const router = createBrowserRouter([
  { path: PATHS.home, element: guestRoute(<HomePage />) },
  { path: PATHS.login, element: guestRoute(<LoginPage />) },
  { path: PATHS.register, element: guestRoute(<RegisterPage />) },
  { path: PATHS.forgotPassword, element: guestRoute(<ForgotPasswordPage />) },
  { path: PATHS.resetPassword, element: guestRoute(<ResetPasswordPage />) },
  {
    path: PATHS.adminDashboard,
    element: adminRoute(<div className="py-8 text-center text-muted">Dashboard (coming soon)</div>),
  },
  {
    path: PATHS.adminUsers,
    element: adminRoute(<UsersPage />),
  },
])
