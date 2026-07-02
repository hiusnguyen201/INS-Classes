import { Link } from 'react-router-dom'
import { GraduationCapIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { NAV_LINKS } from '@/features/landing/content'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-[71px] items-center bg-white/80 backdrop-blur-md border-b border-card-edge">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5">
        {/* Logo */}
        <Link to={PATHS.home} className="flex items-center gap-2.5">
          <span className="flex size-[38px] items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#2563eb,#1e40af)]">
            <GraduationCapIcon className="size-[21px] text-white" />
          </span>
          <span className="text-[20px] font-extrabold tracking-[-0.4px] text-ink">
            INS <span className="font-medium text-muted">Classes</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-label transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            to={PATHS.login}
            className="text-[15px] font-semibold text-label transition-colors hover:text-primary"
          >
            Đăng nhập
          </Link>
          <Link
            to={PATHS.login}
            className="flex h-[41px] items-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)] transition-colors hover:bg-primary-dark"
          >
            Dùng thử miễn phí
          </Link>
        </div>
      </div>
    </nav>
  )
}
