"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { m, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { Phone } from "@/components/phone/Phone";
import { TelaConfirmado, TelaPlanta, TelaWireframe } from "@/components/phone/telas";
import { AppModelo } from "@/components/seu-negocio/AppModelo";
import { MODELOS, corHex } from "@/components/seu-negocio/seu-negocio-dados";
import { useProgressoRolagem } from "@/lib/useProgressoRolagem";

const EASE = [0.22, 1, 0.36, 1] as const;

const PASSOS = [
  {
    titulo: "Você me conta o que precisa",
    texto: "Uma conversa rápida sobre o seu negócio, seus clientes e o que hoje dá trabalho.",
  },
  {
    titulo: "Eu desenho a planta e mando o orçamento",
    texto: "Antes de começar, você vê o desenho das telas, o prazo e o preço fechado.",
  },
  {
    titulo: "Construo com você acompanhando",
    texto: "Você recebe prévias pelo caminho e pede ajustes até a entrega.",
  },
  {
    titulo: "No ar, funcionando sozinho",
    texto: "Seu cliente marca, pede ou compra a qualquer hora. Eu ajudo a publicar e continuo por perto.",
  },
] as const;

// Código do cartão (passo 3): [texto, é palavra-chave?] por pedaço.
const CODIGO: [string, boolean][][] = [
  [["<", false], ["Agenda", true], [' negocio="Barbearia Modelo">', false]],
  [["  <", false], ["Servico", true], [' nome="Corte" duracao="30 min" />', false]],
  [["  <", false], ["Servico", true], [' nome="Barba" duracao="20 min" />', false]],
  [["  <", false], ["Horarios", true], [' de="9h" ate="23h" />', false]],
  [["  <", false], ["Confirmar", true], [' aviso="email" />', false]],
  [["</", false], ["Agenda", true], [">", false]],
];

const BARBEARIA = MODELOS[0];
const TelaReal = () => <AppModelo modelo={BARBEARIA} nome="Barbearia Modelo" cor={corHex(BARBEARIA.cor)} />;

function Titulo() {
  return (
    <h2 className="text-balance text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
      Do rascunho ao ar
    </h2>
  );
}

// Mesma condição do CSS (.rascunho-grudado em app/globals.css): qualquer tela, sem
// "reduzir movimento". No celular a versão grudada é mais curta e vertical.
const GRUDADO_QUERY = "(prefers-reduced-motion: no-preference)";

/**
 * true/false no navegador; null no HTML exportado e na hidratação. Enquanto é null as
 * duas versões vão no HTML e o CSS mostra a certa já no primeiro desenho (sem salto de
 * layout). Depois da hidratação a versão escondida sai do DOM.
 */
function useModoGrudado(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    (onChange) => {
      const mql = window.matchMedia(GRUDADO_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(GRUDADO_QUERY).matches,
    () => null,
  );
}

export default function RascunhoAoAr() {
  const grudado = useModoGrudado();
  return (
    <section id="como-funciona" className="bg-white">
      {grudado !== true ? (
        <div className="rascunho-empilhado">
          <Empilhado />
        </div>
      ) : null}
      {grudado !== false ? (
        <div className="rascunho-grudado">
          <Grudado />
        </div>
      ) : null}
    </section>
  );
}

/* ── Reduzir movimento / sem JS: passos empilhados, sem sticky ─────────────── */

const TELAS_ESTATICAS = [TelaPlanta, TelaWireframe, TelaReal, TelaConfirmado];

function Empilhado() {
  return (
    <div className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <Titulo />
        <ol className="mt-12 grid gap-16 md:grid-cols-2 md:gap-x-8">
          {PASSOS.map((p, i) => {
            const Tela = TELAS_ESTATICAS[i];
            return (
              <li key={p.titulo} className="flex flex-col gap-6">
                <div>
                  <p className="text-[14px] font-semibold text-planta">Passo {i + 1}</p>
                  <h3 className="mt-1 text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-tinta">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6] text-grafite sm:text-[17px]">{p.texto}</p>
                </div>
                {/* Surge ao entrar na tela só com CSS (.surge-ao-ver): nunca sai escondido no HTML. */}
                <div aria-hidden="true" className="surge-ao-ver">
                  <Phone className="w-[min(240px,72vw)]">
                    <Tela />
                  </Phone>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ── Seção grudada que troca o conteúdo ao rolar ──────────────────────────────
   Desktop: 300vh, texto à esquerda e celular à direita.
   Celular: 250svh, tudo em coluna (botões + barra, texto do passo, celular no meio),
   com o título antes do bloco grudado para sobrar altura para o aparelho. svh: a
   altura não muda quando a barra do navegador do celular aparece ou some. */

function Grudado() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgressoRolagem(ref, ["start start", "end end"]);
  const [passo, setPasso] = useState(0);
  // O React só re-renderiza quando o passo muda; o resto é motion value.
  useMotionValueEvent(p, "change", (v) => {
    const novo = Math.max(0, Math.min(3, Math.floor(v * 4)));
    setPasso((atual) => (atual === novo ? atual : novo));
  });

  const plantaOpacity = useTransform(p, [0.2, 0.3], [1, 0]);
  const wireOpacity = useTransform(p, [0.2, 0.3, 0.55, 0.65], [0, 1, 1, 0]);
  const c0 = useTransform(p, [0.25, 0.29], [0, 1]);
  const c1 = useTransform(p, [0.29, 0.33], [0, 1]);
  const c2 = useTransform(p, [0.33, 0.37], [0, 1]);
  const c3 = useTransform(p, [0.37, 0.41], [0, 1]);
  const c4 = useTransform(p, [0.41, 0.45], [0, 1]);
  const realOpacity = useTransform(p, [0.5, 0.62], [0, 1]);
  const codigoOpacity = useTransform(p, [0.5, 0.58, 0.72, 0.78], [0, 1, 1, 0]);
  const codigoX = useTransform(p, [0.5, 0.58], [24, 0]);
  const okOpacity = useTransform(p, [0.78, 0.88], [0, 1]);
  const okScale = useTransform(p, [0.78, 0.88], [0.6, 1]);
  const celularY = useTransform(p, [0, 1], [20, -20]);
  const celularRotate = useTransform(p, [0, 1], [-2, 0]);

  function irPara(k: number) {
    const el = ref.current;
    if (!el) return;
    const inicio = el.getBoundingClientRect().top + window.scrollY;
    const top = inicio + (k / 4 + 0.05) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-24 sm:px-8 lg:hidden">
        <Titulo />
      </div>
      <div ref={ref} className="relative h-[250svh] lg:h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-4 pt-[76px] lg:flex-row lg:items-center lg:pb-0 lg:pt-0">
          <div className="mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col px-5 sm:px-8 lg:grid lg:flex-none lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:pt-16">
            <div className="lg:col-span-5">
              <div className="hidden lg:block">
                <Titulo />
              </div>

              <div className="flex items-center gap-4 lg:block">
                <div className="flex gap-2 lg:mt-10">
                  {PASSOS.map((s, k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => irPara(k)}
                      aria-label={`Ir para o passo ${k + 1}: ${s.titulo}`}
                      aria-current={passo === k ? "step" : undefined}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-[15px] font-semibold transition-colors ${
                        passo === k ? "border-planta bg-planta text-white" : "border-linha text-tinta hover:border-tinta"
                      }`}
                    >
                      {k + 1}
                    </button>
                  ))}
                </div>
                <div className="flex flex-1 gap-1.5 lg:mt-4" aria-hidden="true">
                  {PASSOS.map((_, k) => (
                    <Segmento key={k} p={p} k={k} />
                  ))}
                </div>
              </div>

              <ol className="mt-4 grid lg:mt-10">
                {PASSOS.map((s, i) => (
                  <m.li
                    key={s.titulo}
                    aria-current={passo === i ? "step" : undefined}
                    className="[grid-area:1/1]"
                    initial={false}
                    animate={{ opacity: passo === i ? 1 : 0, y: passo === i ? 0 : 12 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="text-[14px] font-semibold text-planta lg:text-[56px] lg:font-bold lg:leading-none lg:tracking-[-0.03em]">
                      <span className="lg:hidden">Passo </span>
                      {i + 1}
                    </p>
                    <h3 className="mt-1 text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-tinta lg:mt-4 lg:text-[32px] lg:leading-[1.2]">
                      {s.titulo}
                    </h3>
                    <p className="mt-1.5 max-w-[44ch] text-[15px] leading-[1.5] text-grafite lg:mt-3 lg:text-[17px] lg:leading-[1.6]">
                      {s.texto}
                    </p>
                  </m.li>
                ))}
              </ol>
            </div>

            <div
              className="relative mt-4 flex min-h-0 flex-1 items-center justify-center lg:col-span-7 lg:mt-0 lg:flex-none"
              aria-hidden="true"
            >
              <m.div style={{ y: celularY, rotate: celularRotate, willChange: "transform" }}>
                <Phone className="w-[clamp(150px,calc((100svh-330px)*0.47+20px),250px)] lg:w-[clamp(220px,calc((100svh-160px)*0.46),300px)]">
                  <m.div className="absolute inset-0" style={{ opacity: realOpacity }}>
                    <TelaReal />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ opacity: wireOpacity }}>
                    <TelaWireframe escalas={[c0, c1, c2, c3, c4]} />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ opacity: plantaOpacity }}>
                    <TelaPlanta />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ opacity: okOpacity }}>
                    <TelaConfirmado escalaCheck={okScale} />
                  </m.div>
                </Phone>
              </m.div>

              <m.div
                className="absolute inset-x-0 bottom-0 mx-auto w-max max-w-full overflow-hidden rounded-[20px] bg-tinta p-4 font-mono text-[12px] leading-[1.7] text-linha lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-[28%] lg:mx-0 lg:rounded-[24px] lg:p-5 xl:text-[13px]"
                style={{ opacity: codigoOpacity, x: codigoX }}
              >
                {CODIGO.map((linha, k) => (
                  <LinhaCodigo key={k} p={p} k={k}>
                    {linha.map(([t, chave], j) => (
                      <span key={j} className={chave ? "text-planta-claro" : undefined}>
                        {t}
                      </span>
                    ))}
                  </LinhaCodigo>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Segmento({ p, k }: { p: MotionValue<number>; k: number }) {
  const scaleX = useTransform(p, [k / 4, (k + 1) / 4], [0, 1]);
  return (
    <span className="h-1 flex-1 overflow-hidden rounded-full bg-linha">
      <m.span className="block h-full bg-planta" style={{ scaleX, originX: 0 }} />
    </span>
  );
}

function LinhaCodigo({ p, k, children }: { p: MotionValue<number>; k: number; children: React.ReactNode }) {
  const passo = 0.2 / CODIGO.length;
  const opacity = useTransform(p, [0.52 + k * passo, 0.52 + (k + 1) * passo], [0.15, 1]);
  return (
    <m.div className="whitespace-pre" style={{ opacity }}>
      {children}
    </m.div>
  );
}
