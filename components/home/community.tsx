import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MotionReveal } from '@/components/motion-reveal'
import { SITE, VIDEOS } from '@/lib/site'

export function Community() {
  return (
    <section id="community" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-arc">The Community</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">Straight from the timeline.</h2>
          </div>
          <a href={SITE.twitter} target="_blank" rel="noreferrer" className="text-sm font-semibold text-arc hover:underline">
            {SITE.twitterHandle}
          </a>
        </div>

        <MotionReveal className="mt-12 grid gap-4 md:grid-cols-3">
          {VIDEOS.map((src, i) => (
            <div key={src} className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10">
              <video
                src={src}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`ArchitectsWifHat community clip ${i + 1}`}
              />
            </div>
          ))}
        </MotionReveal>

        <MotionReveal className="mt-14 overflow-hidden rounded-3xl border border-primary/40 bg-primary/10" delay={160}>
          <div className="flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-12">
            <h3 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to earn your hat?</h3>
            <p className="max-w-xl text-pretty leading-7 text-muted-foreground">
              Whitelist spots are earned, not given. Complete the community tasks, submit your proof, and link your
              wallet to secure a spot.
            </p>
            <Link href="/whitelist" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:-translate-y-0.5">
              Apply for Whitelist
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
