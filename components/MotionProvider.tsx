"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Framer-motion enxuto: LazyMotion + `m.*` (strict impede usar `motion.*` por engano)
 * e reducedMotion="user" para respeitar o "reduzir movimento" do sistema.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
