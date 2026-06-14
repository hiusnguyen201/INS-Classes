import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/config/paths'
import { HomeIcon, ArrowRightIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'
import type { AuthDto } from '@/features/auth/types'

export function RegisterPage() {
  const { startSession } = useAuth()
  const navigate = useNavigate()
  const [authData, setAuthData] = useState<AuthDto | null>(null)

  function handleGoToAdmin() {
    if (!authData) return
    startSession(authData, true) // persist to localStorage
    navigate(PATHS.adminDashboard)
  }

  return (
    <AuthLayout>
      <div className="w-full rounded-[20px] border border-card-edge bg-white px-9 pt-8 pb-9 shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        {authData ? (
          <div className="flex flex-col items-center gap-5 py-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#e6f4ea]">
              <svg viewBox="0 0 24 24" fill="none" className="size-8 text-[#1e8e3e]">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-[23px] font-extrabold tracking-[-0.46px] text-ink">
                Tạo tài khoản thành công!
              </h1>
              <p className="mt-1.5 text-[14px] text-muted">
                Chào mừng <span className="font-semibold text-ink">{authData.user.name}</span> đến với INS Classes.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 pt-1">
              <Button onClick={handleGoToAdmin}>
                Vào INS Classes
                <ArrowRightIcon className="size-4.75" />
              </Button>
              <Link
                to={PATHS.home}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-center gap-2.5',
                  'h-12 rounded-[11px] border border-edge bg-white text-[14.5px] font-semibold text-label',
                  'transition-colors hover:bg-slate-50',
                )}
              >
                <HomeIcon className="size-4.75" />
                Về trang chủ
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="mb-1 text-center text-[25px] font-extrabold tracking-[-0.5px] text-ink">
              Tạo tài khoản
            </h1>
            <p className="mb-6 text-center text-[14.5px] text-muted">
              Bắt đầu cùng INS Classes — miễn phí.
            </p>
            <RegisterForm onSuccess={setAuthData} />
          </>
        )}
      </div>
    </AuthLayout>
  )
}
