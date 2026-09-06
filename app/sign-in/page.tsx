import { AuthForm } from '@/components/auth-form'
import { SiteNav } from '@/components/site-nav'

export default function SignInPage() {
  return <><SiteNav /><main className="min-h-screen px-5 pb-20 pt-32 sm:px-8"><AuthForm mode="sign-in" /></main></>
}
