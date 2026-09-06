import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BreathingSphere } from '@/components/home/breathing-sphere'
import { MotionReveal } from '@/components/motion-reveal'
import { SITE } from '@/lib/site'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/55 to-background" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-24 size-[520px] -translate-x-1/2 rounded-full bg-arc/20 blur-[120px] motion-safe:animate-[pulse_7s_ease-in-out_infinite]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <MotionReveal className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-arc">
            <span className="size-1.5 rounded-full bg-arc" /> 1/1 2026 supply · Born from {SITE.chain}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Put the Hat on <span className="text-primary">Architects</span>.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Nobody knows who put the hat on Architects. Nobody questioned it. They just started wearing it. This is the
            1/1 collection for everyone who showed up, stayed, and built with the Arc community.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/whitelist" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:-translate-y-0.5">
              Apply for Whitelist
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={SITE.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary">
              Follow on X
            </a>
          </div>
          <dl className="mt-10 flex gap-8 border-t border-border pt-6">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Supply</dt>
              <dd className="mt-1 text-2xl font-bold">{SITE.supply.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Chosen ones</dt>
              <dd className="mt-1 text-2xl font-bold">0</dd>
            </div>
          </dl>
        </MotionReveal>

        <MotionReveal className="relative" delay={140}>
          <div className="absolute -inset-4 rounded-[2rem] bg-arc/10 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-border bg-[radial-gradient(circle_at_center,oklch(0.3_0.08_255),oklch(0.15_0.04_260)_68%)] shadow-2xl shadow-black/40">
            <Image
              src="/architectswifhat-components/hero/arc-hero.png"
              width={1200}
              height={1200}
              priority
              alt="An Architect wearing the burgundy Arc cap and cream Arc tee, arms crossed in front of the Arc logo"
              className="absolute inset-0 size-full object-cover opacity-35 mix-blend-screen"
            />
            <BreathingSphere />
            <div className="pointer-events-none absolute inset-6 rounded-full border border-arc/20" />
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-arc/70">
              <span>Architect field / 001</span>
              <span className="flex items-center gap-2"><span className="size-1.5 animate-pulse rounded-full bg-arc" /> evolving</span>
            </div>
          </div>
        </MotionReveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/60 py-3 backdrop-blur-sm">
        <div className="flex overflow-hidden">
          <div className="awh-marquee flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                Put the hat on Architects <span className="text-primary">✦</span> ArchitectsWifHat <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
          <div className="awh-marquee flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                Put the hat on Architects <span className="text-primary">✦</span> ArchitectsWifHat <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
