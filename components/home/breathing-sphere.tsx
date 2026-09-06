'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Points as ThreePoints } from 'three'
import * as THREE from 'three'

function SphereField({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null)
  const points = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const values = new Float32Array(720 * 3)
    for (let i = 0; i < 720; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / 720)
      const theta = Math.sqrt(720 * Math.PI) * phi
      const radius = 1.32 + Math.sin(phi * 9) * 0.018
      values[i * 3] = radius * Math.cos(theta) * Math.sin(phi)
      values[i * 3 + 1] = radius * Math.cos(phi)
      values[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)
    }
    return values
  }, [])

  useFrame((state, delta) => {
    if (!group.current || !points.current) return
    const breathe = reducedMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.045
    group.current.scale.setScalar(breathe)
    if (reducedMotion) return
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
    points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.32, 3]} />
        <meshBasicMaterial color="#b8d7ff" wireframe transparent opacity={0.16} />
      </mesh>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#d9e9ff" size={0.018} sizeAttenuation depthWrite={false} />
      </Points>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.56, 0.008, 8, 96]} />
        <meshBasicMaterial color="#b8d7ff" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0.45, 0.7, 0.2]}>
        <torusGeometry args={[1.76, 0.006, 8, 96]} />
        <meshBasicMaterial color="#8c3046" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

export function BreathingSphere() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]} frameloop={reducedMotion ? 'demand' : 'always'} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <SphereField reducedMotion={reducedMotion} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.2} />
      </Canvas>
    </div>
  )
}
