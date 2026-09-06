'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls, Points, PointMaterial, Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Points as ThreePoints } from 'three'
import * as THREE from 'three'

type Country = { name: string; lat: number; lon: number }

const COUNTRIES: Country[] = [
  { name: 'Nigeria', lat: 9.1, lon: 8.7 },
  { name: 'India', lat: 20.6, lon: 78.9 },
  { name: 'Singapore', lat: 1.35, lon: 103.8 },
  { name: 'Brazil', lat: -10.8, lon: -52.9 },
  { name: 'France', lat: 46.2, lon: 2.2 },
  { name: 'Argentina', lat: -38.4, lon: -63.6 },
  { name: 'Turkey', lat: 38.9, lon: 35.2 },
  { name: 'Bangladesh', lat: 23.7, lon: 90.4 },
  { name: 'Vietnam', lat: 14.1, lon: 108.3 },
  { name: 'Portugal', lat: 39.4, lon: -8.2 },
]

function latLonToVector(lat: number, lon: number, radius = 1.345) {
  const latitude = THREE.MathUtils.degToRad(lat)
  const longitude = THREE.MathUtils.degToRad(lon)
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.cos(longitude),
    radius * Math.sin(latitude),
    -radius * Math.cos(latitude) * Math.sin(longitude),
  )
}

function ElectricNetwork({ reducedMotion }: { reducedMotion: boolean }) {
  const pulses = useRef<Array<THREE.Mesh | null>>([])
  const countryVectors = useMemo(() => COUNTRIES.map(({ lat, lon }) => latLonToVector(lat, lon)), [])
  const arcs = useMemo(() => countryVectors.map((start, index) => {
    const end = countryVectors[(index + 1) % countryVectors.length]
    const points = []
    for (let step = 0; step <= 24; step += 1) {
      const progress = step / 24
      const point = start.clone().lerp(end, progress).normalize()
      point.multiplyScalar(1.345 + Math.sin(Math.PI * progress) * 0.16)
      points.push(point)
    }
    return points
  }), [countryVectors])

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const time = clock.elapsedTime * 0.8
    pulses.current.forEach((pulse, index) => {
      if (!pulse) return
      const trail = index * 0.18
      const t = (time - trail) % 1
      const safeT = t < 0 ? t + 1 : t
      const arcIndex = Math.floor(safeT * arcs.length)
      const progress = (safeT * arcs.length) % 1
      const arc = arcs[arcIndex]
      const point = arc[Math.min(Math.floor(progress * arc.length), arc.length - 1)]
      pulse.position.copy(point)
      pulse.scale.setScalar(0.68 + Math.sin(clock.elapsedTime * 18 + index) * 0.16)
    })
  })

  return (
    <group>
      {arcs.map((points, index) => (
        <Line key={index} points={points} color={index % 2 ? '#8c3046' : '#b8d7ff'} transparent opacity={reducedMotion ? 0.35 : 0.7} lineWidth={1.4} />
      ))}
      {countryVectors.map((position, index) => {
        const labelPosition = position.clone().normalize().multiplyScalar(1.46)
        return (
          <group key={COUNTRIES[index].name}>
            <mesh position={position}>
              <sphereGeometry args={[0.032, 10, 10]} />
              <meshBasicMaterial color={index % 2 ? '#8c3046' : '#d9e9ff'} toneMapped={false} />
            </mesh>
            <Text
              position={labelPosition}
              fontSize={0.048}
              color="#b8d7ff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.006}
              outlineColor="#172541"
              depthOffset={-2}
              renderOrder={3}
            >
              {COUNTRIES[index].name.toUpperCase()}
            </Text>
          </group>
        )
      })}
      {Array.from({ length: 4 }, (_, index) => (
        <mesh key={index} position={arcs[index]?.[0] ?? countryVectors[0]} ref={(node) => { pulses.current[index] = node }}>
          <sphereGeometry args={[0.042, 10, 10]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

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
      <ElectricNetwork reducedMotion={reducedMotion} />
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
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(mediaQuery.matches)
    updateMotion()
    mediaQuery.addEventListener('change', updateMotion)

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setWebglAvailable(Boolean(context))

    return () => mediaQuery.removeEventListener('change', updateMotion)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {webglAvailable === true ? (
        <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]} frameloop={reducedMotion ? 'demand' : 'always'} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.5} />
          <SphereField reducedMotion={reducedMotion} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.2} />
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(127,222,255,0.24),transparent_24%),radial-gradient(circle_at_50%_48%,transparent_0_31%,rgba(127,222,255,0.16)_31.5%_32%,transparent_32.5%),radial-gradient(circle_at_50%_48%,transparent_0_42%,rgba(247,186,82,0.14)_42.5%_43%,transparent_43.5%)]" />
      )}
    </div>
  )
}
