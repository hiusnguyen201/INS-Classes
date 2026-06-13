import { Button } from '@/components/ui/Button'
import { GoogleIcon } from '@/components/ui/icons'

/** UI-only for now — the BE has no Google OAuth endpoint yet. */
export function GoogleLoginButton() {
  return (
    <Button variant="outline">
      <GoogleIcon className="size-[19px]" />
      Tiếp tục với Google
    </Button>
  )
}
