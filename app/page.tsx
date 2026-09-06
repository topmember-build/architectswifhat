import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { Lore } from '@/components/home/lore'
import { Community } from '@/components/home/community'
import { Faq } from '@/components/home/faq'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Lore />
        <Community />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
