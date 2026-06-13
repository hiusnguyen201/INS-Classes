import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: ReactNode
  /** Element rendered at the right edge of the input box (e.g. show/hide password). */
  trailing?: ReactNode
  error?: string
}

export function TextField({ label, icon, trailing, error, id, className, ...props }: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-[7px] block text-[13px] font-semibold text-label">
        {label}
      </label>
      <div
        className={cn(
          'group flex h-12 items-center gap-2.5 rounded-[11px] border bg-white px-3.5 transition-[border-color,box-shadow]',
          error
            ? 'border-red-500'
            : 'border-edge focus-within:border-primary focus-within:shadow-[0_0_0_4px_var(--color-ring-soft)]',
        )}
      >
        {icon && (
          <span className="shrink-0 text-faint transition-colors group-focus-within:text-primary">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className="h-full w-full bg-transparent text-[14.5px] text-ink outline-none placeholder:text-[#757575]"
          {...props}
        />
        {trailing}
      </div>
      {error && <p className="mt-1.5 text-[12.5px] text-red-600">{error}</p>}
    </div>
  )
}
