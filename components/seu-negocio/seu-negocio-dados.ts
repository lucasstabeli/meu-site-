// Modelos da seção "Veja o seu negócio aqui". Sem preços dentro dos modelos
// (para não confundir com os preços do estúdio). Cores com texto branco >= 4,5:1
// e nenhuma parecida com o Azul Planta.

export const CORES = [
  { id: "vinho", nome: "Vinho", hex: "#8C2F39" },
  { id: "verde", nome: "Verde", hex: "#0F766E" },
  { id: "laranja", nome: "Laranja", hex: "#C2410C" },
  { id: "grafite", nome: "Grafite", hex: "#2B2B30" },
] as const;

export type CorId = (typeof CORES)[number]["id"];

export type Modelo = {
  id: string;
  tipo: string; // rótulo da pílula
  modelo: "agenda online" | "cardápio digital" | "catálogo com pedidos" | "agenda de aulas";
  tipoCurto: string; // "agenda", "cardápio"... usado no resumo para leitor de tela
  nomePadrao: string;
  cor: CorId;
  itens: readonly [string, string][]; // [nome, detalhe]
  acaoItem: "+" | "Escolher";
  botao: string;
  faz: readonly string[];
};

const FAZ_AGENDA = [
  "Cliente escolhe serviço, dia e horário.",
  "Você vê a agenda do dia no celular.",
  "Lembrete antes do horário.",
] as const;

export const MODELOS: readonly Modelo[] = [
  {
    id: "barbearia",
    tipo: "Barbearia",
    modelo: "agenda online",
    tipoCurto: "agenda",
    nomePadrao: "Sua Barbearia",
    cor: "vinho",
    itens: [["Corte", "30 min"], ["Barba", "20 min"], ["Corte e barba", "50 min"]],
    acaoItem: "Escolher",
    botao: "Agendar horário",
    faz: FAZ_AGENDA,
  },
  {
    id: "salao",
    tipo: "Salão de beleza",
    modelo: "agenda online",
    tipoCurto: "agenda",
    nomePadrao: "Seu Salão",
    cor: "vinho",
    itens: [["Corte", "45 min"], ["Escova", "40 min"], ["Manicure", "45 min"]],
    acaoItem: "Escolher",
    botao: "Agendar horário",
    faz: FAZ_AGENDA,
  },
  {
    id: "clinica",
    tipo: "Clínica",
    modelo: "agenda online",
    tipoCurto: "agenda",
    nomePadrao: "Sua Clínica",
    cor: "verde",
    itens: [["Consulta", "30 min"], ["Retorno", "20 min"], ["Avaliação", "40 min"]],
    acaoItem: "Escolher",
    botao: "Marcar consulta",
    faz: [
      "Paciente marca e remarca sozinho.",
      "Horários livres sempre atualizados.",
      "Confirmação na hora.",
    ],
  },
  {
    id: "restaurante",
    tipo: "Restaurante",
    modelo: "cardápio digital",
    tipoCurto: "cardápio",
    nomePadrao: "Seu Restaurante",
    cor: "laranja",
    itens: [["Prato do dia", "Arroz, feijão e salada"], ["Hambúrguer da casa", "Com batata"], ["Suco natural", "500 ml"]],
    acaoItem: "+",
    botao: "Fazer pedido",
    faz: [
      "Cardápio no QR code da mesa.",
      "Pedido chega organizado para a cozinha.",
      "Você muda o cardápio quando quiser.",
    ],
  },
  {
    id: "loja",
    tipo: "Loja",
    modelo: "catálogo com pedidos",
    tipoCurto: "catálogo",
    nomePadrao: "Sua Loja",
    cor: "grafite",
    itens: [["Camiseta básica", "P ao GG"], ["Tênis casual", "34 ao 44"], ["Boné", "Tamanho único"]],
    acaoItem: "+",
    botao: "Ver carrinho",
    faz: [
      "Vitrine aberta 24 horas.",
      "Cliente monta o pedido sozinho.",
      "Pedido chega pronto para você confirmar.",
    ],
  },
  {
    id: "academia",
    tipo: "Academia",
    modelo: "agenda de aulas",
    tipoCurto: "agenda de aulas",
    nomePadrao: "Sua Academia",
    cor: "verde",
    itens: [["Funcional", "7h"], ["Pilates", "12h"], ["Musculação", "Livre"]],
    acaoItem: "Escolher",
    botao: "Reservar aula",
    faz: [
      "Aluno reserva a aula pelo celular.",
      "Você vê quem vem em cada turma.",
      "Aviso quando a turma lota.",
    ],
  },
];

export const corHex = (id: CorId) => CORES.find((c) => c.id === id)!.hex;
export const corNome = (id: CorId) => CORES.find((c) => c.id === id)!.nome;
