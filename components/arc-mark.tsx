export function ArcMark({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-arc/25 to-background ring-1 ring-arc/30 ${className ?? ''}`}>
      <svg viewBox="0 0 48 48" className="size-[70%] text-arc" fill="none" aria-hidden="true">
        <path d="M24 8C15 8 9 16 9 26v14M24 8c9 0 15 8 15 18v14M24 8v14" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      <span className="sr-only">ArchitectsWifHat</span>
    </span>
  )
}
