"use client";

import { useSyncExternalStore } from "react";

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    // No HTML exportado (servidor) assume false; o navegador corrige logo após a
    // hidratação, sem divergência de HTML.
    () => false,
  );
}

export const DESKTOP_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
export const REDUZIR_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * true só em telas grandes com mouse. Parallax e a seção grudada só ligam com isto
 * (e sem "reduzir movimento"). Abaixo disso, versões leves. Atualiza no `change`.
 */
export function useDesktopMotion(): boolean {
  return useMediaQuery(DESKTOP_QUERY);
}

/**
 * "Reduzir movimento" do sistema. Usado no lugar do useReducedMotion do framer,
 * que lê o valor já na hidratação (e quebraria o HTML do export estático).
 */
export function useReduzirMovimento(): boolean {
  return useMediaQuery(REDUZIR_QUERY);
}
