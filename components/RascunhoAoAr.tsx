"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Phone } from "@/components/phone/Phone";
import { TelaConfirmado, TelaPlanta, TelaWireframe } from "@/components/phone/telas";
import { AppModelo } from "@/components/seu-negocio/AppModelo";
import { MODELOS, corHex } from "@/components/seu-negocio/seu-negocio-dados";
import { useDesktopMotion, useReduzirMovimento } from "@/lib/useDesktopMotion";

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
  [["  <", false], ["Confirmar", true], [' aviso="whatsapp" />', false]],
  [["</", false], ["Agenda", true], [">", false]],
];

const BARBEARIA = MODELOS[0];
const TelaReal = () => <AppModelo modelo={BARBEARIA} nome="Barbearia Modelo" cor={corHex(BARBEARIA.cor)} />;

function Titulo() {
  return (
    <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
      Do rascunho ao ar
    </h2>
  );
}

export default function RascunhoAoAr() {
  const desktop = useDesktopMotion();
  const reduzir = useReduzirMovimento();
  return desktop && !reduzir ? <Grudado /> : <Empilhado reduzir={reduzir} />;
}

/* ── Celular / reduzir movimento: passos empilhados, sem sticky ──────────────── */

const TELAS_ESTATICAS = [TelaPlanta, TelaWireframe, TelaReal, TelaConfirmado];

function Empilhado({ reduzir }: { reduzir: boolean }) {
  return (
    <section id="como-funciona" className="bg-white py-24 lg:py-32">
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
                <m.div
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: reduzir ? 0 : 0.4, ease: EASE }}
                >
                  <Phone className="w-[200px]">
                    <Tela />
                  </Phone>
                </m.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Desktop: seção grudada de 400vh que troca o conteúdo ao rolar ───────────── */

function Grudado() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
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
    const top = el.offsetTop + (k / 4 + 0.05) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section id="como-funciona" ref={ref} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-12 items-center gap-8 px-12 pt-16">
          <div className="col-span-5">
            <Titulo />

            <div className="mt-10 flex gap-2">
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
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {PASSOS.map((_, k) => (
                <Segmento key={k} p={p} k={k} />
              ))}
            </div>

            <ol className="mt-10 grid">
              {PASSOS.map((s, i) => (
                <m.li
                  key={s.titulo}
                  aria-current={passo === i ? "step" : undefined}
                  className="[grid-area:1/1]"
                  initial={false}
                  animate={{ opacity: passo === i ? 1 : 0, y: passo === i ? 0 : 12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-[56px] font-bold leading-none tracking-[-0.03em] text-planta">{i + 1}</p>
                  <h3 className="mt-4 text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-tinta">
                    {s.titulo}
                  </h3>
                  <p className="mt-3 max-w-[44ch] text-[17px] leading-[1.6] text-grafite">{s.texto}</p>
                </m.li>
              ))}
            </ol>
          </div>

          <div className="relative col-span-7 flex justify-center" aria-hidden="true">
            <m.div style={{ y: celularY, rotate: celularRotate, willChange: "transform" }}>
              <Phone className="w-[clamp(220px,calc((100svh-160px)*0.46),300px)]">
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
              className="absolute right-0 top-[28%] w-[min(340px,48%)] rounded-[24px] bg-tinta p-5 font-mono text-[13px] leading-[1.7] text-linha xl:right-4"
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
    </section>
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
