import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { Lore } from '@/components/home/lore'
import { Gallery } from '@/components/home/gallery'
import { Collection } from '@/components/home/collection'
import { Community } from '@/components/home/community'
import { Faq } from '@/components/home/faq'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Lore />
        <Gallery />
        <Collection />
        <Community />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
