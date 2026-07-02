import { Button as MuiButton } from '@mui/material'
import type { ReactNode, MouseEventHandler } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps {
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}

export function Button({ variant = 'primary', type = 'button', className, disabled, children, onClick }: ButtonProps) {
  return (
    <MuiButton
      type={type}
      fullWidth
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      color="primary"
      disabled={disabled}
      className={className}
      onClick={onClick}
      sx={{
        height: variant === 'primary' ? 50 : 48,
        borderRadius: variant === 'primary' ? '12px' : '11px',
        fontSize: variant === 'primary' ? '15.5px' : '14.5px',
        fontWeight: 700,
        gap: 1,
        ...(variant === 'primary' && {
          boxShadow: '0 4px 14px -4px rgba(37,99,235,0.4)',
          '&:hover': { bgcolor: 'primary.dark', boxShadow: '0 4px 14px -4px rgba(37,99,235,0.5)' },
        }),
        ...(variant === 'outline' && {
          borderColor: '#d3d9e2',
          color: '#44505f',
          bgcolor: 'white',
          '&:hover': { bgcolor: '#f5f7fa' },
        }),
      }}
    >
      {children}
    </MuiButton>
  )
}
