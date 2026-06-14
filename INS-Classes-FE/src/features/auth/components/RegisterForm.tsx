import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/TextField";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  GoogleIcon,
} from "@/components/ui/icons";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { PATHS } from "@/config/paths";
import type { AuthDto } from "@/features/auth/types";

interface RegisterFormProps {
  onSuccess: (auth: AuthDto) => void
}

const schema = Yup.object({
  name: Yup.string().required("Vui lòng nhập họ và tên."),
  email: Yup.string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập email."),
  password: Yup.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự.")
    .required("Vui lòng nhập mật khẩu."),
  terms: Yup.boolean().oneOf(
    [true],
    "Bạn cần đồng ý với Điều khoản & Bảo mật.",
  ),
});

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { submit, isLoading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", terms: false },
    validationSchema: schema,
    onSubmit: async (values) => {
      const auth = await submit({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      if (auth) onSuccess(auth)
    },
  });

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
        label="Họ và tên"
        type="text"
        autoComplete="name"
        placeholder="Nguyễn Văn A"
        icon={<UserIcon className="size-4.75" />}
        error={formik.touched.name ? formik.errors.name : undefined}
        {...formik.getFieldProps("name")}
      />
      <TextField
        className="mt-4"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="ban@ins.edu.vn"
        icon={<MailIcon className="size-4.75" />}
        error={formik.touched.email ? formik.errors.email : undefined}
        {...formik.getFieldProps("email")}
      />
      <TextField
        className="mt-4"
        label="Mật khẩu"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="••••••••"
        icon={<LockIcon className="size-4.75" />}
        error={formik.touched.password ? formik.errors.password : undefined}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="shrink-0 cursor-pointer text-faint transition-colors hover:text-label"
          >
            {showPassword ? (
              <EyeOffIcon className="size-4.75" />
            ) : (
              <EyeIcon className="size-4.75" />
            )}
          </button>
        }
        {...formik.getFieldProps("password")}
      />

      <div className="mt-4">
        <span className="flex items-center gap-2">
          <Checkbox
            label=""
            checked={formik.values.terms}
            onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
            onBlur={() => formik.setFieldTouched("terms", true)}
          />
          <span className="text-[13.5px] text-label pointer-events-none">
            Tôi đồng ý với{" "}
            <a
              href="#"
              className="pointer-events-auto font-semibold text-primary hover:underline"
            >
              Điều khoản &amp; Bảo mật
            </a>
          </span>
        </span>
        {formik.touched.terms && formik.errors.terms && (
          <p className="mt-1.5 text-[12.5px] text-red-600">
            {formik.errors.terms}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="mt-5">
        {isLoading ? "Đang tạo tài khoản…" : "Tạo tài khoản"}
        {!isLoading && <ArrowRightIcon className="size-4.75" />}
      </Button>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[12.5px] font-medium text-faint">hoặc</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button variant="outline" type="button">
        <GoogleIcon className="size-4.75" />
        Đăng ký với Google
      </Button>

      <p className="mt-6 text-center text-[14px] text-muted">
        Đã có tài khoản?{" "}
        <Link
          to={PATHS.login}
          className="font-bold text-primary hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
