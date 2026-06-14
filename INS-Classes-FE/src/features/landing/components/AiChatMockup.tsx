import { BotIcon, CheckIcon } from '@/components/ui/icons'
import { AI_CHAT_MOCKUP } from '@/features/landing/content'

export function AiChatMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-edge bg-white shadow-[0_24px_60px_-20px_rgba(15,27,51,0.22),0_4px_12px_-6px_rgba(15,27,51,0.08)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-card-edge px-5 py-4">
        <div className="flex size-[32px] items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb,#1e40af)]">
          <BotIcon className="size-[17px] text-white" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink">Trợ lý AI INS</p>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500" />
            <span className="text-[12px] text-muted">Đang hoạt động</span>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div className="p-5 space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-[13.5px] leading-[1.6] text-white">
            {AI_CHAT_MOCKUP.userMessage}
          </div>
        </div>

        {/* AI reply */}
        <div className="rounded-2xl border border-card-edge bg-[#f7f9fc] p-4">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-ink">
            <CheckIcon className="size-[15px] text-green-500" />
            {AI_CHAT_MOCKUP.replyTitle}
          </div>
          <ol className="space-y-1.5">
            {AI_CHAT_MOCKUP.exercises.slice(0, 4).map((ex, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-label">
                <span className="shrink-0 text-faint">{i + 1}.</span>
                {ex}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12.5px] font-semibold text-white">
              <CheckIcon className="size-3" />
              Giao cho lớp
            </button>
            <button className="rounded-xl border border-edge px-4 py-2 text-[12.5px] font-semibold text-label hover:bg-white">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
