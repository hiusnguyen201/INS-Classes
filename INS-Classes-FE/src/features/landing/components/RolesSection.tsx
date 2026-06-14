import { CheckIcon, ShieldUserIcon, GraduationCapIcon, UserIcon } from '@/components/ui/icons'
import { ROLES } from '@/features/landing/content'
import type { ComponentType, SVGProps } from 'react'

type IconMap = Record<string, ComponentType<SVGProps<SVGSVGElement>>>

const ICON_MAP: IconMap = {
  'shield-user': ShieldUserIcon,
  'graduation-cap': GraduationCapIcon,
  user: UserIcon,
}

const COLOR_MAP: Record<string, { bar: string; icon: string }> = {
  blue:   { bar: 'bg-primary',    icon: 'bg-blue-50 text-primary' },
  green:  { bar: 'bg-green-500',  icon: 'bg-green-50 text-green-600' },
  orange: { bar: 'bg-orange-400', icon: 'bg-orange-50 text-orange-500' },
}

function RoleCard({
  icon, color, title, subtitle, bullets,
}: { icon: string; color: string; title: string; subtitle: string; bullets: readonly string[] }) {
  const Icon = ICON_MAP[icon]
  const colors = COLOR_MAP[color] ?? COLOR_MAP.blue
  return (
    <div className="relative overflow-hidden rounded-2xl border border-card-edge bg-white shadow-[0_4px_12px_-6px_rgba(15,27,51,0.08)] transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(15,27,51,0.16)]">
      {/* Top colour bar */}
      <div className={`h-1.5 w-full ${colors.bar}`} />
      <div className="p-7">
        <div className={`mb-6 flex size-[52px] items-center justify-center rounded-2xl ${colors.icon}`}>
          {Icon && <Icon className="size-[26px]" />}
        </div>
        <h3 className="mb-1 text-[20px] font-extrabold text-ink">{title}</h3>
        <p className="mb-6 text-[14px] text-muted">{subtitle}</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-[14px] text-label">
              <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${colors.icon}`}>
                <CheckIcon className="size-3" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RolesSection() {
  return (
    <section id="vai-tro" className="py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-widest text-primary">
            Vai trò
          </span>
          <h2 className="mb-4 text-[40px] font-extrabold leading-[1.15] tracking-[-0.8px] text-ink">
            Thiết kế cho từng người dùng
          </h2>
          <p className="mx-auto max-w-[560px] text-[16px] leading-[1.7] text-muted">
            Mỗi vai trò có giao diện và quyền riêng — đơn giản, đúng việc, không thừa thãi.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {ROLES.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>
      </div>
    </section>
  )
}
