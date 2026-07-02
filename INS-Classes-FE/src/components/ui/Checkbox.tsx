import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'

interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  name?: string
  id?: string
}

export function Checkbox({ label, onBlur, ...props }: CheckboxProps) {
  return (
    <FormControlLabel
      control={<MuiCheckbox size="small" color="primary" onBlur={onBlur} {...props} />}
      label={<span style={{ fontSize: '13.5px' }}>{label}</span>}
      sx={{ m: 0 }}
    />
  )
}
