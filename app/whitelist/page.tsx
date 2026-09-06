import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { WhitelistForm } from '@/components/whitelist/whitelist-form'
import { SITE } from '@/lib/site'

export const metadata = {
  title: `Whitelist — ${SITE.name}`,
  description: 'Complete the ArchitectsWifHat community tasks, submit proof, and add the wallet you want whitelisted.',
}

export default function WhitelistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <section className="border-b border-border px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">Early access</p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Get your hat in the build.</h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                Everyone gets a fair shot. Complete the community tasks, verify your proof, and add one wallet for a whitelist spot.
              </p>
            </div>
          </div>
        </section>
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <WhitelistForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
