import { STATS } from '@/features/landing/content'

export function StatsBar() {
  return (
    <div className="mx-auto max-w-[1044px] px-5">
      <div className="grid grid-cols-4 divide-x divide-white/10 rounded-2xl bg-[#0f1b33] px-10 py-8 shadow-[0_20px_60px_-20px_rgba(15,27,51,0.4)]">
        {STATS.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center gap-1 px-6 text-center">
            <span className="text-[38px] font-extrabold leading-none tracking-[-1px] text-white">
              {stat.value}
            </span>
            <span className="text-[14px] text-white/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
