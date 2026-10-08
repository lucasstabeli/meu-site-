"use client";

import { useEffect } from "react";

/**
 * Tentativa PALIATIVA contra clickjacking: NAO garante protecao.
 * Navegadores atuais costumam bloquear a saida do iframe (ex.: sandbox), entao
 * o site pode continuar dentro do iframe. Protecao real so com cabecalho
 * (X-Frame-Options / CSP frame-ancestors), que o GitHub Pages nao permite.
 */
export default function FrameGuard() {
  useEffect(() => {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.replace(window.self.location.href);
      }
    } catch {
      /* navegador bloqueou a navegacao do topo (ex.: iframe sandbox): nada a fazer */
    }
  }, []);
  return null;
}
