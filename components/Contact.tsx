"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/phone/Phone";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";
import { multiLine, singleLine } from "@/lib/texto";
import { REDUZIR_QUERY } from "@/lib/useDesktopMotion";

// Chave publica do Web3Forms: por design ela so permite enviar e-mail para o dono
// (nao le mensagens nem muda configuracoes). Nao e segredo; num site estatico nao
// da para esconde-la. A protecao contra abuso fica no honeypot, nas validacoes
// abaixo e no painel do Web3Forms (restricao de dominio / filtro de spam).
const WEB3FORMS_ACCESS_KEY = "013b4ac4-0095-4c9d-9753-a053526d8584";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Lista branca usada na validacao: servico fora dela vira "Novo contato".
const SERVICES = [
  "Landing page",
  "Site",
  "Aplicativo",
  "Sistema sob medida",
  "Banco de dados e integrações",
  "Outro",
] as const;

const LIMITS = { name: 100, email: 254, message: 5000 } as const;
const MIN_MESSAGE = 10;
// Humanos levam mais que isso para preencher o formulario; bots enviam na hora.
const MIN_FILL_MS = 3000;
// Intervalo minimo entre dois envios a partir deste navegador.
const COOLDOWN_MS = 30_000;
const LAST_SENT_KEY = "contact:lastSent";

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[a-zA-Z]{2,}$/;

const EMAIL_CONTATO = "stabeli.studio@gmail.com";
const ERRO_REDE = `Não foi possível enviar. Confira sua conexão e tente de novo, ou escreva para ${EMAIL_CONTATO}.`;

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
  const [prefilled, setPrefilled] = useState(false);
  const sendingRef = useRef(false);
  const mountedAtRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  // Pre-preenchimento vindo do bloco "Veja o seu negocio aqui" (lib/prefill.ts).
  // So coloca valores nos campos (formulario nao controlado) e leva o foco ate eles:
  // NADA e enviado sozinho. A pessoa ainda digita nome/e-mail e clica em enviar.
  useEffect(() => {
    function onPrefill(e: Event) {
      const detail = (e as CustomEvent<Prefill>).detail;
      const form = formRef.current;
      if (!detail) return;
      const reduzir = window.matchMedia(REDUZIR_QUERY).matches;
      sectionRef.current?.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
      // Pedido já enviado: o formulário não está na tela; só leva a pessoa até o contato.
      if (!form) return;
      const service = form.elements.namedItem("service") as HTMLSelectElement | null;
      const message = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (service && (SERVICES as readonly string[]).includes(detail.servico)) service.value = detail.servico;
      if (message) message.value = multiLine(String(detail.mensagem)).slice(0, LIMITS.message);
      setPrefilled(true);

      const primeiroVazio = (["name", "email", "message"] as const)
        .map((n) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)
        .find((el) => el && !el.value.trim());
      (primeiroVazio ?? service)?.focus({ preventScroll: true });
    }
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
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
      if (res.ok && json?.success) {
        // So conta o intervalo depois de um envio que deu certo; se falhou,
        // a pessoa pode tentar de novo na hora, como a mensagem de erro sugere.
        writeLastSent(Date.now());
        setSubmitted(true);
      } else {
        setError(ERRO_REDE);
      }
    } catch {
      setError(ERRO_REDE);
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <section id="contato" ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-[640px]">
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
            Conta o que você precisa
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-grafite sm:text-[17px]">
            Eu leio cada pedido e respondo com prazo e preço.
          </p>

          {/* Região sempre presente no DOM (sem display:none) para o leitor de tela anunciar o aviso. */}
          <div aria-live="polite">
            {prefilled && !submitted ? (
              <p className="mt-8 rounded-[14px] border border-planta px-4 py-3 text-[15px] leading-[1.5] text-tinta">
                Preenchi o pedido com o modelo que você montou. Confira, coloque seu nome e e-mail e envie.
              </p>
            ) : null}
          </div>

          {!submitted ? (
            <form ref={formRef} method="post" onSubmit={handleSubmit} className="mt-12 space-y-5">
              {/* Honeypot anti-spam do Web3Forms: escondido de pessoas, leitores de tela e teclado. */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off"
                aria-hidden="true" style={{ display: "none" }} defaultChecked={false} />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label htmlFor="contato-nome" className={rotulo}>Seu nome</label>
                  <input id="contato-nome" name="name" type="text" placeholder="Digite seu nome" required
                    autoComplete="name" minLength={2} maxLength={LIMITS.name} className={campo} />
                </div>
                <div>
                  <label htmlFor="contato-email" className={rotulo}>E-mail</label>
                  <input id="contato-email" name="email" type="email" placeholder="seu@email.com" required
                    autoComplete="email" maxLength={LIMITS.email} className={campo} />
                </div>
              </div>
              <div>
                <label htmlFor="contato-servico" className={rotulo}>O que você precisa?</label>
                <div className="relative">
                  <select id="contato-servico" name="service" defaultValue="" className={`${campo} appearance-none pr-12`}>
                    <option value="">Selecione um serviço</option>
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5}
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div>
                <label htmlFor="contato-mensagem" className={rotulo}>Conta mais sobre o projeto</label>
                <textarea id="contato-mensagem" name="message"
                  placeholder="Me fala sobre seu negócio, o que você precisa e qual o prazo..." required
                  minLength={MIN_MESSAGE} maxLength={LIMITS.message}
                  className={`${campo} h-[160px] resize-y`} />
              </div>
              {error && <p role="alert" className="text-[15px] leading-[1.5] text-erro">{error}</p>}
              <button type="submit" disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-planta px-6 text-[16px] font-semibold text-white
                           transition-colors hover:bg-planta-escuro disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {loading ? "Enviando..." : "Pedir orçamento"}
              </button>
            </form>
          ) : (
            <div className="mt-12 rounded-[24px] bg-cinza-papel px-6 py-10 sm:px-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-planta text-white">
                <CheckIcon className="h-6 w-6" strokeWidth={3} />
              </span>
              <h3 className="mt-5 text-[24px] font-bold tracking-[-0.01em] text-tinta">Pedido enviado</h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-grafite">Vou responder no e-mail que você deixou.</p>
            </div>
          )}

          <p className="mt-8 text-[15px] leading-[1.6] text-grafite">
            Prefere e-mail? Escreva para{" "}
            <a href={`mailto:${EMAIL_CONTATO}`} className="font-semibold text-planta underline underline-offset-4 hover:text-planta-escuro">
              {EMAIL_CONTATO}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

const rotulo = "mb-2 block text-[15px] font-medium text-tinta";
const campo =
  "w-full rounded-[14px] border border-transparent bg-cinza-papel px-[18px] py-[14px] text-[16px] text-tinta " +
  "placeholder:text-grafite transition-colors focus:border-tinta focus:bg-white " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-planta";
