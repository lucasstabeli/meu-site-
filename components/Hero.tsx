"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { m, useInView, useTransform } from "framer-motion";
import { Cota, Phone, StatusBar } from "@/components/phone/Phone";
import { TelaConfirmado } from "@/components/phone/telas";
import { useProgressoRolagem } from "@/lib/useProgressoRolagem";
import { useDesktopMotion, useReduzirMovimento } from "@/lib/useDesktopMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINHAS_H1 = ["Sites, apps e sistemas", "que fazem seu negócio", "funcionar sozinho."];
// Índice da primeira palavra de cada linha (atraso escalonado das palavras no celular).
const PALAVRAS_ANTES = LINHAS_H1.map((_, i) =>
  LINHAS_H1.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0),
);

/*
 * Entrada do hero: feita em CSS (app/globals.css, classes .hero-*), não com o framer.
 * Assim o HTML exportado já chega visível (nada de opacity:0 esperando o JavaScript),
 * a animação roda até sem JS e o H1 (maior elemento da primeira tela) só se move com
 * transform, sem atrasar o LCP. "Reduzir movimento" desliga tudo no próprio CSS.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReduzirMovimento();
  const desktop = useDesktopMotion();
  const parallax = desktop && !reduzir;

  // Parallax suave: só calcula enquanto a pessoa rola sobre o hero.
  const scrollYProgress = useProgressoRolagem(ref, ["start start", "end start"]);
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
        <m.div className="lg:col-span-8" style={parallax ? { y: textoY, opacity: textoOpacity } : undefined}>
          <h1 className="text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-tinta">
            {LINHAS_H1.map((linha, i) => (
              <span key={linha} className="hero-linha lg:block" style={{ "--i": i } as React.CSSProperties}>
                {/* No celular a frase quebra em outras linhas: quem sobe é cada palavra (CSS). */}
                {/* O espaço fica fora do span: dentro de um inline-block ele sumiria. */}
                {linha.split(" ").map((palavra, j, todas) => (
                  <Fragment key={j}>
                    <span className="hero-palavra" style={{ "--w": PALAVRAS_ANTES[i] + j } as React.CSSProperties}>
                      {palavra}
                    </span>
                    {j < todas.length - 1 ? " " : ""}
                  </Fragment>
                ))}
                {i < LINHAS_H1.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <div className="hero-bloco">
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
          </div>
        </m.div>

        <m.div
          className="flex flex-col items-center lg:col-span-4"
          style={parallax ? { y: celularY, scale: celularScale, willChange: "transform" } : undefined}
        >
          <div className="hero-cota hidden w-[280px] lg:block">
            <Cota label="1080" className="mb-4" />
          </div>
          <div className="hero-celular flex flex-col items-center">
            <AgendaHero animar={!reduzir} />
            <p className="mt-4 text-[13px] text-grafite">Modelo ilustrativo</p>
          </div>
        </m.div>
      </div>

      <div className="hero-cota absolute bottom-10 left-12 hidden w-[180px] lg:block">
        <Cota label="1200" />
      </div>
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

  // Reduzir movimento (e HTML exportado, antes do JS): mostra direto a tela final.
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

/** Rodapé fixo das telas 1 a 3: resumo do que já foi escolhido + botão (enche a tela). */
function RodapeAgenda({ servico, dia, hora, botao }: { servico: string; dia: string; hora: string; botao: string }) {
  return (
    <div className="absolute inset-x-4 bottom-5">
      <dl className="divide-y divide-linha rounded-2xl bg-cinza-papel px-3.5 text-[12px]">
        {[
          ["Serviço", servico],
          ["Dia", dia],
          ["Horário", hora],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2">
            <dt className="text-grafite">{k}</dt>
            <dd className={v === "—" ? "text-grafite" : "font-semibold text-tinta"}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 rounded-2xl bg-tinta py-3 text-center text-[13px] font-semibold text-white">{botao}</p>
    </div>
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
      <RodapeAgenda servico="Corte" dia="—" hora="—" botao="Continuar" />
    </div>
  );
}

function TelaDia() {
  return (
    <div className="absolute inset-0 bg-white">
      <CabecalhoAgenda passo={1} titulo="Qual dia?" />
      <p className="mt-4 px-4 text-[12px] font-medium text-grafite">Outubro</p>
      <div className="mt-2 grid grid-cols-4 gap-2 px-4">
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
      <p className="mt-3 px-4 text-[12px] text-grafite">Sábado: 6 horários livres</p>
      <RodapeAgenda servico="Corte" dia="Sábado, 11" hora="—" botao="Continuar" />
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
      <RodapeAgenda servico="Corte" dia="Sábado, 11" hora="10h00" botao="Confirmar horário" />
    </div>
  );
}
