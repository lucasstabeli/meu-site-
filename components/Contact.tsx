"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      access_key: "013b4ac4-0095-4c9d-9753-a053526d8584",
      from_name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: `[Stabeli Studio] ${(form.elements.namedItem("service") as HTMLSelectElement).value || "Novo contato"}`,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Algo deu errado. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-[120px] px-12 bg-white">
      <div className="max-w-[620px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-neutral-500 mb-4">
          Contato
        </p>
        <h2 className="text-[clamp(34px,4.5vw,54px)] font-bold tracking-[-2px] leading-[1.1] text-black max-w-[680px] mb-16">
          Vamos construir algo incrível juntos?
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Seu nome</label>
                <input name="name" type="text" placeholder="Digite seu nome" required
                  className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px]
                             border border-transparent outline-none
                             focus:border-black focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <input name="email" type="email" placeholder="seu@email.com" required
                  className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px]
                             border border-transparent outline-none
                             focus:border-black focus:bg-white transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">O que você precisa?</label>
              <select name="service" className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px]
                                 border border-transparent outline-none appearance-none
                                 focus:border-black focus:bg-white transition-all">
                <option value="">Selecione um serviço</option>
                <option>Site Profissional</option>
                <option>Aplicativo Mobile</option>
                <option>Landing Page</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Conta mais sobre o projeto</label>
              <textarea name="message" placeholder="Me fala sobre seu negócio, o que você precisa e qual o prazo..." required
                className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px] h-[140px] resize-y
                           border border-transparent outline-none
                           focus:border-black focus:bg-white transition-all" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-4 text-base font-semibold text-white bg-black rounded-[14px]
                         hover:bg-neutral-800 hover:scale-[1.01] transition-all duration-200 mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
              {loading ? "Enviando..." : "Enviar mensagem →"}
            </button>
          </form>
        ) : (
          <div className="text-center py-12 px-8 bg-[#f5f5f7] rounded-3xl">
            <div className="text-[52px] mb-5">✅</div>
            <h3 className="text-2xl font-bold tracking-[-0.5px] mb-2">Mensagem enviada!</h3>
            <p className="text-neutral-500 text-[15px]">Obrigado pelo contato. Vou te responder em até 24h.</p>
          </div>
        )}
      </div>
    </section>
  );
}
