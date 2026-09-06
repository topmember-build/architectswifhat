import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { SITE } from '@/lib/site'

const OPENSEA_LOGO = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OpenSea-Logo-TDq9o5VT39506EpB2tsHYTgVI8qoPm.jpg'

const phases = [
  { name: 'Team', label: '01', description: 'The builders behind the hat get the first look.' },
  { name: 'Architect List', label: '02', description: 'Early supporters and core community architects.' },
  { name: 'GTD', label: '03', description: 'Guaranteed access for approved wallets.' },
  { name: 'FCFS', label: '04', description: 'First come, first served while supply lasts.' },
  { name: 'Public', label: '05', description: 'Open mint access for everyone.' },
]

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-arc">The collection</p>
              <h1 className="mt-5 text-balance text-5xl font-black tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Put the hat on <span className="text-arc">Architects.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                A 1/1 2026-supply NFT collection and lore-driven meme brand born from the Arc community. Every Architect has a story. Every hat means you were here.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="https://opensea.io/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
                  <Image src={OPENSEA_LOGO} alt="OpenSea" width={22} height={22} className="rounded-full object-cover" />
                  Mint on OpenSea <ArrowUpRight className="size-4" />
                </a>
                <Link href="/wl-checker" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary">
                  Check your WL status
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/70 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Supply</p><p className="mt-2 text-3xl font-black">2,026</p><p className="mt-1 text-xs text-muted-foreground">unique hats</p></div>
              <div className="rounded-2xl border border-border bg-secondary/70 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Network</p><p className="mt-2 text-3xl font-black">Arc</p><p className="mt-1 text-xs text-muted-foreground">mainnet</p></div>
              <div className="col-span-2 rounded-2xl border border-arc/35 bg-arc/10 p-5 sm:col-span-1 lg:col-span-2"><p className="font-mono text-[10px] uppercase tracking-widest text-arc">Mint status</p><p className="mt-2 text-3xl font-black text-arc">Coming soon</p><p className="mt-1 text-xs text-muted-foreground">dates and price will be announced</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-arc">Mint roadmap</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Five doors. One hat.</h2></div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">Access opens in stages so the community can mint in the order it helped build.</p>
            </div>
            <div className="mt-12 grid gap-3 md:grid-cols-5">
              {phases.map((phase, index) => (
                <article key={phase.name} className="relative rounded-2xl border border-border bg-card/80 p-5 md:min-h-64">
                  <div className="flex items-center justify-between"><span className="font-mono text-xs text-arc">{phase.label}</span>{index === 0 ? <Check className="size-4 text-arc" /> : <span className="size-2 rounded-full bg-border" />}</div>
                  <h3 className="mt-10 text-xl font-bold">{phase.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{phase.description}</p>
                  <div className="mt-7 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><p>Mint price: <span className="text-foreground">TBA</span></p><p className="mt-2">Mint date: <span className="text-foreground">TBA</span></p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-arc">Built on Arc</p><h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">A community artifact, not just a profile picture.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-border p-6"><p className="text-lg font-bold">Lore first</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The hat is a shared signal for the people who showed up, stayed, and built alongside Arc.</p></div><div className="rounded-2xl border border-border p-6"><p className="text-lg font-bold">OpenSea mint</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The official mint destination will be announced here when the collection is ready.</p><a href="https://opensea.io/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-arc hover:underline">Visit OpenSea <ExternalLink className="size-3.5" /></a></div></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
