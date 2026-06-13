import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'

export function CtaSection() {
  return (
    <section id="mien-phi" className="py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#2563eb_0%,#1e40af_100%)] px-16 py-20 text-center shadow-[0_24px_60px_-20px_rgba(37,99,235,0.5)]">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_400px_at_50%_-100px,rgba(255,255,255,0.12),transparent)]" />

          <h2 className="relative mb-4 text-[40px] font-extrabold leading-[1.15] tracking-[-0.8px] text-white">
            Sẵn sàng tối ưu trung tâm của bạn?
          </h2>
          <p className="relative mb-10 text-[16px] leading-[1.7] text-white/75">
            Hoàn toàn miễn phí — không phí ẩn, không cần thẻ tín dụng.
            <br />
            Có ngay trợ lý AI hỗ trợ giảng dạy.
          </p>
          <div className="relative flex items-center justify-center gap-4">
            <Link
              to={PATHS.login}
              className="flex h-[52px] items-center gap-2.5 rounded-xl bg-white px-7 text-[15.5px] font-bold text-primary shadow-[0_4px_14px_-4px_rgba(0,0,0,0.2)] transition-opacity hover:opacity-90"
            >
              Bắt đầu ngay
              <ArrowRightIcon className="size-[19px]" />
            </Link>
            <a
              href="#"
              className="flex h-[52px] items-center rounded-xl border border-white/30 px-7 text-[15.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
