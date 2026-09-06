import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS, SITE } from '@/lib/site'
import { ArcMark } from '@/components/arc-mark'
import { ContractBar } from '@/components/contract-bar'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <ContractBar />

        <div className="mt-14 flex flex-col gap-10 border-t border-border pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <ArcMark className="size-9" />
              <span className="text-base font-bold tracking-tight">
                Architects<span className="text-arc">Wif</span>Hat
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{SITE.tagline} A 1/1 2026-supply NFT collection born from the Arc community for everyone who showed up, stayed, and built.</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Explore</p>
              {NAV_LINKS.map((link) => (
                <span key={link.href}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </a>
                  )}
                </span>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Connect</p>
              <a href={SITE.twitter} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {SITE.twitterHandle}
              </a>
              <Link href="/whitelist" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Whitelist
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 shadow-sm shadow-primary/10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OpenSea-Emblem-500x281-rrThHycdLLeEJxBSQNPvUVUgx0SVzM.png"
              width={22}
              height={22}
              alt="OpenSea"
              className="size-5 rounded-full object-cover"
            />
            <div>
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-primary">Minting on</p>
              <p className="text-xs font-bold text-foreground">OpenSea</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:items-end">

            <p>© {new Date().getFullYear()} ArchitectsWifHat. The hat stays on.</p>
            <p>You either get it… or you don&apos;t have the hat yet.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
