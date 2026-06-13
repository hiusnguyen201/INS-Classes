import { Link } from 'react-router-dom'
import { GraduationCapIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { FOOTER_COLUMNS } from '@/features/landing/content'

export function Footer() {
  return (
    <footer className="bg-[#0f1b33] text-white/70">
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <Link to={PATHS.home} className="mb-4 flex items-center gap-2.5">
              <span className="flex size-[38px] items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <GraduationCapIcon className="size-[21px] text-white" />
              </span>
              <span className="text-[18px] font-extrabold text-white">INS Classes</span>
            </Link>
            <p className="text-[13.5px] leading-[1.7]">
              Phần mềm quản lý trung tâm đào tạo thế hệ mới — gọn gàng, thông minh, dễ dùng.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-[14px] font-semibold text-white">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13.5px] transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5">
          <p className="text-[13px]">© 2026 INS Classes. Bảo lưu mọi quyền.</p>
          <div className="flex gap-5 text-[13px]">
            <a href="#" className="hover:text-white">Điều khoản</a>
            <a href="#" className="hover:text-white">Bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
