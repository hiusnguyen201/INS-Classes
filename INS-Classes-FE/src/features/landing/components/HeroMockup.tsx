/** Browser-frame mockup of the "Lớp học của tôi" dashboard — dựng bằng code theo Figma */
export function HeroMockup() {
  const classes = [
    { name: 'Fullstack-K15', course: 'Lập trình Web', pct: 72, color: 'bg-primary' },
    { name: 'React-K8', course: 'ReactJS Pro', pct: 58, color: 'bg-green-500' },
    { name: 'Java-K3', course: 'Java Spring', pct: 45, color: 'bg-orange-400' },
    { name: 'Python-AI-K5', course: 'Python & AI', pct: 88, color: 'bg-violet-500' },
  ]

  return (
    <div className="relative">
      {/* Floating badge: 94% */}
      <div className="absolute -left-14 top-6 z-10 flex h-[62px] w-[167px] items-center gap-3 rounded-2xl border border-card-edge bg-white px-4 shadow-[0_8px_24px_-8px_rgba(15,27,51,0.18)]">
        <span className="flex size-[38px] items-center justify-center rounded-xl bg-green-50 text-green-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </span>
        <div>
          <p className="text-[17px] font-extrabold leading-none text-ink">94%</p>
          <p className="mt-0.5 text-[12px] text-muted">Tỉ lệ chuyên cần</p>
        </div>
      </div>

      {/* Browser window */}
      <div className="overflow-hidden rounded-[16px] border border-card-edge bg-white shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
        {/* Browser chrome */}
        <div className="flex h-[45px] items-center border-b border-card-edge bg-[#f7f9fc] px-4 gap-2">
          <span className="size-[11px] rounded-full bg-red-400" />
          <span className="size-[11px] rounded-full bg-yellow-400" />
          <span className="size-[11px] rounded-full bg-green-400" />
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-edge bg-white px-3 py-1">
            <svg viewBox="0 0 16 16" fill="none" className="size-3 text-faint shrink-0">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px] text-faint">app.ins-classes.vn</span>
          </div>
        </div>

        {/* Sidebar + content */}
        <div className="flex h-[318px]">
          {/* Sidebar */}
          <div className="flex w-[62px] flex-col items-center gap-5 border-r border-card-edge bg-[#f7f9fc] py-4">
            <div className="flex size-[32px] items-center justify-center rounded-xl bg-primary">
              <svg viewBox="0 0 18 18" fill="none" className="size-[18px] text-white">
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {[
              <path key="1" d="M9 2L2 7v9h5v-5h4v5h5V7L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>,
              <><circle key="a" cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.3"/><path key="b" d="M3 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>,
              <path key="2" d="M12 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7l-4-5zM14 7H9V2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>,
            ].map((d, i) => (
              <div key={i} className="flex size-[36px] items-center justify-center rounded-xl text-faint hover:text-label">
                <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">{d}</svg>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-[18px]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[15px] font-bold text-ink">Lớp học của tôi</p>
                <p className="text-[12px] text-faint">6 lớp · 152 học viên</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl border border-primary bg-primary px-3 py-1.5 text-[12px] font-semibold text-white">
                <svg viewBox="0 0 12 12" fill="none" className="size-3">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Tạo lớp
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {classes.map((cls) => (
                <div key={cls.name} className="rounded-xl border border-card-edge p-3">
                  <div className="mb-1 rounded-lg bg-[#f7f9fc] px-2.5 py-1.5">
                    <p className="text-[12px] font-semibold text-ink">{cls.name}</p>
                  </div>
                  <p className="mb-2 text-[11px] text-faint">{cls.course}</p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#e9edf3]">
                    <div className={`h-full rounded-full ${cls.color}`} style={{ width: `${cls.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge: 2,4 tỷ */}
      <div className="absolute -right-6 bottom-10 z-10 flex h-[62px] w-[159px] items-center gap-3 rounded-2xl border border-card-edge bg-white px-4 shadow-[0_8px_24px_-8px_rgba(15,27,51,0.18)]">
        <span className="flex size-[38px] items-center justify-center rounded-xl bg-blue-50 text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.560-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.9 0 .306.178.662.33.793Z"/>
            <path fillRule="evenodd" d="M9.99 2a8 8 0 1 0 .02 16.001A8 8 0 0 0 9.99 2Zm.99 3.25a.75.75 0 0 0-1.5 0v.457c-.83.205-1.524.641-1.976 1.26-.453.621-.587 1.358-.407 2.063.255.99 1.046 1.565 1.784 1.904.318.147.655.267.993.386v2.94c-.32-.096-.6-.24-.826-.427a.75.75 0 0 0-.948 1.164c.497.405 1.117.67 1.774.792V15.5a.75.75 0 0 0 1.5 0v-.477c.85-.208 1.549-.66 2.002-1.294.454-.636.587-1.378.406-2.085-.255-.983-1.046-1.547-1.783-1.876a9.051 9.051 0 0 0-1.01-.38v-2.94c.284.095.546.228.769.393a.75.75 0 0 0 .892-1.207A4.35 4.35 0 0 0 10.98 5.5V5.25Z" clipRule="evenodd"/>
          </svg>
        </span>
        <div>
          <p className="text-[17px] font-extrabold leading-none text-ink">2,4 tỷ</p>
          <p className="mt-0.5 text-[12px] text-muted">Học phí kỳ này</p>
        </div>
      </div>
    </div>
  )
}
