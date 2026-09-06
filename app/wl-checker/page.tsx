import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export default function WLCheckerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="flex min-h-[calc(100vh-5rem)] items-center px-5 pb-20 pt-32 sm:px-8">
        <section className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-arc/40 bg-arc/10 text-arc"><ShieldCheck className="size-7" /></div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-arc">Whitelist checker</p>
          <h1 className="mt-4 text-balance text-5xl font-black tracking-[-0.06em] sm:text-7xl">Coming <span className="text-arc">soon.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">The WL checker is being built for the community. Connect your wallet here later to see your mint phase and eligibility.</p>
          <Link href="/collection" className="mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"><ArrowLeft className="size-4" /> Back to collection</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
