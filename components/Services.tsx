// Preços: NÃO mudar sem o chefe (R$ 500 / R$ 800 / R$ 2.500). "Sob consulta" só nos 2 serviços novos.

function Icone({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 text-tinta"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SERVICOS = [
  {
    nome: "Landing page",
    frase: "Uma página para vender um produto ou serviço e trazer o cliente até você.",
    preco: "A partir de R$ 500",
    icone: (
      <Icone>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </Icone>
    ),
  },
  {
    nome: "Site",
    frase: "O site do seu negócio, que aparece no Google e funciona bem no celular.",
    preco: "A partir de R$ 800",
    icone: (
      <Icone>
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M2.5 8.5h19" />
        <circle cx="5.5" cy="6.25" r="0.4" fill="currentColor" />
        <circle cx="7.5" cy="6.25" r="0.4" fill="currentColor" />
      </Icone>
    ),
  },
  {
    nome: "Aplicativo",
    frase: "App para Android e iPhone, do primeiro desenho até a publicação na loja.",
    preco: "A partir de R$ 2.500",
    icone: (
      <Icone>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
        <path d="M10.5 18.5h3" />
      </Icone>
    ),
  },
  {
    nome: "Sistema sob medida",
    frase: "Agenda, painel de pedidos, área do cliente: o sistema que organiza o seu dia.",
    preco: "Sob consulta",
    icone: (
      <Icone>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M10 9v12" />
      </Icone>
    ),
  },
  {
    nome: "Banco de dados e integrações",
    frase:
      "Tiro seus dados da planilha, organizo num banco seguro e ligo com pagamento e outras ferramentas.",
    preco: "Sob consulta",
    icone: (
      <Icone>
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
        <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
        <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
      </Icone>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-cinza-papel py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
          O que eu faço
        </h2>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-grafite sm:text-[17px]">
          O preço inicial fica à vista. O valor final sai no orçamento, depois de entender o seu caso.
        </p>

        <ul className="mt-12 border-t border-linha">
          {SERVICOS.map((s) => (
            <li
              key={s.nome}
              className="grid gap-2 border-b border-linha py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_auto] md:items-center md:gap-8"
            >
              <h3 className="flex items-center gap-3 text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-tinta">
                {s.icone}
                {s.nome}
              </h3>
              <p className="max-w-[60ch] text-[16px] leading-[1.6] text-grafite sm:text-[17px]">{s.frase}</p>
              <p className="text-[16px] font-semibold text-tinta md:text-right">{s.preco}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
