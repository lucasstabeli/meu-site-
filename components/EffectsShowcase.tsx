'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ── 1. Partículas flutuantes ──────────────────────────────────────────────────
function ParticlesCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(168,139,250,${p.alpha})`
        ctx!.fill()
      }
      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(168,139,250,${0.15 * (1 - dist / 70)})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative w-full h-full bg-[#0a0010] rounded-xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-purple-400/60 font-mono">
        partículas conectadas
      </div>
    </div>
  )
}

// ── 2. Aurora / gradiente vivo ────────────────────────────────────────────────
function AuroraCard() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ background: '#020010' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.45) 0%, transparent 65%)',
        animation: 'aurora-a 5s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 55% at 80% 45%, rgba(236,72,153,0.35) 0%, transparent 65%)',
        animation: 'aurora-b 7s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(34,211,238,0.3) 0%, transparent 65%)',
        animation: 'aurora-c 6s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-sm font-semibold tracking-wide opacity-80">Aurora</span>
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-cyan-400/60 font-mono">
        gradiente animado
      </div>
    </div>
  )
}

// ── 3. Glassmorphism ──────────────────────────────────────────────────────────
function GlassCard() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center"
         style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0f1a3a 50%, #001a2a 100%)' }}>
      {/* decorative blobs */}
      <div className="absolute w-24 h-24 rounded-full" style={{ background: '#7c3aed', filter: 'blur(28px)', top: '15%', left: '15%', opacity: 0.6 }} />
      <div className="absolute w-20 h-20 rounded-full" style={{ background: '#0ea5e9', filter: 'blur(24px)', bottom: '15%', right: '15%', opacity: 0.5 }} />
      {/* glass panel */}
      <div className="relative z-10 px-6 py-4 rounded-2xl text-center"
           style={{
             background: 'rgba(255,255,255,0.08)',
             backdropFilter: 'blur(14px)',
             border: '1px solid rgba(255,255,255,0.14)',
             boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
           }}>
        <div className="text-white text-sm font-semibold mb-1">Efeito Glass</div>
        <div className="text-white/50 text-[10px]">blur · transparência · profundidade</div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-blue-300/50 font-mono">
        glassmorphism
      </div>
    </div>
  )
}

// ── 4. Tilt 3D ────────────────────────────────────────────────────────────────
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setStyle({ rotateX: -y * 22, rotateY: x * 22 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ rotateX: 0, rotateY: 0 })}
      className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer select-none"
      style={{ background: '#0a0a0a', perspective: 600 }}
    >
      <div
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)`,
          transition: style.rotateX === 0 ? 'transform 0.5s ease' : 'transform 0.08s ease',
          transformStyle: 'preserve-3d',
          padding: '20px 28px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>✦</div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Tilt 3D</div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 4 }}>mova o mouse</div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-white/30 font-mono">
        perspectiva 3D
      </div>
    </div>
  )
}

// ── 5. Texto revelado ─────────────────────────────────────────────────────────
const WORDS = ['Inovação', 'Design', 'Impacto', 'Resultado', 'Futuro']

function TextRevealCard() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-full h-full rounded-xl flex flex-col items-center justify-center"
         style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)' }}>
      <div style={{ fontSize: 11, color: '#555', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
        sua mensagem
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: -0.5,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          minHeight: 36,
        }}
      >
        {WORDS[idx]}
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-white/30 font-mono">
        texto animado
      </div>
    </div>
  )
}

// ── 6. Cursor magnético ───────────────────────────────────────────────────────
function MagneticCard() {
  const dotRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [inside, setInside] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 })
    setInside(true)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { setInside(false); setPos({ x: 0, y: 0 }) }}
      className="w-full h-full rounded-xl flex items-center justify-center cursor-none overflow-hidden select-none"
      style={{ background: '#050505' }}
    >
      {/* grid dots */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      {/* magnetic dot */}
      <div
        ref={dotRef}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          transform: inside ? `translate(${pos.x * 0.35}px, ${pos.y * 0.35}px) scale(1.2)` : 'translate(0,0) scale(1)',
          transition: inside ? 'transform 0.15s ease' : 'transform 0.5s ease',
          boxShadow: '0 0 20px rgba(99,102,241,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-indigo-400/50 font-mono">
        cursor magnético
      </div>
    </div>
  )
}

// ── 7. Morphing blob ──────────────────────────────────────────────────────────
function BlobCard() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center"
         style={{ background: '#02080f' }}>
      <div style={{
        width: 100, height: 100,
        background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
        animation: 'blob-morph 6s ease-in-out infinite',
        filter: 'blur(1px)',
      }} />
      <div style={{
        position: 'absolute',
        width: 70, height: 70,
        background: 'linear-gradient(135deg, #ec4899, #f97316)',
        animation: 'blob-morph 4s ease-in-out infinite reverse',
        opacity: 0.6,
        filter: 'blur(1px)',
      }} />
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-cyan-400/50 font-mono">
        morphing blob
      </div>
    </div>
  )
}

// ── 8. Scroll reveal ──────────────────────────────────────────────────────────
function ScrollRevealCard() {
  const items = ['Hero section', 'Sobre nós', 'Serviços', 'Contato']
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(c => {
        if (c >= items.length) {
          setTimeout(() => setVisibleCount(0), 600)
          return c
        }
        return c + 1
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full rounded-xl flex flex-col justify-center px-5 gap-2.5 overflow-hidden"
         style={{ background: '#f8f8f8' }}>
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: '#1a1a1a',
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            opacity: visibleCount > i ? 1 : 0,
            transform: visibleCount > i ? 'translateX(0)' : 'translateX(-16px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {item}
        </div>
      ))}
      <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-neutral-400 font-mono">
        scroll reveal
      </div>
    </div>
  )
}

// ── card wrapper ──────────────────────────────────────────────────────────────
const EFFECTS = [
  { label: 'Partículas',       desc: 'campo de partículas interativo',   Component: ParticlesCard },
  { label: 'Aurora',           desc: 'gradiente vivo e fluido',          Component: AuroraCard    },
  { label: 'Glassmorphism',    desc: 'efeito de vidro fosco',            Component: GlassCard     },
  { label: 'Tilt 3D',         desc: 'perspectiva 3D com o mouse',       Component: TiltCard      },
  { label: 'Texto Animado',    desc: 'palavras com transição suave',     Component: TextRevealCard },
  { label: 'Cursor Magnético', desc: 'elementos que seguem o cursor',    Component: MagneticCard  },
  { label: 'Morphing Blob',    desc: 'formas orgânicas em movimento',    Component: BlobCard      },
  { label: 'Scroll Reveal',    desc: 'elementos surgindo ao rolar',      Component: ScrollRevealCard },
]

export default function EffectsShowcase() {
  return (
    <section className="py-[120px] px-6 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">
            Possibilidades
          </p>
          <h2 className="text-[clamp(34px,4.2vw,54px)] font-bold tracking-[-2px] leading-[1.05] text-white mb-5">
            Seu site com<br/>personalidade própria.
          </h2>
          <p className="text-base font-light text-neutral-400 max-w-[480px] mx-auto leading-[1.7]">
            Efeitos visuais que fazem o visitante parar, olhar e lembrar. Escolha o que combina com você — criamos qualquer um desses e muito mais.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EFFECTS.map(({ label, desc, Component }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col gap-0"
            >
              {/* effect demo */}
              <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
                <Component />
              </div>
              {/* label */}
              <div className="pt-2.5 pb-1 px-1">
                <p className="text-white text-[13px] font-semibold">{label}</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-neutral-500 text-sm mb-5">
            Quer um efeito que não está aqui? Pode pedir — construímos o que você imaginar.
          </p>
          <a
            href="#contact"
            className="inline-block text-sm font-semibold text-black bg-white px-8 py-3.5 rounded-full
                       hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.04] no-underline"
          >
            Fala comigo
          </a>
        </div>
      </div>
    </section>
  )
}
