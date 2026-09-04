'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Dice5,
  Download,
  Grid2X2,
  Layers3,
  Menu,
  Plus,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react'

const artwork = [
  { id: '1908', name: 'Arc Runner', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1908-ggimWu9G4ZrTZYnKKWEPdN2xtMXSbh.jpeg', skin: 'Sunlit', cap: 'Plum Arc', expression: 'Big grin', clothing: 'Plum tee / work pants', accessory: 'Arc badge' },
  { id: '1945', name: 'Night Architect', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1945-sG0USXA9wXLQaryMyIxMjqfN7P6Hkq.jpeg', skin: 'Golden', cap: 'Pink Arc', expression: 'Soft smile', clothing: 'Lilac utility set', accessory: 'Key chain' },
  { id: '1909', name: 'Blue Collar', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1909-Z1JP2wC4ncz5gKPrEeqMOzZaWkY5mR.jpeg', skin: 'Amber', cap: 'Brown Arc', expression: 'Grin + specs', clothing: 'Blue tee / black pants', accessory: 'Glasses' },
  { id: '1917', name: 'Pattern Maker', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1917-36xe2huacBw5mMsVqlVMVsZ0fLgFkM.jpeg', skin: 'Deep umber', cap: 'Burgundy Arc', expression: 'Wide eyes', clothing: 'Gray tee / burgundy pants', accessory: 'Arm ink' },
  { id: '1949', name: 'Studio Lead', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1949-vkUli3Spi3QnQH30DGSdA9ZLi566Ti.jpeg', skin: 'Cinnamon', cap: 'Navy Arc', expression: 'Bearded smile', clothing: 'Slate tee / black pants', accessory: 'Arc badge' },
  { id: '1947', name: 'Line Walker', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1947-JYOGbbhnPQ2AP3uupzriUTzAcUF7dU.jpeg', skin: 'Tangerine', cap: 'Burgundy Arc', expression: 'Calm', clothing: 'Graphite tee / black pants', accessory: 'Glasses' },
  { id: '1911', name: 'First Draft', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1911-ni6zHZPDdVJdOK9j2LFSkgHWBejNSE.jpeg', skin: 'Tangerine', cap: 'Burgundy Arc', expression: 'Neutral', clothing: 'Mauve tee / brown pants', accessory: 'Arc badge' },
  { id: '1921', name: 'Golden Hour', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1921-74SRvdCBIANYqLqJEGmLNQIHxaShI9.png', skin: 'Copper', cap: 'Hot pink Arc', expression: 'Side-eye', clothing: 'Lilac tee / dark pants', accessory: 'Long curls' },
  { id: '1920', name: 'Heavy Build', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1920-UwSfJyrkLtKtgiDAQhIeMrDUG5Uara.jpeg', skin: 'Burnt umber', cap: 'Burgundy Arc', expression: 'Open grin', clothing: 'Blue tee / black pants', accessory: 'Full beard' },
  { id: '1948', name: 'Open Canvas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1948-m7Yhq3pZf2lFwbK5fxJ7p1DowPHOVg.jpeg', skin: 'Deep umber', cap: 'Burgundy Arc', expression: 'Surprised', clothing: 'Blue tee / black pants', accessory: 'Full beard' },
]

const traitGroups = [
  { label: 'Skins', count: 8, color: 'bg-gold', items: ['Sunlit', 'Golden', 'Amber', 'Deep umber', 'Cinnamon', 'Tangerine', 'Copper', 'Burnt umber'] },
  { label: 'Caps', count: 7, color: 'bg-plum', items: ['Plum Arc', 'Pink Arc', 'Brown Arc', 'Burgundy Arc', 'Navy Arc', 'Hot pink Arc', 'Black Arc'] },
  { label: 'Clothing', count: 12, color: 'bg-blue', items: ['Plum tee', 'Lilac utility', 'Blue tee', 'Gray tee', 'Slate tee', 'Graphite tee'] },
  { label: 'Accessories', count: 15, color: 'bg-gold', items: ['Arc badge', 'Key chain', 'Glasses', 'Arm ink', 'Long curls', 'Full beard'] },
  { label: 'Expressions', count: 9, color: 'bg-plum', items: ['Big grin', 'Soft smile', 'Wide eyes', 'Calm', 'Side-eye', 'Surprised'] },
  { label: 'Backgrounds', count: 6, color: 'bg-blue', items: ['Bone', 'Blueprint', 'Midnight', 'Studio gray', 'Arc plum', 'Paper grid'] },
]

const navItems = [
  { label: 'Overview', icon: Grid2X2 },
  { label: 'Trait lab', icon: Layers3, active: true },
  { label: 'Collection', icon: Sparkles },
]

export default function Page() {
  const [selected, setSelected] = useState(0)
  const [activeGroup, setActiveGroup] = useState('All traits')
  const [showDetails, setShowDetails] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [generated, setGenerated] = useState(1248)
  const current = artwork[selected]

  const visibleTraits = useMemo(() => activeGroup === 'All traits' ? traitGroups : traitGroups.filter((group) => group.label === activeGroup), [activeGroup])

  function generateVariant() {
    setSelected(Math.floor(Math.random() * artwork.length))
    setGenerated((value) => Math.min(value + 1, 3333))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-card px-5 py-6 transition-transform lg:static lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-plum text-card font-serif text-xl font-bold">A</div>
              <div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Collection studio</p><p className="font-serif text-lg font-semibold">Architects<span className="text-plum">Wif</span>Hat</p></div>
            </div>
            <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="lg:hidden"><X className="size-5" /></button>
          </div>
          <div className="mt-12 flex flex-col gap-2">
            {navItems.map(({ label, icon: Icon, active }) => <button key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${active ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'}`}><Icon className="size-4" />{label}{active && <span className="ml-auto size-1.5 rounded-full bg-plum" />}</button>)}
          </div>
          <div className="mt-auto rounded-2xl border border-border bg-secondary/60 p-4"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2026 supply</span><span className="text-xs font-medium text-plum">37%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[37%] rounded-full bg-plum" /></div><p className="mt-3 text-xs leading-5 text-muted-foreground">1,248 of 3,333 variants composed</p></div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8 lg:px-10"><button aria-label="Open navigation" onClick={() => setMobileNav(true)} className="lg:hidden"><Menu className="size-5" /></button><div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-gold" /> 2026 / trait lab</div><div className="ml-auto flex items-center gap-2"><button className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary sm:flex"><Download className="size-3.5" /> Export brief</button><button onClick={generateVariant} className="flex items-center gap-2 rounded-lg bg-plum px-3 py-2 text-xs font-medium text-card transition-transform hover:-translate-y-0.5"><WandSparkles className="size-3.5" /> Generate variant</button></div></header>

          <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-plum">A trait system for builders</p><h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">Build the character.<br /><span className="text-muted-foreground">Keep the signal.</span></h1></div><div className="max-w-xs text-sm leading-6 text-muted-foreground">A modular archive of people, pieces, and personality for the ArchitectsWifHat 2026 supply.</div></div>

            <div className="mt-10 flex gap-2 overflow-x-auto pb-1">{['All traits', ...traitGroups.map((group) => group.label)].map((label) => <button key={label} onClick={() => setActiveGroup(label)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${activeGroup === label ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'}`}>{label}</button>)}</div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="min-w-0"><div className="mb-4 flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Trait inventory</p><h2 className="mt-1 font-serif text-2xl">The building blocks</h2></div><span className="text-xs text-muted-foreground">{visibleTraits.length} categories</span></div><div className="grid gap-3 sm:grid-cols-2">{visibleTraits.map((group) => <div key={group.label} className="group rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"><div className="flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-lg ${group.color} text-card`}><Layers3 className="size-4" /></div><span className="font-mono text-[10px] text-muted-foreground">{String(group.count).padStart(2, '0')} traits</span></div><h3 className="mt-5 font-serif text-xl">{group.label}</h3><div className="mt-3 flex flex-wrap gap-1.5">{group.items.slice(0, 4).map((item) => <span key={item} className="rounded-md bg-secondary px-2 py-1 text-[11px] text-muted-foreground">{item}</span>)}<span className="rounded-md bg-secondary px-2 py-1 text-[11px] text-muted-foreground">+{group.items.length > 4 ? group.items.length - 4 : 0}</span></div><button className="mt-5 flex items-center gap-1 text-xs font-medium text-plum opacity-0 transition-opacity group-hover:opacity-100">Open category <ChevronRight className="size-3" /></button></div>)}</div></div>

              <div className="rounded-3xl border border-border bg-secondary/60 p-3 sm:p-4"><div className="flex items-center justify-between px-2 pb-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Live composition</p><p className="mt-1 text-xs text-muted-foreground">Preview #{String(generated).padStart(4, '0')}</p></div><button aria-label="Copy preview ID" className="rounded-md p-2 text-muted-foreground hover:bg-background hover:text-foreground"><Copy className="size-3.5" /></button></div><button onClick={() => setShowDetails(true)} className="group relative block aspect-[0.78] w-full overflow-hidden rounded-2xl bg-bone"><div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49%,rgba(28,23,37,0.07)_50%,transparent_51%)] bg-[length:18px_18px]" /><img src={current.image} alt={`${current.name} character preview`} className="relative z-10 size-full object-contain object-center p-4 transition-transform duration-500 group-hover:scale-[1.04]" /><div className="absolute bottom-3 left-3 z-20 rounded-full bg-card/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur">{current.name}</div><div className="absolute right-3 top-3 z-20 rounded-full bg-plum px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-card">1 / 10</div></button><div className="grid grid-cols-3 gap-2 pt-3"><div className="rounded-xl bg-background p-3"><p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Signature</p><p className="mt-1 text-xs font-medium">Arc mark</p></div><div className="rounded-xl bg-background p-3"><p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Rarity</p><p className="mt-1 text-xs font-medium text-plum">Rare</p></div><div className="rounded-xl bg-background p-3"><p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Score</p><p className="mt-1 text-xs font-medium">8.4 / 10</p></div></div></div>
            </div>

            <div className="mt-12 border-t border-border pt-6"><div className="mb-5 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Reference archive</p><h2 className="mt-1 font-serif text-2xl">The first architects</h2></div><button className="flex items-center gap-1 text-xs font-medium text-plum">View all <ArrowUpRight className="size-3.5" /></button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{artwork.slice(0, 5).map((item, index) => <button key={item.id} onClick={() => setSelected(index)} className={`group overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-1 ${selected === index ? 'border-plum ring-1 ring-plum' : 'border-border'}`}><div className="aspect-[0.82] overflow-hidden bg-bone"><img src={item.image} alt={`${item.name} reference`} className="size-full object-contain transition-transform duration-300 group-hover:scale-105" /></div><div className="p-3"><p className="text-xs font-medium">{item.name}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">AWF #{item.id}</p></div></button>)}</div></div>
          </div>
        </section>
      </div>
      {showDetails && <div role="dialog" aria-modal="true" aria-label="Variant details" className="fixed inset-0 z-30 flex items-center justify-center bg-foreground/60 p-5 backdrop-blur-sm" onClick={() => setShowDetails(false)}><div className="grid max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-card p-4 shadow-2xl sm:grid-cols-2" onClick={(event) => event.stopPropagation()}><div className="relative overflow-hidden rounded-2xl bg-bone"><img src={current.image} alt={`${current.name} enlarged preview`} className="size-full object-contain" /></div><div className="flex flex-col p-5"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-plum">Generated variant</p><h2 className="mt-2 font-serif text-3xl">{current.name}</h2></div><button aria-label="Close details" onClick={() => setShowDetails(false)} className="rounded-lg p-2 hover:bg-secondary"><X className="size-4" /></button></div><div className="mt-8 flex flex-col gap-3">{[['Skin', current.skin], ['Cap', current.cap], ['Clothing', current.clothing], ['Accessory', current.accessory], ['Expression', current.expression]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-border pb-3 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>)}</div><button onClick={generateVariant} className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-plum px-4 py-3 text-sm font-medium text-card"><Dice5 className="size-4" /> Roll another</button></div></div></div>}
    </main>
  )
}
