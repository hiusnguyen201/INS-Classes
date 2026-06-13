import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const base =
  'flex w-full cursor-pointer items-center justify-center gap-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary:
    'h-[50px] rounded-xl bg-primary text-[15.5px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)] hover:bg-primary-dark',
  outline:
    'h-12 rounded-[11px] border border-edge bg-white text-[14.5px] font-semibold text-label hover:bg-slate-50',
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />
}
