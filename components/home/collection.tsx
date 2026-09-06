import { SITE, TRAIT_CATEGORIES } from '@/lib/site'

export function Collection() {
  return (
    <section id="collection" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-arc">The Collection</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
            {SITE.supply.toLocaleString()} hats. One interchangeable trait system.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Every Architect is assembled from six trait categories — ten of each — with the original Arc logo preserved
            on every cap, garment, and accessory. Mix, match, and mint.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {TRAIT_CATEGORIES.map((cat) => (
            <article key={cat.name} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className={`flex aspect-[4/3] items-center justify-center overflow-hidden ${cat.name === 'Backgrounds' ? 'bg-secondary' : 'bg-bone'}`}>
                <img
                  src={cat.sample || '/placeholder.svg'}
                  alt={`${cat.name} trait sample`}
                  className={`size-full transition-transform duration-500 group-hover:scale-105 ${cat.name === 'Backgrounds' ? 'object-cover' : 'object-contain p-5'}`}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <h3 className="font-semibold">{cat.name}</h3>
                <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {cat.count} traits
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
