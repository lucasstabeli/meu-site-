const stats = [
  { number: "100%", label: "Compromisso com entrega" },
  { number: "24h",  label: "Tempo de resposta" },
  { number: "∞",    label: "Revisões até você amar" },
];

export default function Stats() {
  return (
    <section id="stats" className="py-[120px] px-12 bg-black text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-[900px] mx-auto text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[clamp(48px,6vw,72px)] font-extrabold tracking-[-3px] leading-none text-white">
              {s.number}
            </div>
            <div className="text-[15px] text-white/40 mt-2.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
