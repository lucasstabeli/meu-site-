'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXAMPLES = [
  {
    id: 'restaurant',
    tab: 'Restaurante',
    filename: 'bella-vita.html',
    url: 'bella-vita.stabeli.com.br',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Bella Vita</title>
  <style>
    body {
      margin: 0;
      background: #0f0800;
      font-family: Georgia, serif;
    }
    nav {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      border-bottom: 1px solid #2a1800;
    }
    .logo {
      color: #d4a853;
      letter-spacing: 4px;
      font-size: 16px;
    }
    .hero {
      text-align: center;
      padding: 80px 40px;
    }
    h1 {
      color: #ffffff;
      font-size: 42px;
      margin-bottom: 12px;
    }
    .sub {
      color: #8a7060;
      margin-bottom: 28px;
    }
    .btn {
      background: #d4a853;
      color: #0f0800;
      padding: 14px 32px;
      border: none;
      letter-spacing: 2px;
      cursor: pointer;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <nav>
    <span class="logo">BELLA VITA</span>
    <span style="color:#8a7060">
      Menu · Reservas · Sobre
    </span>
  </nav>
  <section class="hero">
    <h1>Fine Italian Cuisine</h1>
    <p class="sub">
      Sabores autênticos do coração de Roma
    </p>
    <button class="btn">RESERVAR MESA</button>
  </section>
</body>
</html>`,
  },
  {
    id: 'clinic',
    tab: 'Clínica',
    filename: 'sorrir-dental.html',
    url: 'sorrir-dental.stabeli.com.br',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Sorrir Dental</title>
  <style>
    body {
      margin: 0;
      background: #f0f6ff;
      font-family: -apple-system, sans-serif;
    }
    nav {
      background: white;
      display: flex;
      justify-content: space-between;
      padding: 18px 40px;
      box-shadow: 0 1px 12px rgba(0,0,0,0.07);
    }
    .logo {
      color: #1a6bff;
      font-weight: 700;
      font-size: 15px;
    }
    .hero {
      text-align: center;
      padding: 60px 40px 24px;
    }
    h1 {
      color: #0a1a3a;
      font-size: 34px;
      margin-bottom: 10px;
    }
    .sub { color: #5a7090; margin-bottom: 24px; }
    .btn {
      background: #1a6bff;
      color: white;
      padding: 13px 30px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
    }
    .cards {
      display: flex;
      gap: 14px;
      padding: 28px 40px;
    }
    .card {
      flex: 1;
      background: white;
      padding: 18px 14px;
      border-radius: 14px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.06);
      text-align: center;
    }
    .icon { font-size: 26px; margin-bottom: 6px; }
    .card p { margin: 0; font-size: 13px;
               color: #0a1a3a; font-weight: 600; }
  </style>
</head>
<body>
  <nav>
    <span class="logo">Sorrir Dental</span>
    <span style="color:#5a7090;font-size:13px">
      Agendar · Serviços
    </span>
  </nav>
  <section class="hero">
    <h1>Seu sorriso perfeito começa aqui</h1>
    <p class="sub">Clínica especializada em estética dental</p>
    <button class="btn">Agendar consulta</button>
  </section>
  <div class="cards">
    <div class="card">
      <div class="icon">🦷</div>
      <p>Clareamento</p>
    </div>
    <div class="card">
      <div class="icon">😁</div>
      <p>Ortodontia</p>
    </div>
    <div class="card">
      <div class="icon">✨</div>
      <p>Lentes</p>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'fitness',
    tab: 'Academia',
    filename: 'apex-fitness.html',
    url: 'apex-fitness.stabeli.com.br',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>APEX Fitness</title>
  <style>
    body {
      margin: 0;
      background: #080808;
      font-family: -apple-system, sans-serif;
      color: white;
    }
    nav {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      align-items: center;
    }
    .logo {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 3px;
      color: #e8ff00;
    }
    .hero { padding: 50px 40px 20px; }
    .tag {
      display: inline-block;
      background: #e8ff00;
      color: #080808;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      padding: 4px 12px;
      margin-bottom: 18px;
    }
    h1 {
      font-size: 50px;
      font-weight: 900;
      text-transform: uppercase;
      line-height: 1;
      margin: 0 0 14px;
    }
    .sub {
      color: #555555;
      margin: 0 0 22px;
      font-size: 14px;
    }
    .btn {
      background: #e8ff00;
      color: #080808;
      padding: 13px 30px;
      border: none;
      font-weight: 700;
      letter-spacing: 1.5px;
      cursor: pointer;
      font-size: 13px;
    }
    .stats {
      display: flex;
      gap: 36px;
      padding: 24px 40px;
      border-top: 1px solid #1a1a1a;
      margin-top: 20px;
    }
    .stat h3 {
      color: #e8ff00;
      font-size: 26px;
      margin: 0;
      font-weight: 900;
    }
    .stat p {
      color: #555;
      font-size: 11px;
      margin: 3px 0 0;
    }
  </style>
</head>
<body>
  <nav>
    <span class="logo">APEX</span>
    <span style="color:#555;font-size:12px">
      Treinos · Planos · Contato
    </span>
  </nav>
  <section class="hero">
    <div class="tag">TRANSFORME SEU CORPO</div>
    <h1>Seu limite<br/>é mental</h1>
    <p class="sub">Treinos personalizados pra você evoluir</p>
    <button class="btn">COMEÇAR AGORA</button>
  </section>
  <div class="stats">
    <div class="stat"><h3>500+</h3><p>Alunos</p></div>
    <div class="stat"><h3>12</h3><p>Professores</p></div>
    <div class="stat"><h3>5★</h3><p>Avaliação</p></div>
  </div>
</body>
</html>`,
  },
]

// ── syntax highlight (per-line, simple) ──────────────────────────────────────
function highlightLine(line: string, lineIdx: number) {
  const t = line.trim()
  // Comments
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) {
    return <div key={lineIdx} style={{ minHeight: '1.5em', color: '#6a737d' }}>{line}</div>
  }
  // HTML tags
  if (t.startsWith('<') || t === '') {
    return <div key={lineIdx} style={{ minHeight: '1.5em', color: '#e06c75' }}>{line || ' '}</div>
  }
  // CSS selectors / blocks
  if (t.endsWith('{') || t === '}') {
    return <div key={lineIdx} style={{ minHeight: '1.5em', color: '#61afef' }}>{line}</div>
  }
  // CSS property: value
  const colon = line.indexOf(':')
  if (colon !== -1 && !t.startsWith('<') && !t.includes('//')) {
    const prop = line.slice(0, colon + 1)
    const val = line.slice(colon + 1)
    return (
      <div key={lineIdx} style={{ minHeight: '1.5em' }}>
        <span style={{ color: '#61afef' }}>{prop}</span>
        <span style={{ color: '#d19a66' }}>{val}</span>
      </div>
    )
  }
  return <div key={lineIdx} style={{ minHeight: '1.5em', color: '#abb2bf' }}>{line}</div>
}

// ── preview components ────────────────────────────────────────────────────────
function RestaurantPreview({ p }: { p: number }) {
  return (
    <div style={{ background: '#0f0800', height: '100%', fontFamily: 'Georgia,serif', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #2a1800',
                    opacity: p > 0.05 ? 1 : 0, transform: `translateY(${p > 0.05 ? 0 : -10}px)`, transition: 'all 0.5s' }}>
        <span style={{ color: '#d4a853', letterSpacing: 3, fontSize: 12 }}>BELLA VITA</span>
        <span style={{ color: '#8a7060', fontSize: 11 }}>Menu · Reservas · Sobre</span>
      </div>
      <div style={{ textAlign: 'center', padding: '36px 20px 16px',
                    opacity: p > 0.35 ? 1 : 0, transform: `translateY(${p > 0.35 ? 0 : 16}px)`, transition: 'all 0.6s 0.1s' }}>
        <h1 style={{ color: '#fff', fontSize: 24, margin: '0 0 8px', fontFamily: 'Georgia,serif', fontWeight: 'normal' }}>Fine Italian Cuisine</h1>
        <p style={{ color: '#8a7060', fontSize: 12, margin: 0 }}>Sabores autênticos do coração de Roma</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: 20,
                    opacity: p > 0.7 ? 1 : 0, transform: `translateY(${p > 0.7 ? 0 : 12}px)`, transition: 'all 0.5s 0.1s' }}>
        <button style={{ background: '#d4a853', color: '#0f0800', padding: '10px 22px', border: 'none', letterSpacing: 2, fontSize: 10, cursor: 'default' }}>
          RESERVAR MESA
        </button>
      </div>
    </div>
  )
}

function ClinicPreview({ p }: { p: number }) {
  return (
    <div style={{ background: '#f0f6ff', height: '100%', fontFamily: '-apple-system,sans-serif', overflow: 'hidden' }}>
      <div style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', padding: '12px 20px',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                    opacity: p > 0.05 ? 1 : 0, transform: `translateY(${p > 0.05 ? 0 : -10}px)`, transition: 'all 0.5s' }}>
        <span style={{ color: '#1a6bff', fontWeight: 700, fontSize: 13 }}>Sorrir Dental</span>
        <span style={{ color: '#5a7090', fontSize: 11 }}>Agendar · Serviços</span>
      </div>
      <div style={{ textAlign: 'center', padding: '28px 20px 14px',
                    opacity: p > 0.35 ? 1 : 0, transform: `translateY(${p > 0.35 ? 0 : 16}px)`, transition: 'all 0.6s 0.1s' }}>
        <h1 style={{ color: '#0a1a3a', fontSize: 18, margin: '0 0 8px', fontFamily: 'inherit', fontWeight: 700 }}>Seu sorriso perfeito começa aqui</h1>
        <p style={{ color: '#5a7090', fontSize: 12, margin: '0 0 14px' }}>Clínica especializada em estética dental</p>
        {p > 0.55 && (
          <button style={{ background: '#1a6bff', color: '#fff', padding: '9px 20px', border: 'none', borderRadius: 50, fontSize: 12, cursor: 'default',
                           animation: 'fadeIn 0.4s ease' }}>
            Agendar consulta
          </button>
        )}
      </div>
      {p > 0.75 && (
        <div style={{ display: 'flex', gap: 8, padding: '0 16px', animation: 'fadeIn 0.4s ease' }}>
          {[['🦷','Clareamento'],['😁','Ortodontia'],['✨','Lentes']].map(([e,n]) => (
            <div key={n} style={{ flex: 1, background: '#fff', padding: '12px 8px', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{e}</div>
              <div style={{ fontSize: 10, color: '#0a1a3a', fontWeight: 600 }}>{n}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FitnessPreview({ p }: { p: number }) {
  return (
    <div style={{ background: '#080808', height: '100%', fontFamily: '-apple-system,sans-serif', color: '#fff', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', alignItems: 'center',
                    opacity: p > 0.05 ? 1 : 0, transform: `translateY(${p > 0.05 ? 0 : -10}px)`, transition: 'all 0.5s' }}>
        <span style={{ color: '#e8ff00', fontWeight: 900, letterSpacing: 3, fontSize: 14 }}>APEX</span>
        <span style={{ color: '#555', fontSize: 10 }}>Treinos · Planos · Contato</span>
      </div>
      <div style={{ padding: '20px 20px 12px',
                    opacity: p > 0.35 ? 1 : 0, transform: `translateY(${p > 0.35 ? 0 : 16}px)`, transition: 'all 0.6s 0.1s' }}>
        <div style={{ display: 'inline-block', background: '#e8ff00', color: '#080808', fontSize: 9, fontWeight: 700, padding: '3px 10px', marginBottom: 12, letterSpacing: 1.5 }}>
          TRANSFORME SEU CORPO
        </div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 8px', fontFamily: 'inherit' }}>
          Seu limite<br/>é mental
        </h1>
        <p style={{ color: '#555', fontSize: 11, margin: '0 0 14px' }}>Treinos personalizados pra você evoluir</p>
        {p > 0.6 && (
          <button style={{ background: '#e8ff00', color: '#080808', padding: '9px 20px', border: 'none', fontWeight: 700, fontSize: 10, cursor: 'default', letterSpacing: 1.5, animation: 'fadeIn 0.4s ease' }}>
            COMEÇAR AGORA
          </button>
        )}
      </div>
      {p > 0.8 && (
        <div style={{ display: 'flex', gap: 24, padding: '14px 20px', borderTop: '1px solid #1a1a1a', marginTop: 8, animation: 'fadeIn 0.4s ease' }}>
          {[['500+','Alunos'],['12','Professores'],['5★','Avaliação']].map(([n,l]) => (
            <div key={l}>
              <div style={{ color: '#e8ff00', fontSize: 18, fontWeight: 900 }}>{n}</div>
              <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const PREVIEWS = [RestaurantPreview, ClinicPreview, FitnessPreview]

// ── constants ─────────────────────────────────────────────────────────────────
const CHAR_SPEED_MS = 4
const ERASE_STEP    = 20
const ERASE_SPEED_MS = 2
const PAUSE_MS      = 1600

export default function LiveDemo() {
  const [exIdx,    setExIdx]    = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase,    setPhase]    = useState<'typing' | 'pausing' | 'erasing'>('typing')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const code      = EXAMPLES[exIdx].code
  const total     = code.length
  const progress  = total > 0 ? charCount / total : 0
  const displayed = code.slice(0, charCount)
  const Preview   = PREVIEWS[exIdx]

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)

    if (phase === 'typing') {
      if (charCount < total) {
        timer.current = setTimeout(() => setCharCount(c => Math.min(c + 1, total)), CHAR_SPEED_MS)
      } else {
        timer.current = setTimeout(() => setPhase('pausing'), PAUSE_MS)
      }
    } else if (phase === 'pausing') {
      timer.current = setTimeout(() => setPhase('erasing'), 200)
    } else {
      if (charCount > 0) {
        timer.current = setTimeout(() => setCharCount(c => Math.max(c - ERASE_STEP, 0)), ERASE_SPEED_MS)
      } else {
        setExIdx(i => (i + 1) % EXAMPLES.length)
        setPhase('typing')
      }
    }

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [phase, charCount, total])

  function switchTo(i: number) {
    if (timer.current) clearTimeout(timer.current)
    setExIdx(i)
    setCharCount(0)
    setPhase('typing')
  }

  const lines = displayed.split('\n')

  return (
    <section className="py-[120px] px-6 bg-[#080808] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">
            Como criamos
          </p>
          <h2 className="text-[clamp(34px,4.2vw,54px)] font-bold tracking-[-2px] leading-[1.05] text-white mb-5">
            Seu site construído<br/>do zero.
          </h2>
          <p className="text-lg text-neutral-200 max-w-[460px] mx-auto leading-[1.7]">
            Cada elemento nasce na hora. Você acompanha, sugere e a gente ajusta até ficar exatamente do seu jeito.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => switchTo(i)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                ${i === exIdx
                  ? 'bg-white text-black'
                  : 'bg-white/8 text-neutral-400 hover:bg-white/14 hover:text-neutral-300'}`}
            >
              {ex.tab}
            </button>
          ))}
        </div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3" style={{ height: 'clamp(380px,48vw,520px)' }}>

          {/* LEFT — browser preview */}
          <div className="rounded-2xl overflow-hidden border border-white/8 flex flex-col min-h-0">
            {/* browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/6 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
              <div className="flex-1 bg-[#272727] rounded-md px-3 py-1 text-[10px] text-neutral-500 ml-2 text-center truncate">
                {EXAMPLES[exIdx].url}
              </div>
            </div>
            {/* preview */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={exIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Preview p={progress} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — code editor */}
          <div className="rounded-2xl overflow-hidden border border-white/8 flex flex-col min-h-0">
            {/* editor chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/6 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
              <span className="text-[10px] text-neutral-400 ml-2 font-mono">{EXAMPLES[exIdx].filename}</span>
              <span className="ml-auto text-[10px] text-[#61afef] font-mono">HTML</span>
            </div>
            {/* code */}
            <div className="flex-1 overflow-hidden bg-[#0d0f1a]">
              <div className="h-full overflow-auto p-3 text-[10.5px] leading-[1.6] font-mono">
                <div className="flex gap-3">
                  {/* line numbers */}
                  <div className="text-[#3a3a5a] select-none text-right shrink-0" style={{ minWidth: 20 }}>
                    {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  {/* highlighted code */}
                  <div className="flex-1 overflow-hidden">
                    {lines.map((line, i) => highlightLine(line, i))}
                    {/* blinking cursor */}
                    <span
                      className="inline-block align-middle"
                      style={{ width: 6, height: '1em', background: '#a6adc8', animation: 'livedemo-cursor 1s step-end infinite' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom note */}
        <p className="text-center text-sm text-neutral-300 mt-6">
          Tudo que você vê aqui pode ser personalizado — cores, fontes, layout, conteúdo.
        </p>
      </div>
    </section>
  )
}
