import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { HomePage } from '@/features/landing/pages/HomePage'
import { PATHS } from '@/config/paths'

export const router = createBrowserRouter([
  { path: PATHS.home, element: <HomePage /> },
  { path: PATHS.login, element: <LoginPage /> },
])
