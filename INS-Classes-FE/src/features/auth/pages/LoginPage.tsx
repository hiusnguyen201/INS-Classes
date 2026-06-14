import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { PATHS } from '@/config/paths'

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full rounded-[20px] border border-card-edge bg-white px-9 pt-8.5 pb-9 shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        <h1 className="text-center text-[25px] font-extrabold tracking-[-0.5px] text-ink">
          Đăng nhập
        </h1>
        <p className="mt-2 text-center text-[14.5px] text-muted">
          Chào mừng trở lại! Đăng nhập để tiếp tục.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="my-7.25 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[12.5px] font-medium text-faint">hoặc</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <GoogleLoginButton />
        <p className="mt-8 text-center text-[14px] text-muted">
          Chưa có tài khoản?{' '}
          <Link to={PATHS.register} className="font-bold text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
