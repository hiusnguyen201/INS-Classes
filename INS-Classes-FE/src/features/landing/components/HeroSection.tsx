import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { HERO } from '@/features/landing/content'
import { HeroMockup } from '@/features/landing/components/HeroMockup'

const AVATAR_COLORS = ['bg-blue-500', 'bg-teal-500', 'bg-violet-500', 'bg-rose-500']

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[71px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#eef4fd_0%,#f7f9fc_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(960px_480px_at_50%_-60px,rgba(37,99,235,0.14),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-16 px-5 pb-24 pt-16">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-card-edge bg-white/80 px-4 py-1.5 text-[13px] font-medium text-label shadow-sm">
            <span className="size-2 rounded-full bg-primary" />
            {HERO.badge}
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-[52px] font-extrabold leading-[1.12] tracking-[-1px] text-ink">
            Quản lý trung tâm
            <br />
            miễn phí, cùng trợ lý
            <br />
            <span className="text-primary">AI</span>
          </h1>

          {/* Description */}
          <p className="mb-8 text-[17px] leading-[1.7] text-muted">{HERO.description}</p>

          {/* CTAs */}
          <div className="mb-8 flex items-center gap-4">
            <Link
              to={PATHS.login}
              className="flex h-[54px] items-center gap-2.5 rounded-xl bg-primary px-7 text-[15.5px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)] transition-colors hover:bg-primary-dark"
            >
              {HERO.ctaPrimary}
              <ArrowRightIcon className="size-[19px]" />
            </Link>
            <button className="flex h-[54px] items-center gap-3 rounded-xl px-5 text-[15.5px] font-semibold text-label transition-colors hover:text-ink">
              <span className="flex size-[30px] items-center justify-center rounded-full bg-white shadow-sm border border-card-edge text-primary">
                <svg viewBox="0 0 13 13" fill="currentColor" className="size-3 translate-x-[1px]">
                  <path d="M2 1.5l9 5-9 5V1.5z" />
                </svg>
              </span>
              {HERO.ctaSecondary}
            </button>
          </div>

          {/* Trust row */}
          <div className="mb-6 flex items-center gap-5">
            {HERO.trustItems.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[13.5px] text-muted">
                <CheckIcon className="size-4 text-primary" />
                {item}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {HERO.avatars.map((initials, i) => (
                <div
                  key={initials}
                  className={`flex size-[38px] items-center justify-center rounded-full border-2 border-white text-[12px] font-bold text-white ${AVATAR_COLORS[i]}`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 14 14" fill="#facc15" className="size-3.5">
                  <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.427.59 3.438L7 8.83l-3.09 1.67.59-3.438L2 4.635l3.455-.545L7 1z" />
                </svg>
              ))}
              <span className="text-[13px] text-muted">{HERO.avatarText}</span>
            </div>
          </div>
        </div>

        {/* Right: mockup */}
        <div className="flex justify-end">
          <div className="w-full max-w-[560px]">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
