const steps = [
  { num: "01 — Briefing",       title: "Entendo o que você precisa",          desc: "Você me conta sobre o projeto, o público-alvo e o que espera do resultado." },
  { num: "02 — Proposta",       title: "Envio um orçamento transparente",      desc: "Sem enrolação. Prazo, preço e o que será entregue, tudo detalhado." },
  { num: "03 — Desenvolvimento",title: "Construo com você acompanhando",       desc: "Você recebe atualizações e pode pedir ajustes durante o processo." },
  { num: "04 — Entrega",        title: "Projeto no ar e funcionando",          desc: "Entrego o código, ajudo a publicar e fico disponível pra suporte." },
];

export default function Process() {
  return (
    <section id="process" className="py-[120px] px-12 bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">
          Como funciona
        </p>
        <h2 className="text-[clamp(34px,4.5vw,54px)] font-bold tracking-[-2px] leading-[1.1] text-black max-w-[680px] mb-16">
          Do contato à entrega em 4 passos simples.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-black/10">
          {steps.map((s) => (
            <div key={s.num} className="px-8 py-10 first:pl-0 last:pr-0">
              <div className="text-[11px] font-bold tracking-[2px] uppercase text-neutral-500 mb-5">{s.num}</div>
              <h3 className="text-[19px] font-semibold tracking-[-0.5px] mb-2.5">{s.title}</h3>
              <p className="text-sm text-neutral-500 leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
