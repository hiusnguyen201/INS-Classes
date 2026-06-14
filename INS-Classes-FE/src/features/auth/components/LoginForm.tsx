import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { TextField } from '@/components/ui/TextField'
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/ui/icons'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { PATHS } from '@/config/paths'

const schema = Yup.object({
  email: Yup.string()
    .email('Email không đúng định dạng.')
    .required('Vui lòng nhập email.'),
  password: Yup.string().required('Vui lòng nhập mật khẩu.'),
})

export function LoginForm() {
  const { submit, isLoading, error } = useLogin()
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      await submit({ email: values.email, password: values.password }, remember)
    },
  })

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
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
        icon={<MailIcon className="size-[19px]" />}
        error={formik.touched.email ? formik.errors.email : undefined}
        {...formik.getFieldProps('email')}
      />
      <TextField
        className="mt-4"
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="••••••••"
        icon={<LockIcon className="size-[19px]" />}
        error={formik.touched.password ? formik.errors.password : undefined}
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
        {...formik.getFieldProps('password')}
      />

      <div className="mt-4 flex items-center justify-between">
        <Checkbox
          label="Ghi nhớ đăng nhập"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <Link to={PATHS.forgotPassword} className="text-[13.5px] font-semibold text-primary hover:underline">
          Quên mật khẩu?
        </Link>
      </div>

      <Button type="submit" disabled={isLoading} className="mt-[22px]">
        {isLoading ? 'Đang đăng nhập…' : 'Đăng nhập'}
        {!isLoading && <ArrowRightIcon className="size-[19px]" />}
      </Button>
    </form>
  )
}
