import { AppProvider } from '@/app/provider'
import { LoginPage } from '@/features/auth/pages/LoginPage'

export default function App() {
  // Routing comes later; LoginPage is the only page for now.
  return (
    <AppProvider>
      <LoginPage />
    </AppProvider>
  )
}
