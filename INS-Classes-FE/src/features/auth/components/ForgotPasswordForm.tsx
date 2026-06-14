import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { MailIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'

const schema = Yup.object({
  email: Yup.string()
    .email('Email không đúng định dạng.')
    .required('Vui lòng nhập email.'),
})

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false)

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    onSubmit: (_values) => {
      // BE endpoint not yet implemented — show success UI
      setSubmitted(true)
    },
  })

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <div className="flex size-[56px] items-center justify-center rounded-2xl bg-green-50">
          <svg viewBox="0 0 24 24" fill="none" className="size-7 text-green-600">
            <path d="M22 16.01V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 5l10 7 4.5-3.15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 3l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-[18px] font-bold text-ink">Đã gửi liên kết!</h2>
        <p className="text-[14px] leading-[1.6] text-muted">
          Kiểm tra hộp thư của <span className="font-semibold text-ink">{formik.values.email}</span>.
          <br />Liên kết đặt lại mật khẩu sẽ hết hạn sau 30 phút.
        </p>
        <Link to={PATHS.login} className="mt-2 text-[14px] font-semibold text-primary hover:underline">
          Quay lại đăng nhập
        </Link>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="ban@ins.edu.vn"
        icon={<MailIcon className="size-[19px]" />}
        error={formik.touched.email ? formik.errors.email : undefined}
        {...formik.getFieldProps('email')}
      />
      <Button type="submit" className="mt-5">
        Gửi liên kết đặt lại
        <MailIcon className="size-[17px]" />
      </Button>
      <p className="mt-5 text-center text-[13.5px] text-muted">
        Nhớ mật khẩu rồi?{' '}
        <Link to={PATHS.login} className="font-semibold text-primary hover:underline">
          Quay lại đăng nhập
        </Link>
      </p>
    </form>
  )
}
