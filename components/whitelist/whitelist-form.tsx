'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CircleCheck, ExternalLink, Plus, Trash2, PartyPopper } from 'lucide-react'
import { SITE } from '@/lib/site'

type TaskId = 'follow' | 'repost' | 'tag' | 'join'

type TaskDef = {
  id: TaskId
  title: string
  description: string
  action: string
  href: string
  proofLabel: string
  proofPlaceholder: string
}

const TASKS: TaskDef[] = [
  {
    id: 'follow',
    title: 'Follow on X',
    description: `Follow ${SITE.twitterHandle} to stay in the loop.`,
    action: 'Open X',
    href: SITE.twitter,
    proofLabel: 'Your X username',
    proofPlaceholder: '@yourhandle',
  },
  {
    id: 'repost',
    title: 'Repost the pinned post',
    description: 'Repost the pinned ArchitectsWifHat announcement.',
    action: 'Open post',
    href: SITE.twitter,
    proofLabel: 'Link to your repost',
    proofPlaceholder: 'https://x.com/...',
  },
  {
    id: 'tag',
    title: 'Tag 3 Architects',
    description: 'Tag three friends who need the hat.',
    action: 'Open X',
    href: SITE.twitter,
    proofLabel: 'Link to your tag post',
    proofPlaceholder: 'https://x.com/...',
  },
  {
    id: 'join',
    title: 'Join the community',
    description: 'Show up where the builders are.',
    action: 'Open X',
    href: SITE.twitter,
    proofLabel: 'Community username / handle',
    proofPlaceholder: 'yourhandle',
  },
]

const STEPS = ['Tasks', 'Proof', 'Wallet', 'Review'] as const

const isEvmAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value.trim())

export function WhitelistForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<Record<TaskId, boolean>>({ follow: false, repost: false, tag: false, join: false })
  const [proofs, setProofs] = useState<Record<TaskId, string>>({ follow: '', repost: '', tag: '', join: '' })
  const [wallets, setWallets] = useState<string[]>([''])
  const [submitted, setSubmitted] = useState(false)

  const allTasksDone = useMemo(() => TASKS.every((t) => done[t.id]), [done])
  const allProofsFilled = useMemo(() => TASKS.every((t) => proofs[t.id].trim().length > 2), [proofs])
  const validWallets = useMemo(() => wallets.map((w) => w.trim()).filter(Boolean), [wallets])
  const walletsValid = validWallets.length > 0 && validWallets.every(isEvmAddress)

  const canContinue = [allTasksDone, allProofsFilled, walletsValid, true][step]

  const updateWallet = (index: number, value: string) => setWallets((prev) => prev.map((w, i) => (i === index ? value : w)))
  const addWallet = () => setWallets((prev) => (prev.length >= 5 ? prev : [...prev, '']))
  const removeWallet = (index: number) => setWallets((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <PartyPopper className="size-7" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">Application received.</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Your whitelist application is in. Keep an eye on {SITE.twitterHandle} — spots are reviewed and announced there.
          You either get it… or you don&apos;t have the hat yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.twitter} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Follow for results
          </a>
          <Link href="/" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">
            Back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${i < step ? 'border-primary bg-primary text-primary-foreground' : i === step ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>
              {i < step ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={`hidden text-xs font-medium sm:block ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
            {i < STEPS.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold">Complete the tasks</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Do each task, then mark it complete. You&apos;ll add proof on the next step.</p>
            <div className="mt-6 flex flex-col gap-3">
              {TASKS.map((task) => (
                <div key={task.id} className={`rounded-2xl border p-4 transition-colors ${done[task.id] ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <a href={task.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
                      {task.action} <ExternalLink className="size-3" />
                    </a>
                  </div>
                  <button
                    onClick={() => setDone((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${done[task.id] ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-secondary'}`}
                  >
                    <CircleCheck className="size-4" />
                    {done[task.id] ? 'Completed' : 'Mark complete'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold">Submit your proof</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Add a handle or link for each task so we can verify it.</p>
            <div className="mt-6 flex flex-col gap-4">
              {TASKS.map((task) => (
                <label key={task.id} className="block">
                  <span className="text-sm font-medium">{task.proofLabel}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{task.title}</span>
                  <input
                    value={proofs[task.id]}
                    onChange={(e) => setProofs((prev) => ({ ...prev, [task.id]: e.target.value }))}
                    placeholder={task.proofPlaceholder}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring/50 transition focus:border-ring focus:ring-2"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold">Add your wallet</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">This is the wallet you want whitelisted for the mint. Add up to 5.</p>
            <div className="mt-6 flex flex-col gap-3">
              {wallets.map((wallet, i) => {
                const invalid = wallet.trim().length > 0 && !isEvmAddress(wallet)
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2">
                      <input
                        value={wallet}
                        onChange={(e) => updateWallet(i, e.target.value)}
                        placeholder="0x0000000000000000000000000000000000000000"
                        spellCheck={false}
                        className={`w-full rounded-xl border bg-background px-4 py-3 font-mono text-sm outline-none transition focus:ring-2 ${invalid ? 'border-primary ring-primary/40' : 'border-input ring-ring/50 focus:border-ring'}`}
                      />
                      <button
                        onClick={() => removeWallet(i)}
                        disabled={wallets.length === 1}
                        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                        aria-label="Remove wallet"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {invalid && <p className="mt-1.5 text-xs text-primary">Enter a valid wallet address (0x + 40 characters).</p>}
                  </div>
                )
              })}
            </div>
            {wallets.length < 5 && (
              <button onClick={addWallet} className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary">
                <Plus className="size-4" /> Add another wallet
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold">Review & submit</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Check everything looks right before submitting your application.</p>
            <dl className="mt-6 flex flex-col gap-3">
              {TASKS.map((task) => (
                <div key={task.id} className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
                  <div>
                    <dt className="text-sm font-medium">{task.title}</dt>
                    <dd className="mt-0.5 break-all font-mono text-xs text-muted-foreground">{proofs[task.id]}</dd>
                  </div>
                  <Check className="size-4 shrink-0 text-primary" />
                </div>
              ))}
              <div className="rounded-xl border border-border p-4">
                <dt className="text-sm font-medium">Wallet{validWallets.length > 1 ? 's' : ''}</dt>
                {validWallets.map((w) => (
                  <dd key={w} className="mt-1 break-all font-mono text-xs text-muted-foreground">{w}</dd>
                ))}
              </div>
            </dl>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canContinue && setStep((s) => s + 1)}
              disabled={!canContinue}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
            >
              Continue <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Submit application <Check className="size-4" />
            </button>
          )}
        </div>
      </div>

      {!canContinue && step < 3 && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {step === 0 && 'Complete all tasks to continue.'}
          {step === 1 && 'Add proof for every task to continue.'}
          {step === 2 && 'Enter at least one valid wallet address to continue.'}
        </p>
      )}
    </div>
  )
}
