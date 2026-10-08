"use client";

import { m, type MotionValue } from "framer-motion";
import { CheckIcon, Cota, StatusBar } from "./Phone";

/* Telas usadas na seção "Do rascunho ao ar" (e a de confirmação também no hero). */

/** Passo 1: tela vazia com a grade de planta e 2 cotas. */
export function TelaPlanta() {
  return (
    <div className="grade-planta-tela absolute inset-0 bg-white">
      <StatusBar />
      <Cota label="390" className="absolute left-5 right-5 top-[22%]" />
      <div className="absolute bottom-[18%] left-6 top-[32%] flex flex-col items-center text-planta" aria-hidden="true">
        <span className="h-px w-3 bg-current" />
        <span className="w-px flex-1 bg-current opacity-60" />
        <span className="my-1 -rotate-90 font-mono text-[12px] leading-none">844</span>
        <span className="w-px flex-1 bg-current opacity-60" />
        <span className="h-px w-3 bg-current" />
      </div>
    </div>
  );
}

const CAIXAS = [
  "h-[18%] mx-0 rounded-none border-x-0 border-t-0", // topo
  "h-[10%]", // linha 1
  "h-[10%]", // linha 2
  "h-[10%]", // linha 3
  "h-[9%] rounded-2xl", // botão
] as const;

/** Passo 2: wireframe com contornos Azul Planta. `escalas` liga cada caixa à rolagem. */
export function TelaWireframe({ escalas }: { escalas?: MotionValue<number>[] }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 bg-white px-4 pb-5">
      <StatusBar />
      {CAIXAS.map((cls, i) => (
        <m.div
          key={i}
          style={escalas ? { scaleX: escalas[i], originX: 0 } : undefined}
          className={`rounded-xl border-[1.5px] border-planta ${cls} ${i === 4 ? "mt-auto" : ""}`}
        >
          {i > 0 && i < 4 ? (
            <div className="flex h-full items-center gap-2 px-3">
              <span className="h-2 w-1/2 rounded-full bg-planta/25" />
              <span className="ml-auto h-4 w-10 rounded-full border border-planta" />
            </div>
          ) : null}
        </m.div>
      ))}
    </div>
  );
}

/** Passo 4: horário confirmado, 23h47. `escalaCheck` liga o check à rolagem. */
export function TelaConfirmado({ escalaCheck }: { escalaCheck?: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white px-5 pb-6">
      <StatusBar />
      <p className="mx-auto mt-4 w-fit rounded-full bg-cinza-papel px-3 py-1 text-[12px] text-grafite">
        seunegocio.com.br
      </p>
      <div className="mt-[22%] flex flex-col items-center text-center">
        <m.span
          style={escalaCheck ? { scale: escalaCheck } : undefined}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-planta text-white"
        >
          <CheckIcon className="h-8 w-8" strokeWidth={3} />
        </m.span>
        <p className="mt-4 text-[18px] font-bold text-tinta">Horário confirmado</p>
        <p className="mt-1 text-[13px] text-grafite">Marcado às 23h47</p>
      </div>
      <dl className="mt-6 divide-y divide-linha rounded-2xl bg-cinza-papel px-4 text-[13px]">
        {[
          ["Serviço", "Corte"],
          ["Dia", "Sábado, 11"],
          ["Horário", "10h00"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2.5">
            <dt className="text-grafite">{k}</dt>
            <dd className="font-semibold text-tinta">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
