import { AuthLayout } from '@/components/layouts/AuthLayout'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function RegisterPage() {
  const { user, clearSession } = useAuth()

  return (
    <AuthLayout>
      <div className="w-full rounded-[20px] border border-card-edge bg-white px-9 pt-8 pb-9 shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        {user ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-[25px] font-extrabold tracking-[-0.5px] text-ink">
              Chào mừng, {user.name}!
            </h1>
            <p className="text-[14.5px] text-muted">Tài khoản đã được tạo thành công.</p>
            <Button variant="outline" onClick={clearSession}>Đăng xuất</Button>
          </div>
        ) : (
          <>
            <h1 className="mb-1 text-center text-[25px] font-extrabold tracking-[-0.5px] text-ink">
              Tạo tài khoản
            </h1>
            <p className="mb-6 text-center text-[14.5px] text-muted">
              Bắt đầu cùng INS Classes — miễn phí.
            </p>
            <RegisterForm />
          </>
        )}
      </div>
    </AuthLayout>
  )
}
