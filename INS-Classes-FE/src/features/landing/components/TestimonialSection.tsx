import { TESTIMONIAL } from '@/features/landing/content'

export function TestimonialSection() {
  return (
    <section className="bg-[#f7f9fc] py-20">
      <div className="mx-auto max-w-[924px] px-5">
        <div className="flex gap-6">
          {/* Quote mark */}
          <svg viewBox="0 0 56 56" fill="none" className="size-14 shrink-0 text-primary/20">
            <path
              d="M22 8H6v20h8c0 8-4 14-8 18h10c6-4 10-12 10-18V8zm28 0H34v20h8c0 8-4 14-8 18h10c6-4 10-12 10-18V8z"
              fill="currentColor"
            />
          </svg>

          <div>
            <blockquote className="mb-8 text-[20px] leading-[1.7] text-ink">
              {TESTIMONIAL.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="flex size-[48px] items-center justify-center rounded-full bg-primary text-[18px] font-bold text-white">
                {TESTIMONIAL.avatar}
              </div>
              <div>
                <p className="text-[15px] font-bold text-ink">{TESTIMONIAL.name}</p>
                <p className="text-[13.5px] text-muted">{TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
