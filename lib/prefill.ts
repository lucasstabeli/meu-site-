// Pré-preenchimento do formulário de contato a partir do bloco "Veja o seu negócio aqui".
// Tudo acontece no navegador: nada vai para URL, localStorage, cookie ou servidor,
// e nada é enviado sozinho (a pessoa ainda preenche nome/e-mail e clica em enviar).

export type Prefill = {
  servico: "Site" | "Aplicativo" | "Sistema sob medida";
  mensagem: string;
};

export const PREFILL_EVENT = "stabeli:prefill";

export function pedirPrefill(p: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: p }));
}
