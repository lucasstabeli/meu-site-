"use client";

import { useEffect, useState } from "react";

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Agendamento animado ── */
const SCHED_STEPS = ["sched-s1", "sched-s2", "sched-s3", "sched-s4"] as const;
const SCHED_LABELS = ["Serviço", "Data", "Horário", "Confirmar"];

function PhoneScheduling() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % 4), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Phone shell */}
      <div className="relative w-[260px] bg-[#1a1a1a] rounded-[44px] p-3.5
                      shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_2px_0_rgba(255,255,255,0.18)_inset,0_40px_80px_rgba(0,0,0,0.28)]
                      transform perspective-[1200px] rotate-y-[-8deg] rotate-x-[4deg]
                      transition-transform duration-700">
        {/* notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#1a1a1a] rounded-[20px] z-10" />
        {/* screen */}
        <div className="bg-white rounded-[32px] overflow-hidden relative h-[480px]">
          {/* status bar */}
          <div className="flex items-center justify-between px-[18px] pt-2.5 pb-1.5 text-[10px] font-semibold text-[#1a1a1a]">
            <span className="font-bold">9:41</span>
            <div className="flex gap-1 items-center">
              <svg viewBox="0 0 24 24" fill="#1a1a1a" className="w-3 h-3"><rect x="2" y="7" width="20" height="11" rx="2"/></svg>
            </div>
          </div>

          {/* Step 1 */}
          <div className={`absolute inset-0 pt-11 px-[18px] pb-[18px] transition-all duration-500
                          ${current === 0 ? "opacity-100 translate-x-0" : current > 0 ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}`}>
            <div className="flex gap-1.5 mb-5">{[0,1,2,3].map(i=><span key={i} className={`h-0.5 flex-1 rounded-full ${i===0?"bg-black":"bg-[#e5e5e5]"}`}/>)}</div>
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8e8e93] mb-1.5">Passo 1 de 4</p>
            <p className="text-lg font-bold text-[#0a0a0a] leading-tight mb-4">Qual serviço<br/>você precisa?</p>
            <div className="space-y-2">
              {[{i:"✂️",n:"Corte + Estilo",s:"45 min",p:"R$ 80",a:true},{i:"💆",n:"Massagem",s:"60 min",p:"R$ 120",a:false},{i:"💅",n:"Manicure",s:"30 min",p:"R$ 45",a:false}].map(x=>(
                <div key={x.n} className={`flex items-center gap-3 p-3 rounded-2xl ${x.a?"bg-[#0a0a0a] text-white":"bg-[#f5f5f7]"}`}>
                  <span className="text-xl w-9 text-center">{x.i}</span>
                  <div className="flex-1"><p className="text-[13px] font-semibold">{x.n}</p><p className={`text-[11px] ${x.a?"text-white/55":"text-[#8e8e93]"}`}>{x.s}</p></div>
                  <span className="text-[13px] font-bold">{x.p}</span>
                  {x.a && <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px]">✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className={`absolute inset-0 pt-11 px-[18px] pb-[18px] transition-all duration-500
                          ${current === 1 ? "opacity-100 translate-x-0" : current > 1 ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}`}>
            <div className="flex gap-1.5 mb-5">{[0,1,2,3].map(i=><span key={i} className={`h-0.5 flex-1 rounded-full ${i<2?"bg-black":"bg-[#e5e5e5]"}`}/>)}</div>
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8e8e93] mb-1.5">Passo 2 de 4</p>
            <p className="text-lg font-bold text-[#0a0a0a] leading-tight mb-4">Escolha<br/>a data</p>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] font-bold">Abril 2026</span>
              <div className="flex gap-1"><span className="w-6 h-6 bg-[#f5f5f7] rounded-lg flex items-center justify-center text-xs">‹</span><span className="w-6 h-6 bg-[#f5f5f7] rounded-lg flex items-center justify-center text-xs">›</span></div>
            </div>
            <div className="grid grid-cols-7 text-center mb-1.5">
              {["D","S","T","Q","Q","S","S"].map((d,i)=><span key={i} className="text-[10px] font-semibold text-[#8e8e93] py-0.5">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-3.5 text-[12px] font-medium">
              {[...Array(3)].map((_,i)=><div key={`e${i}`}/>)}
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(d=>(
                <div key={d} className={`text-center py-[7px] rounded-lg
                  ${d<18?"text-[#c7c7cc]":d===18?"bg-[#f5f5f7] font-bold":d===23?"bg-[#0a0a0a] text-white font-bold":""}`}>{d}</div>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className={`absolute inset-0 pt-11 px-[18px] pb-[18px] transition-all duration-500
                          ${current === 2 ? "opacity-100 translate-x-0" : current > 2 ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}`}>
            <div className="flex gap-1.5 mb-5">{[0,1,2,3].map(i=><span key={i} className={`h-0.5 flex-1 rounded-full ${i<3?"bg-black":"bg-[#e5e5e5]"}`}/>)}</div>
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#8e8e93] mb-1.5">Passo 3 de 4</p>
            <p className="text-lg font-bold text-[#0a0a0a] leading-tight mb-1">Que horas<br/>fica melhor?</p>
            <p className="text-[11px] text-[#8e8e93] mb-3">Quinta-feira, 23 de Abril</p>
            <div className="grid grid-cols-3 gap-2 mb-3.5">
              {[{t:"08:00",s:"taken"},{t:"08:30"},{t:"09:00",s:"taken"},{t:"09:30"},{t:"10:00",s:"taken"},{t:"10:30",s:"sel"},{t:"11:00"},{t:"11:30"},{t:"14:00"}].map(({t,s})=>(
                <div key={t} className={`text-center py-2.5 text-xs font-semibold rounded-xl
                  ${s==="taken"?"opacity-30 line-through bg-[#f5f5f7]":s==="sel"?"bg-[#0a0a0a] text-white":"bg-[#f5f5f7]"}`}>{t}</div>
              ))}
            </div>
          </div>

          {/* Step 4 */}
          <div className={`absolute inset-0 pt-11 px-[18px] pb-[18px] transition-all duration-500
                          ${current === 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="flex gap-1.5 mb-3">{[0,1,2,3].map(i=><span key={i} className="h-0.5 flex-1 rounded-full bg-black"/>)}</div>
            <div className="flex flex-col items-center py-2 mb-3">
              <div className="w-14 h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center mb-3">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="text-[15px] font-bold mb-1">Agendado com sucesso!</p>
              <p className="text-[12px] text-[#8e8e93] text-center">Você receberá uma confirmação<br/>por WhatsApp em instantes.</p>
            </div>
            <div className="bg-[#f5f5f7] rounded-2xl p-[18px] mb-3.5">
              {[["Serviço","Corte + Estilo"],["Data","Qui, 23 Abr"],["Horário","10:30"],["Valor","R$ 80"]].map(([l,v])=>(
                <div key={l} className="flex justify-between py-2.5 border-b border-black/[0.06] last:border-0 text-xs">
                  <span className="text-[#8e8e93] font-medium">{l}</span>
                  <span className="font-bold text-[#0a0a0a]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pills */}
      <div className="flex gap-2 mt-5 flex-wrap justify-center">
        {SCHED_LABELS.map((l, i) => (
          <span key={l} className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300
            ${current === i ? "bg-black text-white" : "bg-[#f5f5f7] text-[#8e8e93]"}`}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mb-9">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-[15px] text-black">
          <CheckIcon /> {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Produto mockup ── */
function CatalogMockup() {
  const products = [
    { bg: "from-yellow-100 to-yellow-400", emoji: "👟", badge: "Novo", name: "Tênis Runner", price: "R$ 289" },
    { bg: "from-blue-100 to-blue-500",     emoji: "🎒", badge: null,   name: "Mochila Urban", price: "R$ 189" },
    { bg: "from-pink-100 to-pink-400",     emoji: "👕", badge: null,   name: "Camiseta Básica", price: "R$ 79" },
    { bg: "from-green-100 to-green-500",   emoji: "🧢", badge: "-20%", name: "Boné Classic", price: "R$ 59" },
  ];
  return (
    <div className="rounded-3xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden
                    transform perspective-[1400px] rotate-y-[-6deg] rotate-x-[3deg]
                    hover:rotate-y-[-2deg] hover:rotate-x-[1deg] hover:-translate-y-1.5 transition-transform duration-700">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f5f5f7] border-b border-black/[0.06]">
        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]"/><div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]"/><div className="w-[11px] h-[11px] rounded-full bg-[#28c840]"/>
        <div className="flex-1 text-center text-xs text-[#8e8e93] bg-white px-2.5 py-1 rounded-md ml-2">sualoja.com.br</div>
      </div>
      <div className="p-7">
        <p className="text-lg font-bold tracking-[-0.5px]">Mais vendidos</p>
        <p className="text-xs text-neutral-500 mt-0.5 mb-5">Frete grátis acima de R$ 150</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {products.map((p) => (
            <div key={p.name} className="bg-[#f5f5f7] rounded-2xl p-3 hover:-translate-y-1 transition-transform duration-300">
              <div className={`aspect-square rounded-xl mb-2 flex items-center justify-center text-4xl bg-gradient-to-br ${p.bg}`}>{p.emoji}</div>
              {p.badge && <span className="inline-block text-[9px] font-bold tracking-[1px] uppercase bg-black text-white px-1.5 py-0.5 rounded-full mb-1.5">{p.badge}</span>}
              <p className="text-xs font-semibold mb-0.5">{p.name}</p>
              <p className="text-[13px] font-bold">{p.price}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#25D366] text-white rounded-xl text-[13px] font-semibold">
          <span>Finalizar no WhatsApp</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.5 3.5A11.8 11.8 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5z"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ── Cardápio mockup ── */
function MenuMockup() {
  return (
    <div className="rounded-3xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden
                    transform perspective-[1400px] rotate-y-[6deg] rotate-x-[3deg]
                    hover:rotate-y-[2deg] hover:rotate-x-[1deg] hover:-translate-y-1.5 transition-transform duration-700">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f5f5f7] border-b border-black/[0.06]">
        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]"/><div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]"/><div className="w-[11px] h-[11px] rounded-full bg-[#28c840]"/>
        <div className="flex-1 text-center text-xs text-[#8e8e93] bg-white px-2.5 py-1 rounded-md ml-2">cardapio.com.br</div>
      </div>
      <div className="p-7">
        <p className="text-lg font-bold tracking-[-0.5px]">Burger House</p>
        <p className="text-xs text-neutral-500 mt-0.5 mb-4">Aberto · entrega em ~30min</p>
        <div className="flex gap-1.5 mb-4 pb-3 border-b border-black/[0.06]">
          {["Burgers","Bebidas","Sobremesas"].map((t,i)=>(
            <span key={t} className={`px-3 py-1.5 text-xs font-medium rounded-full ${i===0?"bg-black text-white":"text-neutral-500"}`}>{t}</span>
          ))}
        </div>
        <div className="space-y-3 mb-4">
          {[{e:"🍔",n:"Classic Cheese",d:"Blend 180g, cheddar, alface",p:"R$ 28"},{e:"🌶️",n:"Spicy Double",d:"Duplo blend, pepperoni, molho",p:"R$ 36"},{e:"🥑",n:"Veggie Avocado",d:"Grão-de-bico, abacate, rúcula",p:"R$ 32"}].map((item,i)=>(
            <div key={item.n} className="flex items-center gap-3 p-2.5 bg-[#f5f5f7] rounded-2xl">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.e}</div>
              <div className="flex-1"><p className="text-[13px] font-semibold">{item.n}</p><p className="text-[11px] text-neutral-500">{item.d}</p></div>
              <span className="text-[13px] font-bold mr-2.5">{item.p}</span>
              <div className={`w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-base font-medium
                ${i===1?"animate-bounce":""}`}>+</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-black text-white rounded-full text-[13px] font-semibold">
          <span>Ver carrinho · R$ 64</span>
          <span className="bg-white text-black px-2 py-0.5 rounded-full text-[11px]">2 itens</span>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <div id="showcase">
      {/* 1 — Agendamento */}
      <section className="relative overflow-hidden py-[140px] px-12 border-b border-black/[0.06]">
        <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full bg-[#c7f2d7] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="absolute -bottom-28 -right-24 w-[360px] h-[360px] rounded-full bg-[#e8e0ff] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">Exemplo · Agendamento online</p>
            <h2 className="text-[clamp(36px,4.2vw,56px)] font-bold tracking-[-2px] leading-[1.05] mb-6">
              Seus clientes<br/>marcam horário<br/>em 3 toques.
            </h2>
            <p className="text-lg font-light text-neutral-500 mb-7 max-w-[480px] leading-[1.6]">
              Sistema completo pra qualquer negócio que trabalha com hora marcada. Fim da agenda de papel e mensagens sem fim no WhatsApp.
            </p>
            <FeatureList items={["Calendário em tempo real, sem conflito de horários","Confirmação automática por WhatsApp ou e-mail","Painel pra você ver todos os agendamentos do dia"]}/>
            <a href="#contact" className="inline-block text-base font-medium text-white bg-black px-9 py-4 rounded-full no-underline hover:bg-neutral-800 hover:scale-[1.04] transition-all">Quero um assim</a>
          </div>
          <PhoneScheduling />
        </div>
      </section>

      {/* 2 — Catálogo */}
      <section className="relative overflow-hidden py-[140px] px-12 bg-[#f5f5f7] border-b border-black/[0.06]">
        <div className="absolute -top-28 -right-24 w-[400px] h-[400px] rounded-full bg-[#ffe0d0] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="absolute -bottom-32 -left-28 w-[380px] h-[380px] rounded-full bg-[#d9e7ff] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="lg:order-2">
            <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">Exemplo · Catálogo digital</p>
            <h2 className="text-[clamp(36px,4.2vw,56px)] font-bold tracking-[-2px] leading-[1.05] mb-6">
              Sua loja<br/>aberta 24 horas<br/>por dia.
            </h2>
            <p className="text-lg font-light text-neutral-500 mb-7 max-w-[480px] leading-[1.6]">
              Catálogo online bonito e rápido, com fotos dos produtos, preços atualizados e botão direto pro WhatsApp.
            </p>
            <FeatureList items={["Organize por categorias, destaque os lançamentos","Pedido vai direto pro seu WhatsApp, formatado","Painel simples pra você editar produtos e preços"]}/>
            <a href="#contact" className="inline-block text-base font-medium text-white bg-black px-9 py-4 rounded-full no-underline hover:bg-neutral-800 hover:scale-[1.04] transition-all">Quero um assim</a>
          </div>
          <div className="lg:order-1"><CatalogMockup /></div>
        </div>
      </section>

      {/* 3 — Cardápio */}
      <section className="relative overflow-hidden py-[140px] px-12 border-b border-black/[0.06]">
        <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full bg-[#ffd6d6] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="absolute -bottom-32 -right-24 w-[380px] h-[380px] rounded-full bg-[#fff2c7] opacity-35 blur-[80px] pointer-events-none"/>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">Exemplo · Cardápio digital</p>
            <h2 className="text-[clamp(36px,4.2vw,56px)] font-bold tracking-[-2px] leading-[1.05] mb-6">
              Seu cardápio<br/>no QR code<br/>da mesa.
            </h2>
            <p className="text-lg font-light text-neutral-500 mb-7 max-w-[480px] leading-[1.6]">
              Cardápio interativo pra restaurante, lanchonete, pizzaria ou delivery. Cliente escaneia, navega e envia direto pro seu balcão.
            </p>
            <FeatureList items={["Fotos grandes, preço claro, descrição de cada item","Carrinho com total automático e adicionais","Atualize preços e itens esgotados em segundos"]}/>
            <a href="#contact" className="inline-block text-base font-medium text-white bg-black px-9 py-4 rounded-full no-underline hover:bg-neutral-800 hover:scale-[1.04] transition-all">Quero um assim</a>
          </div>
          <MenuMockup />
        </div>
      </section>
    </div>
  );
}
