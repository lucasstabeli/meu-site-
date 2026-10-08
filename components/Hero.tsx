"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useAnimationControls,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Cota, Phone, StatusBar } from "@/components/phone/Phone";
import { TelaConfirmado } from "@/components/phone/telas";
import { DESKTOP_QUERY, REDUZIR_QUERY, useDesktopMotion, useReduzirMovimento } from "@/lib/useDesktopMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Entrada do hero (uma vez). `custom` = atraso em segundos.
// "deDesktop" coloca o deslocamento inicial; no celular a entrada é só opacidade.
const entrada: Variants = {
  escondido: { opacity: 0 },
  deDesktop: (c: { y: number }) => ({ opacity: 0, y: c.y }),
  visivelDesktop: (c: { delay: number; dur: number }) => ({
    opacity: 1,
    y: 0,
    transition: { delay: c.delay, duration: c.dur, ease: EASE },
  }),
  visivelCelular: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
  pronto: { opacity: 1, y: 0, transition: { duration: 0 } },
};

const cotaEntrada: Variants = {
  escondido: { scaleX: 0 },
  visivelDesktop: { scaleX: 1, transition: { delay: 0.4, duration: 0.8, ease: EASE } },
  visivelCelular: { scaleX: 1, transition: { duration: 0 } },
  pronto: { scaleX: 1, transition: { duration: 0 } },
};

const LINHAS_H1 = ["Sites, apps e sistemas", "que fazem seu negócio", "funcionar sozinho."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReduzirMovimento();
  const desktop = useDesktopMotion();
  const parallax = desktop && !reduzir;

  const controls = useAnimationControls();
  useEffect(() => {
    // Decide a entrada no navegador (no HTML exportado tudo começa invisível).
    const reduz = window.matchMedia(REDUZIR_QUERY).matches;
    const desk = window.matchMedia(DESKTOP_QUERY).matches;
    if (reduz) {
      controls.set("pronto");
      return;
    }
    if (desk) {
      controls.set("deDesktop");
      void controls.start("visivelDesktop");
    } else {
      void controls.start("visivelCelular");
    }
  }, [controls]);

  // Parallax suave: só calcula enquanto a pessoa rola sobre o hero.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const celularY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const celularScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const gradeY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="topo"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-white pb-16 pt-28 lg:pb-12 lg:pt-24"
    >
      <m.div
        aria-hidden="true"
        className="grade-planta absolute -inset-y-12 inset-x-0"
        style={parallax ? { y: gradeY } : undefined}
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <m.div className="lg:col-span-7" style={parallax ? { y: textoY, opacity: textoOpacity } : undefined}>
          <h1 className="text-[clamp(40px,6.4vw,80px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-tinta">
            {LINHAS_H1.map((linha, i) => (
              <m.span
                key={linha}
                className="lg:block"
                variants={entrada}
                initial="escondido"
                animate={controls}
                custom={{ y: 28, delay: i * 0.08, dur: 0.6 }}
              >
                {linha}
                {i < LINHAS_H1.length - 1 ? " " : ""}
              </m.span>
            ))}
          </h1>

          <m.div
            variants={entrada}
            initial="escondido"
            animate={controls}
            custom={{ y: 12, delay: 0.3, dur: 0.5 }}
          >
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-grafite sm:text-[17px]">
              Agenda online, cardápio digital, loja no celular e painel para organizar tudo. Eu desenho,
              construo e coloco no ar, com você acompanhando.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex h-12 items-center justify-center rounded-full bg-planta px-6 text-[16px] font-semibold text-white transition-colors hover:bg-planta-escuro"
              >
                Pedir orçamento
              </a>
              <a
                href="#seu-negocio"
                className="inline-flex h-12 items-center justify-center rounded-full border border-tinta px-6 text-[16px] font-semibold text-tinta transition-colors hover:bg-tinta hover:text-white"
              >
                Montar meu modelo
              </a>
            </div>
            <p className="mt-6 text-[14px] text-grafite">
              Preço combinado antes de começar. Você fala direto com quem faz.
            </p>
          </m.div>
        </m.div>

        <m.div
          className="flex flex-col items-center lg:col-span-5"
          style={parallax ? { y: celularY, scale: celularScale, willChange: "transform" } : undefined}
        >
          <m.div
            className="hidden w-[280px] lg:block"
            variants={cotaEntrada}
            initial="escondido"
            animate={controls}
            style={{ originX: 0 }}
          >
            <Cota label="1080" className="mb-4" />
          </m.div>
          <m.div
            variants={entrada}
            initial="escondido"
            animate={controls}
            custom={{ y: 40, delay: 0.2, dur: 0.7 }}
            className="flex flex-col items-center"
          >
            <AgendaHero animar={parallax} />
            <p className="mt-4 text-[13px] text-grafite">Modelo ilustrativo</p>
          </m.div>
        </m.div>
      </div>

      <m.div
        className="absolute bottom-10 left-12 hidden w-[180px] lg:block"
        variants={cotaEntrada}
        initial="escondido"
        animate={controls}
        style={{ originX: 0 }}
      >
        <Cota label="1200" />
      </m.div>
    </section>
  );
}

/* ── Celular do hero: agenda da "Barbearia Modelo" ─────────────────────────── */

const PASSOS_HERO = 4;
const INTERVALO_MS = 1300;

function AgendaHero({ animar }: { animar: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.5 });
  const [passo, setPasso] = useState(0);

  // Passa pelos 4 passos UMA vez quando entra na tela e para no último. Sem loop.
  useEffect(() => {
    if (!animar || !visivel) return;
    const timers = [1, 2, 3].map((p) => window.setTimeout(() => setPasso(p), p * INTERVALO_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [animar, visivel]);

  // Celular / reduzir movimento: mostra direto a tela final.
  const atual = animar ? passo : PASSOS_HERO - 1;

  return (
    <div ref={ref} aria-hidden="true">
      <Phone className="w-[min(240px,72vw)] lg:w-[280px]">
        {[TelaServico, TelaDia, TelaHorario, TelaConfirmado].map((Tela, i) => (
          <m.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: atual === i ? 1 : 0, x: atual === i ? 0 : atual > i ? -24 : 24 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Tela />
          </m.div>
        ))}
      </Phone>
    </div>
  );
}

function CabecalhoAgenda({ passo, titulo }: { passo: number; titulo: string }) {
  return (
    <>
      <StatusBar />
      <div className="px-5 pt-5">
        <div className="mb-4 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i <= passo ? "bg-tinta" : "bg-linha"}`} />
          ))}
        </div>
        <p className="text-[12px] font-medium text-grafite">Barbearia Modelo</p>
        <p className="mt-1 text-[19px] font-bold leading-tight text-tinta">{titulo}</p>
      </div>
    </>
  );
}

function TelaServico() {
  return (
    <div className="absolute inset-0 bg-white">
      <CabecalhoAgenda passo={0} titulo="Qual serviço?" />
      <ul className="mt-4 space-y-2 px-4">
        {[
          ["Corte", "30 min", true],
          ["Barba", "20 min", false],
          ["Corte e barba", "50 min", false],
        ].map(([n, d, sel]) => (
          <li
            key={n as string}
            className={`flex items-center justify-between rounded-2xl p-3 ${sel ? "bg-tinta text-white" : "bg-cinza-papel text-tinta"}`}
          >
            <span className="text-[13px] font-semibold">{n}</span>
            <span className={`text-[12px] ${sel ? "text-white/80" : "text-grafite"}`}>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TelaDia() {
  return (
    <div className="absolute inset-0 bg-white">
      <CabecalhoAgenda passo={1} titulo="Qual dia?" />
      <div className="mt-4 grid grid-cols-4 gap-2 px-4">
        {[
          ["Qui", "9"],
          ["Sex", "10"],
          ["Sáb", "11"],
          ["Seg", "13"],
        ].map(([d, n]) => (
          <div
            key={n}
            className={`flex flex-col items-center rounded-2xl py-2.5 ${n === "11" ? "bg-tinta text-white" : "bg-cinza-papel text-tinta"}`}
          >
            <span className="text-[12px]">{d}</span>
            <span className="text-[16px] font-bold">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaHorario() {
  return (
    <div className="absolute inset-0 bg-white">
      <CabecalhoAgenda passo={2} titulo="Que horas?" />
      <div className="mt-4 grid grid-cols-3 gap-2 px-4">
        {["9h00", "9h30", "10h00", "10h30", "11h00", "14h00"].map((h) => (
          <span
            key={h}
            className={`rounded-xl py-2.5 text-center text-[12px] font-semibold ${h === "10h00" ? "bg-tinta text-white" : "bg-cinza-papel text-tinta"}`}
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
