'use client'

import { useEffect, useState } from 'react'

export function ShadeBackground() {
  const [pointer, setPointer] = useState({ x: 50, y: 18 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 })
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <div className="shade-background" aria-hidden="true">
      <div className="shade-spotlight" style={{ '--spot-x': `${pointer.x}%`, '--spot-y': `${pointer.y}%` } as React.CSSProperties} />
      <div className="shade-bands" />
      <div className="shade-noise" />
      <div className="shade-grid" />
    </div>
  )
}
