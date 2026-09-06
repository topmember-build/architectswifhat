'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CircleCheck, ExternalLink, PartyPopper, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/site'
import { authClient } from '@/lib/auth-client'
import { submitWhitelistApplication, verifyWhitelistProofs } from '@/app/actions/whitelist'

type TaskId = 'follow' | 'repost' | 'tag' | 'join'
type TaskDef = { id: TaskId; title: string; description: string; action: string; href: string; proofLabel: string; proofPlaceholder: string }
const TASKS: TaskDef[] = [
  { id: 'follow', title: 'Follow on X', description: `Follow ${SITE.twitterHandle} to stay in the loop.`, action: 'Open X', href: SITE.twitter, proofLabel: 'Your X profile URL', proofPlaceholder: 'https://x.com/yourhandle' },
  { id: 'repost', title: 'Repost the pinned post', description: 'Repost the pinned ArchitectsWifHat announcement.', action: 'Open X', href: SITE.twitter, proofLabel: 'Link to your repost', proofPlaceholder: 'https://x.com/yourhandle/status/...' },
  { id: 'tag', title: 'Tag 3 Architects', description: 'Tag three friends who need the hat.', action: 'Open X', href: SITE.twitter, proofLabel: 'Link to your tag post', proofPlaceholder: 'https://x.com/yourhandle/status/...' },
  { id: 'join', title: 'Join the community', description: 'Show up where the builders are.', action: 'Open X', href: SITE.twitter, proofLabel: 'Community proof URL', proofPlaceholder: 'https://x.com/...' },
]
const STEPS = ['Tasks', 'Verify proof', 'Wallet', 'Review'] as const
const isEvmAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value.trim())

export function WhitelistForm() {
  const { data: session, isPending: sessionPending } = authClient.useSession()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<Record<TaskId, boolean>>({ follow: false, repost: false, tag: false, join: false })
  const [proofs, setProofs] = useState<Record<TaskId, string>>({ follow: '', repost: '', tag: '', join: '' })
  const [wallet, setWallet] = useState('')
  const [verification, setVerification] = useState<Record<TaskId, boolean>>({ follow: false, repost: false, tag: false, join: false })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const allTasksDone = useMemo(() => TASKS.every((task) => done[task.id]), [done])
  const allProofsFilled = useMemo(() => TASKS.every((task) => proofs[task.id].trim().length > 8), [proofs])
  const allVerified = useMemo(() => TASKS.every((task) => verification[task.id]), [verification])
  const canContinue = [allTasksDone, allProofsFilled && allVerified, isEvmAddress(wallet), true][step]

  if (sessionPending) return <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground">Loading secure application…</p>
  if (!session) return <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center"><ShieldCheck className="mx-auto size-8 text-primary" /><h2 className="mt-4 text-2xl font-bold">Sign in to apply</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Create one account so every applicant can submit only one wallet.</p><Link href="/sign-up" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Create applicant account</Link></div>
  if (submitted) return <div className="mx-auto max-w-xl rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center sm:p-12"><div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><PartyPopper className="size-7" /></div><h2 className="mt-6 text-2xl font-extrabold">Application received.</h2><p className="mt-3 leading-7 text-muted-foreground">One wallet is now attached to your application. Keep an eye on {SITE.twitterHandle} for updates.</p></div>

  async function verifyProofs() {
    setBusy(true); setMessage('')
    const result = await verifyWhitelistProofs({ proofs })
    setBusy(false)
    if (!result.ok) { setVerification(Object.fromEntries(result.results.map((item) => [item.key, item.verified])) as Record<TaskId, boolean>); setMessage('Every proof link must be reachable and match the required task before wallet entry unlocks.'); return false }
    setVerification({ follow: true, repost: true, tag: true, join: true }); return true
  }

  async function submit() {
    setBusy(true); setMessage('')
    try { await submitWhitelistApplication({ wallet, proofs }); setSubmitted(true) } catch (error) { setMessage(error instanceof Error && error.message === 'ALREADY_APPLIED' ? 'This account already submitted an application. Only one wallet is allowed per user.' : 'We could not verify and save this application. Please check every proof link and try again.') } finally { setBusy(false) }
  }

  return <div className="mx-auto max-w-2xl"><ol className="flex items-center gap-2">{STEPS.map((label, i) => <li key={label} className="flex flex-1 items-center gap-2"><div className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${i < step ? 'border-primary bg-primary text-primary-foreground' : i === step ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>{i < step ? <Check className="size-4" /> : i + 1}</div><span className={`hidden text-xs font-medium sm:block ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>{i < STEPS.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}</li>)}</ol>
    <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
      {step === 0 && <div><h2 className="text-xl font-bold">Complete every task</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">All four tasks are required. Your account and proofs are checked server-side.</p><div className="mt-6 flex flex-col gap-3">{TASKS.map((task) => <div key={task.id} className={`rounded-2xl border p-4 ${done[task.id] ? 'border-primary/50 bg-primary/5' : 'border-border'}`}><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">{task.title}</h3><p className="mt-1 text-sm text-muted-foreground">{task.description}</p></div><a href={task.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium">{task.action}<ExternalLink className="size-3" /></a></div><button onClick={() => setDone((previous) => ({ ...previous, [task.id]: !previous[task.id] }))} className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${done[task.id] ? 'bg-primary text-primary-foreground' : 'border border-border'}`}><CircleCheck className="size-4" />{done[task.id] ? 'Completed' : 'Mark complete'}</button></div>)}</div></div>}
      {step === 1 && <div><h2 className="text-xl font-bold">Verify every proof link</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">We check that each URL is reachable and belongs to the expected platform before the wallet step unlocks.</p><div className="mt-6 flex flex-col gap-4">{TASKS.map((task) => <label key={task.id} className="block"><span className="text-sm font-medium">{task.proofLabel}</span><input value={proofs[task.id]} onChange={(event) => { setProofs((previous) => ({ ...previous, [task.id]: event.target.value })); setVerification((previous) => ({ ...previous, [task.id]: false })) }} placeholder={task.proofPlaceholder} className={`mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 ${verification[task.id] ? 'border-primary' : 'border-input'}`} />{verification[task.id] && <span className="mt-1 block text-xs text-primary">Verified and reachable</span>}</label>)}</div><button onClick={verifyProofs} disabled={!allProofsFilled || busy} className="mt-6 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary disabled:opacity-40">{busy ? 'Checking links…' : 'Verify all links'}</button></div>}
      {step === 2 && <div><h2 className="text-xl font-bold">Add your wallet</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">One account. One wallet. This address is permanently attached to your application.</p><input value={wallet} onChange={(event) => setWallet(event.target.value)} placeholder="0x0000000000000000000000000000000000000000" spellCheck={false} className="mt-6 w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring/50" />{wallet && !isEvmAddress(wallet) && <p className="mt-2 text-xs text-primary">Enter a valid EVM wallet address.</p>}</div>}
      {step === 3 && <div><h2 className="text-xl font-bold">Review & submit</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Every task is verified. One wallet will be saved to this account.</p><dl className="mt-6 flex flex-col gap-3"><div className="rounded-xl border border-border p-4"><dt className="text-sm font-medium">Verified tasks</dt><dd className="mt-1 text-sm text-primary">4 of 4 links verified</dd></div><div className="rounded-xl border border-border p-4"><dt className="text-sm font-medium">Wallet</dt><dd className="mt-1 break-all font-mono text-xs text-muted-foreground">{wallet}</dd></div></dl></div>}
      {message && <p role="alert" className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm text-primary">{message}</p>}
      <div className="mt-8 flex items-center justify-between gap-3"><button onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0 || busy} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold disabled:opacity-40"><ArrowLeft className="size-4" />Back</button>{step < 3 ? <button onClick={async () => { if (step === 1 && allProofsFilled && !allVerified) { if (!(await verifyProofs())) return }; if (canContinue) setStep((value) => value + 1) }} disabled={!canContinue || busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40">Continue<ArrowRight className="size-4" /></button> : <button onClick={submit} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40">{busy ? 'Submitting…' : 'Submit application'}<Check className="size-4" /></button>}</div>
    </div>
    <p className="mt-4 text-center text-xs text-muted-foreground">We verify every proof server-side and enforce one application and one wallet per account.</p>
  </div>
}
