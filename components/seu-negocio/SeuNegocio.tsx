"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckIcon, Phone } from "@/components/phone/Phone";
import { pedirPrefill } from "@/lib/prefill";
import { singleLine } from "@/lib/texto";
import { useReduzirMovimento } from "@/lib/useDesktopMotion";
import { AppMiolo, AppTela, AppTopo } from "./AppModelo";
import { CORES, MODELOS, corHex, corNome, type CorId } from "./seu-negocio-dados";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_NOME = 32;
const DEBOUNCE_MS = 600;

const pilula =
  "flex min-h-[44px] cursor-pointer items-center rounded-full border border-borda-campo bg-white px-4 text-[15px] font-medium text-tinta transition-colors hover:border-tinta " +
  "peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-white " +
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-planta";

export default function SeuNegocio() {
  const reduzir = useReduzirMovimento();
  const [tipoId, setTipoId] = useState(MODELOS[0].id);
  const [nome, setNome] = useState("");
  const [nomeAnunciado, setNomeAnunciado] = useState("");
  // null = a pessoa ainda não escolheu cor: segue a cor padrão do tipo.
  const [corEscolhida, setCorEscolhida] = useState<CorId | null>(null);
  const debounce = useRef<number | undefined>(undefined);
  // Limpa o timer do anúncio se a seção sair da página.
  useEffect(() => () => window.clearTimeout(debounce.current), []);

  const modelo = MODELOS.find((x) => x.id === tipoId) ?? MODELOS[0];
  const corId = corEscolhida ?? modelo.cor;
  const cor = corHex(corId);
  const nomeLimpo = singleLine(nome).slice(0, MAX_NOME);
  const nomeTela = nomeLimpo || modelo.nomePadrao;
  const nomeResumo = singleLine(nomeAnunciado).slice(0, MAX_NOME) || modelo.nomePadrao;

  function mudarNome(valor: string) {
    setNome(valor);
    // Leitor de tela: só anuncia 600ms depois que a pessoa para de digitar.
    window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => setNomeAnunciado(valor), DEBOUNCE_MS);
  }

  function quero() {
    const tipo = modelo.tipo.toLowerCase();
    pedirPrefill({
      servico: "Site",
      mensagem: `Olá! Montei no site o modelo de ${modelo.modelo} para ${nomeLimpo || "o meu negócio"} (${tipo}) e quero um orçamento para algo assim.`,
    });
  }

  return (
    <section id="seu-negocio" className="bg-cinza-papel py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-tinta">
          Veja o seu negócio aqui
        </h2>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-grafite sm:text-[17px]">
          Modelos prontos para adaptar. Escolha o tipo de negócio, digite o nome e veja como ficaria. O que
          você digita não sai do seu navegador.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="order-1 flex flex-col gap-10 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <fieldset>
              <legend className="mb-4 text-[17px] font-semibold text-tinta">Qual é o seu negócio?</legend>
              <div className="flex flex-wrap gap-2">
                {MODELOS.map((x) => (
                  <div key={x.id}>
                    <input
                      type="radio"
                      name="tipo"
                      id={`tipo-${x.id}`}
                      value={x.id}
                      checked={tipoId === x.id}
                      onChange={() => setTipoId(x.id)}
                      className="peer sr-only"
                    />
                    <label htmlFor={`tipo-${x.id}`} className={pilula}>
                      {x.tipo}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="nome-negocio" className="mb-3 block text-[17px] font-semibold text-tinta">
                Como ele se chama?
              </label>
              <input
                id="nome-negocio"
                type="text"
                value={nome}
                onChange={(e) => mudarNome(e.target.value)}
                maxLength={MAX_NOME}
                autoComplete="organization"
                placeholder="Ex.: Barbearia do Zé"
                className="h-12 w-full max-w-[420px] rounded-[14px] border border-borda-campo bg-white px-4 text-[16px] text-tinta placeholder:text-grafite focus:border-tinta"
              />
            </div>

            <fieldset>
              <legend className="mb-3 text-[17px] font-semibold text-tinta">Cor do app</legend>
              <div className="flex gap-2">
                {CORES.map((c) => (
                  <div key={c.id}>
                    <input
                      type="radio"
                      name="cor"
                      id={`cor-${c.id}`}
                      value={c.id}
                      aria-label={c.nome}
                      checked={corId === c.id}
                      onChange={() => setCorEscolhida(c.id)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`cor-${c.id}`}
                      title={c.nome}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-planta peer-checked:[&>span]:ring-2 peer-checked:[&>span]:ring-tinta peer-checked:[&>span]:ring-offset-2 peer-checked:[&>span]:ring-offset-cinza-papel"
                    >
                      <span className="block h-8 w-8 rounded-full" style={{ backgroundColor: c.hex }} />
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="order-3 flex flex-col gap-10 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <div>
              <h3 className="text-[17px] font-semibold text-tinta">O que esse modelo faz</h3>
              <ul className="mt-3 space-y-2">
                {modelo.faz.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[16px] leading-[1.6] text-grafite sm:text-[17px]">
                    <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-planta" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={quero}
                className="inline-flex min-h-12 max-w-full items-center justify-center rounded-full bg-planta px-6 py-3 text-left text-[16px] font-semibold leading-tight text-white transition-colors hover:bg-planta-escuro"
              >
                {nomeLimpo ? `Quero um app assim para ${nomeLimpo}` : "Quero um app assim"}
              </button>
            </div>
          </div>

          <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="flex flex-col items-center lg:sticky lg:top-24">
              <div aria-hidden="true">
                <Phone className="w-[min(260px,72vw)] lg:w-[300px]">
                  <AppTela>
                    <AppTopo nome={nomeTela} cor={cor} />
                    <AnimatePresence mode="wait" initial={false}>
                      <m.div
                        key={modelo.id}
                        className="flex flex-1 flex-col"
                        initial={reduzir ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: reduzir ? 0 : 0.25, ease: EASE } }}
                        exit={reduzir ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE } }}
                      >
                        <AppMiolo modelo={modelo} cor={cor} />
                      </m.div>
                    </AnimatePresence>
                  </AppTela>
                </Phone>
              </div>
              <p className="mt-4 text-[13px] text-grafite">Modelo ilustrativo</p>
              <p className="sr-only" aria-live="polite">
                {`Prévia: app de ${modelo.tipoCurto} para ${nomeResumo}, cor ${corNome(corId).toLowerCase()}. Modelo ilustrativo.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
