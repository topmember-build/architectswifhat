'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site'
import { ArcMark } from '@/components/arc-mark'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'border-b border-bone/15 bg-background/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <ArcMark className="size-9" />
          <span className="text-sm font-bold tracking-tight sm:text-base">
            Architects<span className="text-arc">Wif</span>Hat
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <>
              {link.href.startsWith('/') ? (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </a>
              )}
            </>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={SITE.twitter} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
            Follow on X
          </a>
          <Link href="/whitelist" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
            Apply for Whitelist
          </Link>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="flex size-10 items-center justify-center rounded-full border border-border lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <span key={link.href}>
                {link.href.startsWith('/') ? (
                  <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                    {link.label}
                  </a>
                )}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <a href={SITE.twitter} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium">
              Follow on X
            </a>
            <Link href="/whitelist" onClick={() => setOpen(false)} className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
              Apply for Whitelist
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
