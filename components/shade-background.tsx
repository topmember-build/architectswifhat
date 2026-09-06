'use client'

import { useEffect, useRef } from 'react'

const vertexShader = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

const fragmentShader = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    vec2 pointer = (u_pointer - 0.5) * aspect;
    float t = u_time * 0.055;

    float field = noise(p * 2.3 + vec2(t * 0.7, -t * 0.45));
    field += 0.5 * noise(p * 5.0 - vec2(t * 0.35, t * 0.2));
    float shade = smoothstep(0.14, 0.9, field);
    float light = exp(-length(p - pointer * 0.35) * 1.45);
    float halo = exp(-length(p - vec2(0.36, 0.12)) * 2.0);

    float warpedY = uv.y + sin(uv.x * 9.0 + t * 1.4) * 0.035 + sin(uv.x * 22.0 - t) * 0.012;
    float scan = smoothstep(0.18, 0.82, 0.5 + 0.5 * sin(warpedY * u_resolution.y * 0.075));
    float ribbons = smoothstep(0.22, 0.9, 0.5 + 0.5 * sin(warpedY * 17.0 - sin(uv.x * 8.0 + t) * 1.8));
    vec2 dotGrid = fract((uv + vec2(t * 0.004, 0.0)) * vec2(92.0, 46.0)) - 0.5;
    float halftone = 1.0 - smoothstep(0.08, 0.34, length(dotGrid * vec2(1.0, 1.7)));
    float grain = hash(gl_FragCoord.xy + u_time) * 0.08;
    float vignette = smoothstep(1.2, 0.12, length(p * vec2(0.78, 0.92)));

    vec3 navy = vec3(0.004, 0.018, 0.085);
    vec3 electric = vec3(0.015, 0.25, 0.92);
    vec3 blue = vec3(0.08, 0.58, 1.0);
    vec3 mint = vec3(0.16, 0.47, 0.43);
    vec3 color = mix(navy, electric, shade * 0.82);
    color += blue * (light * 0.46 + halo * 0.28);
    color += mint * ribbons * (0.18 + scan * 0.24);
    color += blue * halftone * scan * 0.22;
    color += vec3(grain);
    color *= 0.66 + vignette * 0.62;

    gl_FragColor = vec4(color, 1.0);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

export function ShadeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false })
    if (!canvas || !gl) return

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vertex || !fragment) return
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    gl.useProgram(program)
    gl.clearColor(0, 0, 0, 0)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const resolution = gl.getUniformLocation(program, 'u_resolution')
    const pointer = gl.getUniformLocation(program, 'u_pointer')
    const time = gl.getUniformLocation(program, 'u_time')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let start = performance.now()
    let targetPointer = { x: 0.5, y: 0.35 }
    let currentPointer = { ...targetPointer }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const move = (event: PointerEvent) => {
      targetPointer = { x: event.clientX / window.innerWidth, y: 1 - event.clientY / window.innerHeight }
    }
    const render = (now: number) => {
      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.035
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.035
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform2f(pointer, currentPointer.x, currentPointer.y)
      gl.uniform1f(time, reducedMotion ? 0 : (now - start) / 16.67)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!reducedMotion) frame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    render(performance.now())
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className="shade-background" aria-hidden="true" />
}
