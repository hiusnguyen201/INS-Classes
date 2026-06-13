import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'

interface FieldErrors {
  password?: string
  confirm?: string
}

export function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [done, setDone] = useState(false)

  function validate(): boolean {
    const errors: FieldErrors = {}
    if (!password) errors.password = 'Vui lòng nhập mật khẩu mới.'
    else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự.'
    if (!confirm) errors.confirm = 'Vui lòng xác nhận mật khẩu.'
    else if (confirm !== password) errors.confirm = 'Mật khẩu không khớp.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    // BE endpoint not yet implemented — show success UI
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <div className="flex size-[56px] items-center justify-center rounded-2xl bg-green-50">
          <CheckIcon className="size-7 text-green-600" />
        </div>
        <h2 className="text-[18px] font-bold text-ink">Đặt lại thành công!</h2>
        <p className="text-[14px] leading-[1.6] text-muted">
          Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập lại.
        </p>
        <Link
          to={PATHS.login}
          className="mt-2 flex h-[50px] w-full items-center justify-center rounded-xl bg-primary text-[15.5px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)] hover:bg-primary-dark"
        >
          Đăng nhập ngay
        </Link>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        label="Mật khẩu mới"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockIcon className="size-[19px]" />}
        error={fieldErrors.password}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            className="shrink-0 cursor-pointer text-faint transition-colors hover:text-label"
          >
            {showPassword ? <EyeOffIcon className="size-[19px]" /> : <EyeIcon className="size-[19px]" />}
          </button>
        }
      />
      <TextField
        className="mt-4"
        label="Xác nhận mật khẩu"
        type={showConfirm ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="••••••••"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        icon={<LockIcon className="size-[19px]" />}
        error={fieldErrors.confirm}
        trailing={
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Ẩn' : 'Hiện'}
            className="shrink-0 cursor-pointer text-faint transition-colors hover:text-label"
          >
            {showConfirm ? <EyeOffIcon className="size-[19px]" /> : <EyeIcon className="size-[19px]" />}
          </button>
        }
      />
      <Button type="submit" className="mt-5">
        Đặt lại mật khẩu
        <CheckIcon className="size-[17px]" />
      </Button>
    </form>
  )
}
