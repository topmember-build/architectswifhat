'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.revealed = 'true'
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`motion-reveal ${className ?? ''}`} style={{ '--motion-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}
