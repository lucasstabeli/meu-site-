const services = [
  {
    icon: "🌐",
    title: "Sites Profissionais",
    desc: "Landing pages, sites institucionais e portfólios com design moderno, responsivo e otimizado pra aparecer no Google.",
    price: "A partir de R$ 800",
  },
  {
    icon: "📱",
    title: "Aplicativos Mobile",
    desc: "Apps Android e iOS com React Native. Do protótipo à publicação na loja, seu app rodando em qualquer celular.",
    price: "A partir de R$ 2.500",
  },
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "Páginas de alta conversão pensadas pra vender seu produto ou serviço. Rápidas, bonitas e persuasivas.",
    price: "A partir de R$ 500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-[120px] px-12 bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">
          O que fazemos
        </p>
        <h2 className="text-[clamp(34px,4.5vw,54px)] font-bold tracking-[-2px] leading-[1.1] text-black max-w-[680px] mb-16">
          Soluções digitais sob medida pra você.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-3xl p-10 transition-all duration-300
                         hover:-translate-y-2.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-7 text-[26px]">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.5px] mb-3">{s.title}</h3>
              <p className="text-sm text-neutral-500 leading-[1.65]">{s.desc}</p>
              <span className="inline-block mt-7 text-sm font-semibold text-black bg-[#f5f5f7] px-3.5 py-1.5 rounded-full">
                {s.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
