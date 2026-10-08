"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReduzirMovimento } from "@/lib/useDesktopMotion";

const FRASE =
  "Seu cliente quer marcar horário, ver o cardápio e fazer o pedido às 23h, quando você já fechou. Eu construo o que resolve isso por você.";
const PALAVRAS = FRASE.split(" ");

/** A frase "acende" palavra por palavra conforme a rolagem (só opacity). */
export default function Frase() {
  const reduzir = useReduzirMovimento();
  return (
    <section aria-label="Por que isso importa" className="bg-tinta py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {reduzir ? (
          <p className="max-w-[900px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
            {FRASE}
          </p>
        ) : (
          <FraseAnimada />
        )}
      </div>
    </section>
  );
}

function FraseAnimada() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const n = PALAVRAS.length;
  return (
    <p
      ref={ref}
      className="max-w-[900px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white"
    >
      <span className="sr-only">{FRASE}</span>
      <span aria-hidden="true">
        {PALAVRAS.map((p, i) => (
          <Palavra key={i} progresso={scrollYProgress} faixa={[i / n, (i + 1) / n]}>
            {p}
            {i < n - 1 ? " " : ""}
          </Palavra>
        ))}
      </span>
    </p>
  );
}

function Palavra({
  progresso,
  faixa,
  children,
}: {
  progresso: MotionValue<number>;
  faixa: [number, number];
  children: React.ReactNode;
}) {
  const opacity = useTransform(progresso, faixa, [0.25, 1]);
  return <m.span style={{ opacity }}>{children}</m.span>;
}
