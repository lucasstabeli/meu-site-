const ITEMS = [
  "Sites Profissionais", "Apps Mobile", "Landing Pages",
  "React Native", "Design Moderno", "Alta Performance", "SEO Otimizado",
];

function Track() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-16">
          <span className="text-sm font-medium tracking-[1px] uppercase whitespace-nowrap text-white/35">
            {item}
          </span>
          <span className="text-white/15">·</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="bg-black py-7 overflow-hidden">
      <div className="flex gap-16 w-max animate-[marquee_20s_linear_infinite]">
        <Track />
        <Track />
      </div>
    </div>
  );
}
