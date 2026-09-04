'use client'

import { useMemo, useState } from 'react'
import { Download, ExternalLink, Folder, Package, Search, Sparkles } from 'lucide-react'

type Asset = { name: string; file: string; category: string; note: string }

const makeAssets = (category: string, names: string[], note: string, filePrefix: string) => names.map((name, index) => ({ name, file: `/architectswifhat-components/${category.toLowerCase()}/${filePrefix}_${String(index + 1).padStart(2, '0')}_${name.toLowerCase().replaceAll(' ', '_')}.png`, category, note }))

const folders: Asset[] = [
  ...makeAssets('Bodies', ['Standing', 'Crossed', 'Hip', 'Wave', 'Pocket', 'Point', 'Lean', 'Hands hips', 'Step', 'Arms back'], 'Interchangeable posture and body base', 'body'),
  ...makeAssets('Clothing', ['Blue Arc tee', 'Plum Arc tee', 'Gray Arc tee', 'Raglan Arc shirt', 'Arc hoodie', 'Arc utility jacket', 'Arc tank', 'Arc polo', 'Arc long sleeve', 'Arc workwear'], 'Original Arc logo preserved on garment', 'clothing'),
  ...makeAssets('Expressions', ['Wide grin', 'Serious', 'Surprised', 'Smile', 'Wink', 'Confident', 'Laughing', 'Curious', 'Calm', 'Determined'], 'Face layer for interchangeable characters', 'expression'),
  ...makeAssets('Accessories', ['Arc pendant', 'Arc sunglasses', 'Arc tattoo', 'Arc earrings', 'Arc chain', 'Arc watch', 'Arc headphones', 'Arc bag', 'Arc ring', 'Arc scarf'], 'Original Arc logo preserved where present', 'accessory'),
  ...makeAssets('Caps', ['Burgundy Arc cap', 'Navy Arc cap', 'Pink Arc cap', 'Black Arc cap', 'Olive Arc cap', 'Cream Arc cap', 'Cobalt Arc cap', 'Brown Arc cap', 'Lavender Arc cap', 'Charcoal Arc cap'], 'Original Arc logo preserved on cap', 'cap'),
  ...makeAssets('Backgrounds', ['Sunset beach', 'Sunset city', 'Architect studio', 'Rooftop', 'Blue hour', 'Design gallery', 'Palm avenue', 'Construction site', 'Night city', 'Ocean boardwalk'], 'Full-frame environmental background plate', 'background'),
]

const categories = ['All', 'Bodies', 'Clothing', 'Expressions', 'Accessories', 'Caps', 'Backgrounds']

export default function Page() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => folders.filter((asset) => (category === 'All' || asset.category === category) && asset.name.toLowerCase().includes(query.toLowerCase())), [category, query])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <header className="flex flex-col gap-7 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div><div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-plum font-serif text-2xl font-bold text-card">A</div><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">2026 component library</p><h1 className="font-serif text-2xl">Architects<span className="text-plum">Wif</span>Hat</h1></div></div><p className="mt-7 max-w-2xl font-serif text-4xl leading-[0.98] tracking-tight sm:text-6xl">Ten of everything.<br /><span className="text-muted-foreground">Built from your characters.</span></p><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">60 interchangeable transparent layers based on your uploaded ArchitectsWifHat samples. Combine them in an external NFT generator without changing the original Arc logo.</p></div>
          <div className="flex flex-wrap gap-2"><a href="/architectswifhat-components/manifest.json" download className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-xs font-medium transition-colors hover:bg-secondary"><Download className="size-4" /> Manifest</a><a href="/ArchitectsWifHat-components.zip" download className="flex items-center gap-2 rounded-xl bg-plum px-4 py-3 text-xs font-medium text-card transition-transform hover:-translate-y-0.5"><Package className="size-4" /> Download 60 assets</a></div>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-border bg-card p-4"><Folder className="size-4 text-gold" /><p className="mt-5 font-serif text-2xl">6</p><p className="text-xs text-muted-foreground">separate folders</p></div><div className="rounded-2xl border border-border bg-card p-4"><Sparkles className="size-4 text-plum" /><p className="mt-5 font-serif text-2xl">60</p><p className="text-xs text-muted-foreground">interchangeable PNG assets</p></div><div className="rounded-2xl border border-border bg-card p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-blue">Logo rule</p><p className="mt-5 text-sm font-medium">Original Arc logo stays unchanged on clothing, caps, and branded accessories.</p></div></section>

        <section className="mt-12"><div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-plum">Layer library</p><h2 className="mt-1 font-serif text-3xl">Choose your components</h2><p className="mt-2 text-sm text-muted-foreground">Every category contains exactly 10 assets.</p></div><label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground"><Search className="size-4" /><span className="sr-only">Search components</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search parts" className="w-36 bg-transparent outline-none placeholder:text-muted-foreground/70" /></label></div><div className="mt-5 flex gap-2 overflow-x-auto pb-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${category === item ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:text-foreground'}`}>{item}</button>)}</div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((asset) => <article key={asset.file} className="group overflow-hidden rounded-2xl border border-border bg-card"><div className={`relative flex aspect-square items-center justify-center overflow-hidden ${asset.category === 'Backgrounds' ? 'bg-secondary' : 'bg-bone'}`}><img src={asset.file} alt={asset.name} className={`size-full ${asset.category === 'Backgrounds' ? 'object-cover' : 'object-contain p-6'} transition-transform duration-500 group-hover:scale-105`} /><span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur">{asset.category}</span></div><div className="flex items-start justify-between gap-3 p-4"><div><h3 className="text-sm font-medium">{asset.name}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{asset.note}</p></div><a href={asset.file} download aria-label={`Download ${asset.name}`} className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><Download className="size-3.5" /></a></div></article>)}</div></section>

        <footer className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>Generator-ready library · 10 assets per category · Original logo protected</p><a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7A440244-7C83-467F-B068-AD84D1AB23AC-rozncCPp8UKvmHpBD1hW3oDSfX7qcF.jpeg" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-plum">View supplied finish reference <ExternalLink className="size-3" /></a></footer>
      </div>
    </main>
  )
}
