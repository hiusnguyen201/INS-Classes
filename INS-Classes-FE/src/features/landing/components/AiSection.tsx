import {
  EditIcon, CheckCircleIcon, FileTextIcon, TrendingUpIcon,
} from '@/components/ui/icons'
import { AI_BULLETS } from '@/features/landing/content'
import { AiChatMockup } from '@/features/landing/components/AiChatMockup'
import type { ComponentType, SVGProps } from 'react'

type IconMap = Record<string, ComponentType<SVGProps<SVGSVGElement>>>

const ICON_MAP: IconMap = {
  edit: EditIcon,
  'check-circle': CheckCircleIcon,
  'file-text': FileTextIcon,
  'trending-up': TrendingUpIcon,
}

const BULLET_COLORS = [
  'bg-blue-100 text-primary',
  'bg-green-100 text-green-600',
  'bg-violet-100 text-violet-600',
  'bg-orange-100 text-orange-500',
]

export function AiSection() {
  return (
    <section
      id="tro-ly-ai"
      className="bg-[linear-gradient(135deg,#eef4fd_0%,#f0ebff_100%)] py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-16 px-5">
        {/* Left: copy */}
        <div>
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-widest text-primary">
            Trợ lý AI
          </span>
          <h2 className="mb-4 text-[40px] font-extrabold leading-[1.15] tracking-[-0.8px] text-ink">
            AI đồng hành cùng{' '}
            <span className="text-primary">mỗi giờ</span>
            <br />giảng
          </h2>
          <p className="mb-10 text-[16px] leading-[1.7] text-muted">
            Để AI lo phần việc lặp lại — soạn đề, chấm bài, tóm tắt — giảng viên dành trọn thời gian cho học viên.
          </p>

          <div className="space-y-6">
            {AI_BULLETS.map((bullet, i) => {
              const Icon = ICON_MAP[bullet.icon]
              return (
                <div key={bullet.title} className="flex gap-4">
                  <div className={`shrink-0 flex size-[44px] items-center justify-center rounded-2xl ${BULLET_COLORS[i]}`}>
                    {Icon && <Icon className="size-[21px]" />}
                  </div>
                  <div>
                    <p className="mb-1 text-[15px] font-bold text-ink">{bullet.title}</p>
                    <p className="text-[13.5px] leading-[1.6] text-muted">{bullet.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: chat mockup */}
        <div>
          <AiChatMockup />
        </div>
      </div>
    </section>
  )
}
