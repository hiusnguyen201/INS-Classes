import { AuthLayout } from '@/components/layouts/AuthLayout'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'
import { ShieldIcon } from '@/components/ui/icons'

export function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full rounded-[20px] border border-card-edge bg-white px-9 pt-8.5 pb-9 shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        {/* Icon */}
        <div className="mb-4.5 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-[15px] bg-ring-soft">
            <ShieldIcon className="size-6.75 text-primary" />
          </div>
        </div>

        <h1 className="mb-2 text-center text-[25px] font-extrabold tracking-[-0.5px] text-ink">
          Đặt lại mật khẩu
        </h1>
        <p className="mb-6 text-center text-[14.5px] leading-[1.6] text-muted">
          Tạo mật khẩu mới cho tài khoản của bạn.
        </p>

        <ResetPasswordForm />
      </div>
    </AuthLayout>
  )
}
