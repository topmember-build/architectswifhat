import Image from 'next/image'

export function ArcMark({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden rounded-xl ring-1 ring-arc/30 ${className ?? ''}`}>
      <Image src="/architectswifhat-components/brand/architectswifhat-logo.png" alt="ArchitectsWifHat logo" fill sizes="48px" className="object-cover" priority />
      <span className="sr-only">ArchitectsWifHat</span>
    </span>
  )
}
