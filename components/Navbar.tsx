const LINKS = [
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#seu-negocio", rotulo: "Modelos" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#perguntas", rotulo: "Perguntas" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha bg-white/80 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
      >
        <a href="#topo" className="text-[17px] font-bold tracking-[-0.01em] text-tinta">
          Stabeli Studio
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-grafite transition-colors hover:text-tinta">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="inline-flex h-10 items-center rounded-full bg-planta px-4 text-[15px] font-semibold text-white transition-colors hover:bg-planta-escuro md:h-11 md:px-5"
          >
            Pedir orçamento
          </a>
        </div>
      </nav>
    </header>
  );
}
