import { MotionReveal } from '@/components/motion-reveal'

export function Lore() {
  return (
    <section id="lore" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-arc">The Lore</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Nobody put the hat on Architects. It was simply there one day.
        </h2>

        <MotionReveal className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/60">
            <h3 className="text-lg font-bold text-arc">Some say it was an architect.</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Some say it was a builder. Some say the hat was simply there one day. Nobody questioned it. They just
              started wearing it.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/60">
            <h3 className="text-lg font-bold text-arc">No chosen one.</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              ArchitectsWifHat is a community NFT collection and meme for everyone who showed up, stayed, built, and
              watched Arc become what it is today. No complicated promises.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={120}>
        <figure className="mt-10 transition-transform duration-500 hover:-translate-y-1 rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center sm:p-12">
          <blockquote className="text-balance text-2xl font-bold leading-snug sm:text-4xl">
            “You either get it… or you don&apos;t have the hat yet.”
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-primary">
            Just an Architect, a hat, and a community
          </figcaption>
        </figure>
        </MotionReveal>
      </div>
    </section>
  )
}
