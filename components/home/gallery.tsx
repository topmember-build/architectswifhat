import { CHARACTERS } from '@/lib/site'

export function Gallery() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-arc">The Architects</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">Everyone who showed up.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Ten of everyone, and every one different — each Architect built from the same hat and the same community.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CHARACTERS.map((src, i) => (
            <figure key={src} className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={src || '/placeholder.svg'}
                alt={`ArchitectsWifHat character ${i + 1}`}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent px-3 pb-2.5 pt-8 font-mono text-[10px] uppercase tracking-widest text-foreground/90">
                <span>Architect</span>
                <span>#{String(i + 1).padStart(3, '0')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
