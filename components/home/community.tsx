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
                aria-label={i === 2 ? 'Arc House community clip' : `ArchitectsWifHat community clip ${i + 1}`}
              />
              {i === 0 && (
                <div className="border-t border-border/80 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-arc">Architects program</p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight">Who is an Architect on Arc?</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    An Architect is an active member of the Arc community who contributes to the growth and success of the Arc ecosystem. Architects participate, build, share knowledge, help others, create content, attend events, and contribute to the community.
                  </p>
                  <div className="mt-5 grid gap-4 text-sm leading-6 text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground">How recognition works</h4>
                      <p className="mt-1">The Architects Program recognizes community contributions through a points-based system and tiers, creating opportunities for greater recognition, community roles, networking, events, and other benefits.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">How to become one</h4>
                      <p className="mt-1">You do not apply to become an Architect from the beginning. First join Arc House, participate in the community, and earn points through eligible contributions. Once you reach 500 points and opt into the Architects Program, you become a Tier 1 Architect.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">In simple terms</h4>
                      <p className="mt-1">Arc House is where you participate; Architects is how your contribution to the Arc community is recognized.</p>
                    </div>
                  </div>
                  <a href="https://community.arc.io/public/resources/architects-overview" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-arc hover:underline">
                    Learn more about the Architects Program
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              )}
              {i === 1 && (
                <div className="border-t border-border/80 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-arc">Community identity</p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight">Why own an ArchitectWifHat?</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    ArchitectsWifHat represents your place in the Arc community. It turns the Architect spirit into a recognizable community identity for the people building, supporting, and participating in the Arc ecosystem.
                  </p>
                  <div className="mt-5 grid gap-4 text-sm leading-6 text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground">A symbol of belonging</h4>
                      <p className="mt-1">Communities become stronger when their members have something that represents, “I’m part of this.” The hat can be your digital representation of the builder mindset and Arc identity.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">What it represents</h4>
                      <p className="mt-1">Show your Arc identity, celebrate the people creating and contributing, own a piece of community culture, connect with other holders, and celebrate your journey as a developer, creator, community member, or active participant.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Community collectible, not official status</h4>
                      <p className="mt-1">ArchitectsWifHat does not replace the official Architects badge or prove a tier. Owning it does not grant official Architect status, points, benefits, or a Circle or Arc role. Official status comes through the Arc House Architects Program and its requirements.</p>
                    </div>
                  </div>
                </div>
              )}
              {i === 2 && (
                <div className="border-t border-border/80 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-arc">Arc community guide</p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight">Are you on the Arc House?</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Arc House is the home of the Arc community: a global hub where builders, developers, founders,
                    creators, and ecosystem participants learn, connect, collaborate, and contribute.
                  </p>
                  <div className="mt-5 grid gap-4 text-sm leading-6 text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground">What you can do there</h4>
                      <p className="mt-1">Join discussions, explore Arc and stablecoin education, watch developer content, attend workshops and meetups, join regional chapters, share your work, and find collaborators.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">How to get started</h4>
                      <p className="mt-1">Create an account, complete your profile, then participate consistently. Read, watch, discuss, publish, answer questions, join groups, attend eligible events, and help other members.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Arc House and Architects</h4>
                      <p className="mt-1">Arc House is where you participate. Architects is how meaningful contribution can be recognized. Everyone starts at Tier 0, and reaching 500 points plus opting into the program can unlock Tier 1 Architect status.</p>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-5 text-muted-foreground">
                    Architects points have no monetary value and do not guarantee a token, airdrop, or financial reward. Program requirements and opportunities may change.
                  </p>
                  <a href="https://community.arc.io" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-arc hover:underline">
                    Enter Arc House
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </MotionReveal>

        <MotionReveal className="mt-14 overflow-hidden rounded-3xl border border-primary/40 bg-primary/10" delay={160}>
          <div className="flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-12">
            <h3 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to earn your ArchitectWifHat?</h3>
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
