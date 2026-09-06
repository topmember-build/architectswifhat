import { MotionReveal } from '@/components/motion-reveal'

const chapters = [
  {
    eyebrow: 'Chapter 01 · The beginning',
    title: 'It started with a hat.',
    body: 'Nobody knows exactly where it came from. Some say an Architect put it on first. Some say a builder found it. Some say it appeared when the first people started believing Arc could become something bigger. Nobody remembers. And honestly, nobody cares. Once the hat appeared, the Architects started wearing it—not because someone told them to, but because they understood what it meant.',
  },
  {
    eyebrow: 'Chapter 02 · The Architect',
    title: 'An Architect is someone who showed up.',
    body: 'On Arc, an Architect is not defined by a title. Architects are the pioneers, builders, artists, developers, community leaders, space runners, helpful voices, and quiet contributors who stayed when there was nothing to gain except the feeling that something important was being built. They all have one thing in common: they were there.',
  },
  {
    eyebrow: 'Chapter 03 · The hat',
    title: 'The symbol belongs to everyone building Arc.',
    body: 'Nobody knows what the hat actually does. It does not give you power, make you important, make you an OG, or guarantee anything. It simply represents belonging to the people building Arc. You do not need permission, a title, or fame. You just need to put the hat on—and become part of the story.',
  },
  {
    eyebrow: 'Chapter 04 · The first Architects',
    title: 'They built before the building was finished.',
    body: 'Before Arc became a place filled with thousands of voices, people were already standing around the blueprint. Some built technology. Some built communities, culture, and conversations. Some simply kept showing up. The blueprint became a network, the network became a community, and the hat remained.',
  },
]

export function Lore() {
  return (
    <section id="lore" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-arc">The Architects&apos; Chronicle</p>
          <h2 className="mx-auto mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            A community, a blueprint, and a hat.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-7 text-muted-foreground">
            ArchitectsWifHat is the visual history of the Arc community—the personalities, pioneers, builders, leaders, creators, and culture that helped shape it.
          </p>
        </MotionReveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {chapters.map((chapter, index) => (
            <MotionReveal key={chapter.eyebrow} delay={index * 90}>
              <article className="h-full rounded-2xl border border-border bg-card p-7 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/60 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-arc">{chapter.eyebrow}</p>
                <h3 className="mt-4 text-xl font-bold leading-tight sm:text-2xl">{chapter.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{chapter.body}</p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal className="mt-5" delay={180}>
          <article className="rounded-2xl border border-primary/40 bg-primary/10 p-7 sm:p-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">The Architects&apos; rule</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">Don&apos;t wait for someone else to build it.</h3>
              </div>
              <p className="leading-7 text-muted-foreground">See something missing? Build it. Have an idea? Share it. See someone struggling? Help them. See something worth creating? Create it. Architects do not stand outside the building pointing at the blueprint. They pick up the tools.</p>
            </div>
          </article>
        </MotionReveal>

        <MotionReveal className="mt-5" delay={240}>
          <figure className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
            <blockquote className="mx-auto max-w-3xl text-balance text-2xl font-bold leading-snug sm:text-4xl">
              “There was never supposed to be a complicated explanation. There was just a community… and a hat.”
            </blockquote>
            <figcaption className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">And that&apos;s the meme</figcaption>
          </figure>
        </MotionReveal>
      </div>
    </section>
  )
}
