"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-16
                    bg-white/75 backdrop-blur-xl border-b border-black/[0.07]"
         style={{ WebkitBackdropFilter: "saturate(180%) blur(20px)" }}>
      <a href="#hero" className="text-[18px] font-bold tracking-[-0.5px] text-black no-underline">
        Stabeli Studio
      </a>
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        <li><a href="#services" className="text-sm text-black/75 hover:text-black no-underline transition-opacity">Serviços</a></li>
        <li><a href="#showcase" className="text-sm text-black/75 hover:text-black no-underline transition-opacity">Exemplos</a></li>
        <li><a href="#process"  className="text-sm text-black/75 hover:text-black no-underline transition-opacity">Como funciona</a></li>
        <li>
          <a href="#contact"
             className="text-sm text-white bg-black px-5 py-2 rounded-full no-underline
                        hover:bg-neutral-800 transition-colors">
            Fale comigo
          </a>
        </li>
      </ul>
    </nav>
  );
}
