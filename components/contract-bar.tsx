'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SITE } from '@/lib/site'

export function ContractBar() {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.contract)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Contract Address</p>
        <p className="mt-1 font-mono text-sm text-foreground">{SITE.contract}</p>
      </div>
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
