const LINKS = [
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#seu-negocio", rotulo: "Modelos" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#perguntas", rotulo: "Perguntas" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha bg-white/80 backdrop-blur-md">
      <a
        href="#conteudo"
        className="absolute left-4 top-2.5 z-[60] inline-flex h-11 -translate-y-24 items-center rounded-full bg-tinta px-5 text-[15px] font-semibold text-white focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
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
            className="inline-flex h-11 items-center rounded-full bg-planta px-4 text-[15px] font-semibold text-white transition-colors hover:bg-planta-escuro md:px-5"
          >
            Pedir orçamento
          </a>
        </div>
      </nav>
    </header>
  );
}
