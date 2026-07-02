import {
  UsersIcon, CalendarCheckIcon, FileCheckIcon,
  WalletIcon, ShieldIcon, BarChartIcon,
} from '@/components/ui/icons'
import { FEATURES } from '@/features/landing/content'
import type { ComponentType, SVGProps } from 'react'

type IconMap = Record<string, ComponentType<SVGProps<SVGSVGElement>>>

const ICON_MAP: IconMap = {
  users: UsersIcon,
  'calendar-check': CalendarCheckIcon,
  'file-check': FileCheckIcon,
  wallet: WalletIcon,
  shield: ShieldIcon,
  'bar-chart': BarChartIcon,
}

const ICON_COLORS = [
  'bg-blue-50 text-primary',
  'bg-green-50 text-green-600',
  'bg-violet-50 text-violet-600',
  'bg-orange-50 text-orange-500',
  'bg-rose-50 text-rose-500',
  'bg-teal-50 text-teal-600',
]

function FeatureCard({
  icon, title, description, colorClass,
}: { icon: string; title: string; description: string; colorClass: string }) {
  const Icon = ICON_MAP[icon]
  return (
    <div className="rounded-2xl border border-card-edge bg-white p-7 transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(15,27,51,0.12)]">
      <div className={`mb-6 flex size-[50px] items-center justify-center rounded-2xl ${colorClass}`}>
        {Icon && <Icon className="size-6" />}
      </div>
      <h3 className="mb-3 text-[17px] font-bold text-ink">{title}</h3>
      <p className="text-[14px] leading-[1.7] text-muted">{description}</p>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="tinh-nang" className="py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-widest text-primary">
            Tính năng
          </span>
          <h2 className="mb-4 text-[40px] font-extrabold leading-[1.15] tracking-[-0.8px] text-ink">
            Mọi thứ một trung tâm cần,
            <br />
            trong một nơi
          </h2>
          <p className="mx-auto max-w-[580px] text-[16px] leading-[1.7] text-muted">
            Thay thế hàng loạt file Excel và nhóm chat rời rạc bằng một hệ thống thống nhất, dễ dùng.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feat, i) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              colorClass={ICON_COLORS[i % ICON_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
