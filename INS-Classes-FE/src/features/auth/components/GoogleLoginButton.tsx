import { Button } from '@/components/ui/Button'
import { GoogleIcon } from '@/components/ui/icons'

/** UI-only for now — the BE has no Google OAuth endpoint yet. */
export function GoogleLoginButton() {
  return (
    <Button variant="outline">
      <GoogleIcon className="size-4.75" />
      Tiếp tục với Google
    </Button>
  )
}
