"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CanvasRevealEffectProps {
  color?: string;       // cor CSS, ex: "#888" ou "rgb(140,140,140)"
  dotSize?: number;     // lado do ponto em px (CSS)
  totalSize?: number;   // espaçamento entre pontos em px (CSS)
  className?: string;
}

export function CanvasRevealEffect({
  color     = "#8a8a8a",
  dotSize   = 5,
  totalSize = 20,
  className,
}: CanvasRevealEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    /* ── resize: ajusta buffer ao DPR e tamanho do pai ── */
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas!.offsetWidth  || window.innerWidth;
      const h   = canvas!.offsetHeight || window.innerHeight;
      canvas!.width  = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
    }
    resize();

    /* ── pseudo-random estável por célula ── */
    function hash(x: number, y: number, seed = 0) {
      const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.3) * 43758.5453;
      return n - Math.floor(n);
    }

    /* ── loop de desenho ── */
    function draw() {
      const dpr     = window.devicePixelRatio || 1;
      const elapsed = (performance.now() - startTime) / 1000; // segundos
      const W       = canvas!.width;
      const H       = canvas!.height;

      ctx!.clearRect(0, 0, W, H);

      const scale     = dpr;
      const tSize     = totalSize * scale;
      const dSize     = dotSize   * scale;
      const cols      = Math.ceil(W / tSize) + 1;
      const rows      = Math.ceil(H / tSize) + 1;
      const centerCol = W / 2 / tSize;
      const centerRow = H / 2 / tSize;

      // semente de flicker baseada no tempo (muda a cada ~5s)
      const flickerSeed = Math.floor(elapsed / 5);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const showOffset = hash(col, row);

          // animação radial do centro para fora
          const dist   = Math.hypot(col - centerCol, row - centerRow);
          const timing = dist * 0.018 + showOffset * 0.18;
          const reveal = Math.max(0, Math.min(1,
            (elapsed * 1.2 - timing) / 0.14
          ));

          if (reveal <= 0) continue;

          // opacidade aleatória por célula (flicker)
          const r = hash(col, row, flickerSeed + showOffset);
          const tier = r < 0.3 ? 0.12
                     : r < 0.6 ? 0.30
                     : r < 0.9 ? 0.55
                     :           0.75;

          ctx!.globalAlpha = tier * reveal;
          ctx!.fillStyle   = color;
          ctx!.fillRect(
            col * tSize,
            row * tSize,
            dSize,
            dSize
          );
        }
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [color, dotSize, totalSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%" }}
      className={className}
    />
  );
}
