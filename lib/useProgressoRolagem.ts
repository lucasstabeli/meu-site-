"use client";

import type { RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Progresso de rolagem (0 a 1) de uma seção, para ligar opacity/transform à rolagem.
 *
 * Por que não usar o scrollYProgress direto: o framer-motion 12.38 tenta "acelerar"
 * `useTransform(scrollYProgress, [...], [...])` em opacity com a ViewTimeline do navegador.
 * Só que ele lê `target.current` quando o elemento filho monta, e o React liga o ref do
 * pai (a seção) depois dos filhos: o alvo chega vazio e a animação passa a seguir a
 * rolagem da PÁGINA inteira (camadas aparecendo na hora errada). Passar por um
 * transformador em função desliga essa aceleração; o cálculo continua só durante a
 * rolagem (sem loop) e só com opacity/transform.
 */
export function useProgressoRolagem(target: RefObject<HTMLElement | null>, offset: Offset): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, (v) => v);
}
