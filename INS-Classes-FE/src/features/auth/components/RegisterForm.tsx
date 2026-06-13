import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { TextField } from '@/components/ui/TextField'
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon, UsersIcon, GraduationCapIcon } from '@/components/ui/icons'
import { GoogleIcon } from '@/components/ui/icons'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { PATHS } from '@/config/paths'
import { cn } from '@/utils/cn'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Role = 'student' | 'teacher'

interface FieldErrors {
  name?: string
  email?: string
  password?: string
  terms?: string
}

export function RegisterForm() {
  const { submit, isLoading, error } = useRegister()
  const [role, setRole] = useState<Role>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function validate(): boolean {
    const errors: FieldErrors = {}
    if (!name.trim()) errors.name = 'Vui lòng nhập họ và tên.'
    if (!email.trim()) errors.email = 'Vui lòng nhập email.'
    else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Email không đúng định dạng.'
    if (!password) errors.password = 'Vui lòng nhập mật khẩu.'
    else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự.'
    if (!terms) errors.terms = 'Bạn cần đồng ý với Điều khoản & Bảo mật.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await submit({ name: name.trim(), email: email.trim(), password })
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {/* Role selector */}
      <div className="mb-5">
        <p className="mb-2 text-[13px] font-semibold text-label">Bạn là</p>
        <div className="grid grid-cols-2 gap-2 rounded-[11px] border border-edge bg-[#f7f9fc] p-1">
          {([
            { value: 'student', label: 'Học viên', Icon: UsersIcon },
            { value: 'teacher', label: 'Giảng viên', Icon: GraduationCapIcon },
          ] as const).map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value as Role)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-[9px] py-2.5 text-[14px] font-semibold transition-all',
                role === value
                  ? 'bg-white text-primary shadow-sm border border-card-edge'
                  : 'text-muted hover:text-label',
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-[11px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-600">
          {error}
        </p>
      )}

      <TextField
        label="Họ và tên"
        type="text"
        autoComplete="name"
        placeholder="Nguyễn Văn A"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<UserIcon className="size-[19px]" />}
        error={fieldErrors.name}
      />
      <TextField
        className="mt-4"
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

      <div className="mt-4">
        <Checkbox
          label=""
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        {/* Inline label with link */}
        <span className="-mt-[26px] ml-8 block text-[13.5px] text-label pointer-events-none">
          Tôi đồng ý với{' '}
          <a href="#" className="pointer-events-auto font-semibold text-primary hover:underline">
            Điều khoản &amp; Bảo mật
          </a>
        </span>
        {fieldErrors.terms && <p className="mt-1.5 text-[12.5px] text-red-600">{fieldErrors.terms}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="mt-5">
        {isLoading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản'}
        {!isLoading && <ArrowRightIcon className="size-[19px]" />}
      </Button>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[12.5px] font-medium text-faint">hoặc</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button variant="outline" type="button">
        <GoogleIcon className="size-[19px]" />
        Đăng ký với Google
      </Button>

      <p className="mt-6 text-center text-[14px] text-muted">
        Đã có tài khoản?{' '}
        <Link to={PATHS.login} className="font-bold text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}
