import { StatusBar } from "@/components/phone/Phone";
import { slug } from "@/lib/texto";
import type { Modelo } from "./seu-negocio-dados";

/*
 * Tela do app-modelo, em peças para compor:
 *   <AppTela cor>
 *     <AppTopo nome cor />
 *     <AppMiolo modelo cor />     (a seção 5 envolve o miolo em AnimatePresence)
 *   </AppTela>
 * `AppModelo` junta tudo, para usos estáticos.
 */

export function AppTela({ children }: { children: React.ReactNode }) {
  return <div className="absolute inset-0 flex flex-col bg-cinza-papel">{children}</div>;
}

export function AppTopo({ nome, cor }: { nome: string; cor: string }) {
  const endereco = `${slug(nome) || "seunegocio"}.stabeli.com.br`;
  return (
    <div className="cor-transicao px-4 pb-5 text-white" style={{ backgroundColor: cor }}>
      <StatusBar claro />
      <p className="mx-auto mt-4 w-fit max-w-full truncate rounded-full bg-white/15 px-3 py-1 text-[12px] text-white">
        {endereco}
      </p>
      <div className="mt-4 flex items-start gap-3">
        <span
          className="cor-transicao flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[17px] font-bold"
          style={{ color: cor }}
        >
          {(nome.trim()[0] || "S").toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="line-clamp-2 break-words text-[18px] font-bold leading-tight">{nome}</p>
          <p className="mt-0.5 text-[12px] text-white/80">Aberto agora</p>
        </div>
      </div>
    </div>
  );
}

export function AppMiolo({ modelo, cor }: { modelo: Modelo; cor: string }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-4 pt-3">
      <ul className="space-y-2">
        {modelo.itens.map(([nome, detalhe]) => (
          <li key={nome} className="flex items-center gap-2 rounded-2xl bg-white p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-tinta">{nome}</p>
              <p className="truncate text-[12px] text-grafite">{detalhe}</p>
            </div>
            <span
              className="cor-transicao shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-white"
              style={{ backgroundColor: cor }}
            >
              {modelo.acaoItem}
            </span>
          </li>
        ))}
      </ul>
      <span
        className="cor-transicao mt-auto block rounded-2xl py-3 text-center text-[14px] font-semibold text-white"
        style={{ backgroundColor: cor }}
      >
        {modelo.botao}
      </span>
    </div>
  );
}

export function AppModelo({ modelo, nome, cor }: { modelo: Modelo; nome: string; cor: string }) {
  return (
    <AppTela>
      <AppTopo nome={nome} cor={cor} />
      <AppMiolo modelo={modelo} cor={cor} />
    </AppTela>
  );
}
