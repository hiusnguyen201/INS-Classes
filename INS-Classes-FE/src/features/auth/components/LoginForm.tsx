import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { TextField } from '@/components/ui/TextField'
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/ui/icons'
import { useLogin } from '@/features/auth/hooks/useLogin'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FieldErrors {
  email?: string
  password?: string
}

export function LoginForm() {
  const { submit, isLoading, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function validate(): boolean {
    const errors: FieldErrors = {}
    if (!email.trim()) errors.email = 'Vui lòng nhập email.'
    else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Email không đúng định dạng.'
    if (!password) errors.password = 'Vui lòng nhập mật khẩu.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await submit({ email: email.trim(), password }, remember)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-[11px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-600"
        >
          {error}
        </p>
      )}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="ban@ins.edu.vn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<MailIcon className="size-[19px]" />}
        error={fieldErrors.email}
      />
      <TextField
        className="mt-4"
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
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
      <div className="mt-4 flex items-center justify-between">
        <Checkbox
          label="Ghi nhớ đăng nhập"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <a href="#" className="text-[13.5px] font-semibold text-primary hover:underline">
          Quên mật khẩu?
        </a>
      </div>
      <Button type="submit" disabled={isLoading} className="mt-[22px]">
        {isLoading ? 'Đang đăng nhập…' : 'Đăng nhập'}
        {!isLoading && <ArrowRightIcon className="size-[19px]" />}
      </Button>
    </form>
  )
}
