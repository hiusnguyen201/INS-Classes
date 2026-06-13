import type { ReactNode } from 'react'
import { GraduationCapIcon } from '@/components/ui/icons'

/** Public-page shell: gradient background, INS Classes logo, footer. */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#eef4fd_0%,#f7f9fc_40%)] px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(960px_480px_at_50%_-60px,rgba(37,99,235,0.14),transparent_60%)]"
      />
      <div className="relative flex w-full max-w-[424px] flex-col items-center">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex size-[42px] items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb_0%,#1e40af_100%)]">
            <GraduationCapIcon className="size-[23px] text-white" />
          </span>
          <span className="text-[21px] font-extrabold tracking-[-0.42px] text-ink">
            INS <span className="font-medium text-muted">Classes</span>
          </span>
        </div>
        {children}
        <p className="mt-6 text-[12.5px] text-faint">© 2026 INS Classes · Bảo mật &amp; điều khoản</p>
      </div>
    </div>
  )
}
