"use client";

import { useEffect, useRef, useState } from "react";

// Chave publica do Web3Forms: por design ela so permite enviar e-mail para o dono
// (nao le mensagens nem muda configuracoes). Nao e segredo; num site estatico nao
// da para esconde-la. A protecao contra abuso fica no honeypot, nas validacoes
// abaixo e no painel do Web3Forms (restricao de dominio / filtro de spam).
const WEB3FORMS_ACCESS_KEY = "013b4ac4-0095-4c9d-9753-a053526d8584";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const SERVICES = ["Site Profissional", "Aplicativo Mobile", "Landing Page", "Outro"] as const;

const LIMITS = { name: 100, email: 254, message: 5000 } as const;
const MIN_MESSAGE = 10;
// Humanos levam mais que isso para preencher o formulario; bots enviam na hora.
const MIN_FILL_MS = 3000;
// Intervalo minimo entre dois envios a partir deste navegador.
const COOLDOWN_MS = 30_000;
const LAST_SENT_KEY = "contact:lastSent";

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[a-zA-Z]{2,}$/;

/** Remove caracteres de controle (inclui quebras de linha) e espacos repetidos. */
function singleLine(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Mantem quebras de linha, mas tira outros caracteres de controle. */
function multiLine(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function readLastSent(): number {
  try {
    return Number(window.sessionStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeLastSent(ts: number) {
  try {
    window.sessionStorage.setItem(LAST_SENT_KEY, String(ts));
  } catch {
    /* sessionStorage indisponivel: segue so com a trava em memoria */
  }
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sendingRef = useRef(false);
  const mountedAtRef = useRef(0);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Trava contra clique duplo / envio repetido enquanto um envio esta em andamento.
    if (sendingRef.current) return;

    const form = e.currentTarget;
    const field = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value ?? "";

    // Honeypot: campo invisivel para pessoas; se vier marcado, e robo.
    // Finge sucesso para nao ensinar o robo a contornar.
    const botcheck = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked ?? false;
    if (botcheck) {
      setSubmitted(true);
      return;
    }

    const now = Date.now();
    if (mountedAtRef.current && now - mountedAtRef.current < MIN_FILL_MS) {
      setError("Calma! Revise sua mensagem e tente de novo em alguns segundos.");
      return;
    }
    const wait = readLastSent() + COOLDOWN_MS - now;
    if (wait > 0) {
      setError(`Aguarde ${Math.ceil(wait / 1000)}s antes de enviar outra mensagem.`);
      return;
    }

    const name = singleLine(field("name")).slice(0, LIMITS.name);
    const email = singleLine(field("email"));
    const message = multiLine(field("message"));
    const rawService = field("service");
    const service = (SERVICES as readonly string[]).includes(rawService) ? rawService : "Novo contato";

    if (name.length < 2) {
      setError("Informe seu nome.");
      return;
    }
    if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (message.length < MIN_MESSAGE) {
      setError("Conte um pouco mais sobre o projeto (mínimo de 10 caracteres).");
      return;
    }
    if (message.length > LIMITS.message) {
      setError(`A mensagem pode ter no máximo ${LIMITS.message} caracteres.`);
      return;
    }

    sendingRef.current = true;
    setLoading(true);
    setError("");

    const data = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: name,
      email,
      subject: `[Stabeli Studio] ${service}`,
      message,
      botcheck: false,
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
        referrerPolicy: "strict-origin-when-cross-origin",
      });
      const json = await res.json().catch(() => null);
      writeLastSent(Date.now());
      if (res.ok && json?.success) {
        setSubmitted(true);
      } else {
        setError("Algo deu errado. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      sendingRef.current = false;
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
            {/* Honeypot anti-spam do Web3Forms: escondido de pessoas, leitores de tela e teclado. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off"
              aria-hidden="true" style={{ display: "none" }} defaultChecked={false} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Seu nome</label>
                <input name="name" type="text" placeholder="Digite seu nome" required
                  autoComplete="name" minLength={2} maxLength={LIMITS.name}
                  className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px]
                             border border-transparent outline-none
                             focus:border-black focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <input name="email" type="email" placeholder="seu@email.com" required
                  autoComplete="email" maxLength={LIMITS.email}
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
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Conta mais sobre o projeto</label>
              <textarea name="message" placeholder="Me fala sobre seu negócio, o que você precisa e qual o prazo..." required
                minLength={MIN_MESSAGE} maxLength={LIMITS.message}
                className="w-full px-[18px] py-[14px] text-base bg-[#f5f5f7] rounded-[14px] h-[140px] resize-y
                           border border-transparent outline-none
                           focus:border-black focus:bg-white transition-all" />
            </div>
            {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}
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
