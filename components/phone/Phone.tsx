/**
 * Moldura de celular reaproveitada no hero, na seção "Veja o seu negócio aqui" e
 * na seção "Do rascunho ao ar". A largura vem de fora (className); a tela (children)
 * ocupa todo o vidro. É decorativa: quem usa decide o texto alternativo/aria.
 */
export function Phone({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-[44px] bg-[#1a1a1a] p-[10px] shadow-[0_30px_60px_-20px_rgba(10,10,10,0.25)] ${className}`}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[36px] bg-white">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
        {children}
      </div>
    </div>
  );
}

/** Barra de status (9:41) sobre a tela. `claro` = texto branco (topo colorido). */
export function StatusBar({ claro = false }: { claro?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-6 pt-3 text-[12px] font-semibold ${claro ? "text-white" : "text-tinta"}`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
          <rect x="24" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function CheckIcon({ className = "h-5 w-5", strokeWidth = 2.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** "Cota" de planta: linha fina com tracinhos nas pontas e uma medida no meio. */
export function Cota({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-planta ${className}`} aria-hidden="true">
      <span className="h-3 w-px bg-current" />
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="font-mono text-[12px] leading-none">{label}</span>
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="h-3 w-px bg-current" />
    </div>
  );
}
