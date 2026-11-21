export const lojaConfig = {
  nomeLoja: "IC Sports",
  responsavel: "Ítalo Cauan",
  // Coloque o número do WhatsApp da loja (apenas números com DDI + DDD)
  whatsapp: "5581999999999", 
  instagram: "@icsports.oficial",
  email: "contato@icsports.com.br",
  cidade: "Recife - PE",
  fusoHorario: "America/Fortaleza",
  horarioAtendimento: {
    semana: "Segunda a Sexta das 09:00 às 19:00",
    sabado: "Sábado das 09:00 às 14:00",
    domingo: "Domingo fechado (pedidos recebidos serão respondidos na segunda)",
    horaAberturaSemana: 9,
    horaFechamentoSemana: 19,
    horaAberturaSabado: 9,
    horaFechamentoSabado: 14,
  },
  formasPagamento: [
    "Pix com 5% de desconto",
    "Cartão de Crédito em até 12x",
    "Link de Pagamento Seguro"
  ],
  prazoEntrega: "Pronta Entrega: postagem em até 24h. Encomendas: 7 a 15 dias úteis com rastreio Correios.",
  // Se quiser sincronizar com o Google Sheets, coloque a URL CSV publicada aqui:
  planilhaCsvUrl: "",
};
