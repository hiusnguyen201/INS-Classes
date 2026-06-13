import type { InputHTMLAttributes } from 'react'
import { CheckIcon } from '@/components/ui/icons'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2.5 text-[13.5px] text-label">
      <span className="relative flex size-5 items-center justify-center">
        <input
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded-md border border-edge bg-white transition-colors checked:border-primary checked:bg-primary"
          {...props}
        />
        <CheckIcon className="pointer-events-none absolute hidden size-[13px] text-white peer-checked:block" />
      </span>
      {label}
    </label>
  )
}
