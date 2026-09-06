'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const result = mode === 'sign-up'
      ? await authClient.signUp.email({ name: String(data.get('name')), email: String(data.get('email')), password: String(data.get('password')) })
      : await authClient.signIn.email({ email: String(data.get('email')), password: String(data.get('password')) })
    setLoading(false)
    if (result.error) {
      setError('We could not complete that request. Check your details and try again.')
      return
    }
    router.push('/whitelist')
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold">{mode === 'sign-up' ? 'Create your applicant account' : 'Welcome back'}</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{mode === 'sign-up' ? 'You need an account to submit one protected whitelist application.' : 'Sign in to continue your whitelist application.'}</p>
      <div className="mt-6 flex flex-col gap-4">
        {mode === 'sign-up' && <label className="text-sm font-medium">Name<input name="name" required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring/50" /></label>}
        <label className="text-sm font-medium">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring/50" /></label>
        <label className="text-sm font-medium">Password<input name="password" type="password" minLength={8} required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring/50" /></label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-primary">{error}</p>}
      <button disabled={loading} className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">{loading ? 'Working…' : mode === 'sign-up' ? 'Create account' : 'Sign in'}</button>
      <p className="mt-5 text-center text-sm text-muted-foreground">{mode === 'sign-up' ? 'Already registered? ' : 'Need an account? '}<Link className="font-semibold text-foreground underline" href={mode === 'sign-up' ? '/sign-in' : '/sign-up'}>{mode === 'sign-up' ? 'Sign in' : 'Sign up'}</Link></p>
    </form>
  )
}
