// Perguntas frequentes com <details>/<summary> nativos (sem JavaScript).
// Respostas de pagamento e domínio aprovadas pelo chefe em 08/10/2026.

const PERGUNTAS: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Os exemplos do site são de clientes?",
    resposta:
      "Não. São modelos que eu fiz para mostrar como fica. O seu é feito do zero, com o nome, as cores e os serviços do seu negócio.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "Depende do tamanho do projeto. O prazo vem escrito no orçamento, antes de você decidir.",
  },
  {
    pergunta: "Como é o pagamento?",
    resposta: "Uma parte para começar e o restante na entrega. Os detalhes ficam no orçamento.",
  },
  {
    pergunta: "Preciso pagar hospedagem e domínio?",
    resposta:
      "O endereço (domínio) custa por ano e fica no seu nome. Eu te ajudo a registrar e explico cada custo antes.",
  },
  {
    pergunta: "E se eu quiser mudar algo depois?",
    resposta:
      "Ajustes durante a construção estão inclusos. Depois da entrega, mudanças novas são combinadas à parte.",
  },
];

export default function Faq() {
  return (
    <section id="perguntas" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
          Perguntas frequentes
        </h2>
        <div className="mt-12 max-w-[800px] border-t border-linha">
          {PERGUNTAS.map((p) => (
            <details key={p.pergunta} className="group border-b border-linha">
              <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-6 py-5">
                <h3 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-tinta">
                  {p.pergunta}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  className="faq-icone h-6 w-6 shrink-0 text-tinta"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-[60ch] pb-6 text-[16px] leading-[1.6] text-grafite sm:text-[17px]">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
