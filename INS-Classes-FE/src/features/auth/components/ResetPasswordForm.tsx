import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'

const schema = Yup.object({
  password: Yup.string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự.')
    .required('Vui lòng nhập mật khẩu mới.'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp.')
    .required('Vui lòng xác nhận mật khẩu.'),
})

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState(false)

  const formik = useFormik({
    initialValues: { password: '', confirm: '' },
    validationSchema: schema,
    onSubmit: (_values) => {
      // BE endpoint not yet implemented — show success UI
      setDone(true)
    },
  })

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
    <form noValidate onSubmit={formik.handleSubmit}>
      <TextField
        label="Mật khẩu mới"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
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
      <TextField
        className="mt-4"
        label="Xác nhận mật khẩu"
        type={showConfirm ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="••••••••"
        icon={<LockIcon className="size-[19px]" />}
        error={formik.touched.confirm ? formik.errors.confirm : undefined}
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
        {...formik.getFieldProps('confirm')}
      />
      <Button type="submit" className="mt-5">
        Đặt lại mật khẩu
        <CheckIcon className="size-[17px]" />
      </Button>
    </form>
  )
}
