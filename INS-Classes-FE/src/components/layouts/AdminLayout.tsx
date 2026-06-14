import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { PATHS } from '@/config/paths'
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  GridIcon,
  ShieldUserIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
} from '@/components/ui/icons'

interface NavItem {
  label: string
  icon: ReactNode
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Tổng quan', icon: <LayoutDashboardIcon className="size-[19px]" />, path: PATHS.adminDashboard },
  { label: 'Người dùng', icon: <UsersIcon className="size-[19px]" />, path: PATHS.adminUsers },
  { label: 'Khoá học', icon: <BookOpenIcon className="size-[19px]" />, path: PATHS.adminCourses },
  { label: 'Lớp học', icon: <GridIcon className="size-[19px]" />, path: PATHS.adminClasses },
  { label: 'Vai trò & quyền', icon: <ShieldUserIcon className="size-[19px]" />, path: PATHS.adminRoles },
]

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen bg-[#f7f9fc]">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-[230px] shrink-0 border-r border-line bg-white">
        <p className="absolute left-6 top-8 -translate-y-1/2 text-[11.5px] font-bold uppercase tracking-[0.06em] text-faint">
          Quản trị hệ thống
        </p>

        {/* Nav items */}
        <nav className="mt-[49px] px-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative mb-1 flex h-[41px] items-center gap-3 rounded-[9px] px-[13px] text-[14px] font-semibold transition-colors',
                  active
                    ? 'bg-ring-soft text-primary'
                    : 'text-label hover:bg-[#f5f7fa]',
                )}
              >
                {active && (
                  <span className="absolute -left-3 bottom-2 top-2 w-[3px] rounded-full bg-primary" />
                )}
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* INS Manager info card */}
        <div className="absolute bottom-5 left-3 right-3 rounded-xl border border-line bg-[#f5f7fa] px-[14px] py-3">
          <p className="text-[12px] font-bold text-label">INS Manager</p>
          <p className="mt-1 text-[11.5px] leading-[1.5] text-muted">
            Spring Boot · MySQL · JWT ·{'\n'}v1.0
          </p>
        </div>
      </aside>

      {/* Right column */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-[60px] items-center border-b border-line bg-white px-4">
          {/* Logo */}
          <Link to={PATHS.home} className="flex items-center gap-2.5">
            <div className="flex size-[34px] items-center justify-center rounded-[9px] bg-gradient-to-br from-primary to-[#1e40af]">
              <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[18px] font-bold tracking-tight text-ink">
              INS <span className="font-medium text-muted">Classes</span>
            </span>
          </Link>

          {/* Global search */}
          <div className="mx-auto flex w-[400px] items-center gap-2.5 rounded-full bg-[#f5f7fa] px-4 py-2.5">
            <SearchIcon className="size-[18px] shrink-0 text-faint" />
            <span className="text-[14px] text-[#757575]">Tìm lớp học, học viên, bài tập...</span>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-3">
            <button className="relative flex size-[42px] items-center justify-center rounded-full hover:bg-[#f5f7fa]">
              <BellIcon className="size-[21px] text-label" />
              <span className="absolute right-[10px] top-[9px] size-[7px] rounded-full border-2 border-white bg-[#d93025]" />
            </button>

            <button className="flex items-center gap-2 rounded-full border border-line px-[5px] py-[5px] pr-3 hover:bg-[#f5f7fa]">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#1f2733] text-[12.2px] font-semibold tracking-wide text-white">
                QT
              </div>
              <div className="text-left">
                <p className="text-[12.5px] font-semibold text-ink">Quản trị viên</p>
                <p className="text-[10.5px] text-muted">Quản trị</p>
              </div>
              <ChevronDownIcon className="size-[15px] text-muted" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  )
}
