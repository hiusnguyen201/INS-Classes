import { TextField as MuiTextField, InputAdornment } from '@mui/material'
import type { ReactNode } from 'react'

interface TextFieldProps {
  label: string
  icon?: ReactNode
  trailing?: ReactNode
  error?: string
  id?: string
  className?: string
  type?: string
  placeholder?: string
  autoComplete?: string
  value?: string
  name?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  disabled?: boolean
}

export function TextField({ label, icon, trailing, error, className, placeholder, ...rest }: TextFieldProps) {
  return (
    <MuiTextField
      label={label}
      fullWidth
      variant="outlined"
      size="small"
      error={!!error}
      helperText={error}
      className={className}
      slotProps={{
        input: {
          startAdornment: icon ? (
            <InputAdornment position="start">{icon}</InputAdornment>
          ) : undefined,
          endAdornment: trailing ? (
            <InputAdornment position="end">{trailing}</InputAdornment>
          ) : undefined,
        },
        htmlInput: { placeholder },
      }}
      {...(rest as any)}
    />
  )
}
