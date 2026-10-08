const NEGOCIOS = ["barbearias", "salões", "clínicas", "restaurantes", "lojas", "academias"];

export default function ParaQuem() {
  return (
    <section aria-label="Para quem eu faço" className="border-y border-linha bg-white py-6">
      <p className="mx-auto max-w-[1200px] px-5 text-[18px] leading-[1.5] text-grafite sm:px-8 lg:px-12">
        Feito para{" "}
        {NEGOCIOS.map((n, i) => (
          <span key={n}>
            <span className="text-tinta">{n}</span>
            {i < NEGOCIOS.length - 2 ? ", " : i === NEGOCIOS.length - 2 ? " e " : "."}
          </span>
        ))}
      </p>
    </section>
  );
}
