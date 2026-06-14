import { AuthLayout } from '@/components/layouts/AuthLayout'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { LockIcon } from '@/components/ui/icons'

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full rounded-[20px] border border-card-edge bg-white px-9 pt-8 pb-9 shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex size-[56px] items-center justify-center rounded-2xl bg-blue-50">
            <LockIcon className="size-[26px] text-primary" />
          </div>
        </div>

        <h1 className="mb-2 text-center text-[25px] font-extrabold tracking-[-0.5px] text-ink">
          Quên mật khẩu?
        </h1>
        <p className="mb-6 text-center text-[14.5px] leading-[1.6] text-muted">
          Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </p>

        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  )
}
