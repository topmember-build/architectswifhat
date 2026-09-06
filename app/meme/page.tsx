import Link from 'next/link'
import { ArrowRight, CalendarDays, ExternalLink } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ArcMark } from '@/components/arc-mark'
import { SITE } from '@/lib/site'

export default function MemePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-arc/40 bg-arc/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-arc">
                <span className="size-1.5 rounded-full bg-arc" /> Coming soon
              </div>
              <h1 className="max-w-2xl text-balance text-5xl font-black tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                Put the hat on <span className="text-arc">Architects.</span>
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                ArchitectsWifHat is arriving on Arc mainnet. No chosen one. No complicated promises. Just an Architect, a hat, and a community that showed up.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/whitelist" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                  Apply for whitelist <ArrowRight className="size-4" />
                </Link>
                <a href={SITE.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary">
                  Follow the launch <ExternalLink className="size-4" />
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-2xl shadow-primary/10">
              <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary-foreground backdrop-blur-sm">
                <ArcMark className="size-4" /> Arc mainnet
              </div>
              <img src="/architectswifhat-components/hero/arc-hero.png" alt="Architect wearing the burgundy Arc hat" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/35">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:px-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
            <div className="flex items-center gap-4 md:px-8 md:first:pl-0">
              <CalendarDays className="size-6 text-arc" />
              <div><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Launch window</p><p className="mt-1 text-xl font-bold">September 16, 2026</p></div>
            </div>
            <div className="md:px-8"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Network</p><p className="mt-1 text-xl font-bold">Arc mainnet</p></div>
            <div className="md:px-8 md:pr-0"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</p><p className="mt-1 text-xl font-bold text-arc">Coming soon</p></div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-arc">The meme</p>
          <h2 className="mt-5 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">Nobody knows who put the hat on Architects.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
            Some say it was an architect. Some say it was a builder. Some say the hat was simply there one day. Nobody questioned it. They just started wearing it.
          </p>
          <p className="mt-8 text-lg font-semibold">You either get it… or you don&apos;t have the hat yet.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
