"use client";

import { useEffect } from "react";

/**
 * Protecao paliativa contra clickjacking.
 * O GitHub Pages nao deixa enviar X-Frame-Options nem CSP frame-ancestors
 * (essas diretivas nao funcionam via <meta>), entao, se o site for aberto
 * dentro de um iframe de outro dominio, ele sai do iframe.
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
