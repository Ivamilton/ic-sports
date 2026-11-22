import { lojaConfig } from "@/config/loja";

export interface DadosPedidoWhatsApp {
  nome: string;
  versao: string;
  tamanho?: string;
  preco?: number;
}

export interface ItemPedidoCarrinho {
  id: string;
  nome: string;
  versao: string;
  tamanho: string;
  quantidade: number;
  preco: number;
}

export function gerarLinkWhatsAppProduto({
  nome,
  versao,
  tamanho,
  preco,
}: DadosPedidoWhatsApp): string {
  const numero = lojaConfig.whatsapp.replace(/\D/g, "");

  const tamanhoStr = tamanho ? `tamanho [${tamanho}]` : "tamanho a combinar";
  const precoStr = preco
    ? ` por ${preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
    : "";

  const mensagem = `Ola! Quero a camisa ${nome}, versao ${versao}, ${tamanhoStr}${precoStr}. Ela esta disponivel?`;

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function gerarLinkWhatsAppCarrinho(itens: ItemPedidoCarrinho[]): string {
  const numero = lojaConfig.whatsapp.replace(/\D/g, "");
  const formatarBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  if (itens.length === 0) {
    return `https://wa.me/${numero}?text=${encodeURIComponent("Ola! Gostaria de consultar o catalogo da IF Legacy.")}`;
  }

  const linhasItens = itens
    .map(
      (item) =>
        `- ${item.quantidade}x ${item.nome} (${item.versao}) - Tam: ${item.tamanho} - ${formatarBRL(item.preco * item.quantidade)}`
    )
    .join("\n");

  const mensagem =
    `Ola! Gostaria de finalizar o meu pedido na *IF Legacy - Moda Esportiva*:\n\n` +
    `*ITENS DO PEDIDO:*\n${linhasItens}\n\n` +
    `*VALOR TOTAL:* ${formatarBRL(total)}\n\n` +
    `Por favor, como combinamos a entrega e o pagamento?`;

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function gerarLinkWhatsAppGeral(
  assunto = "Ola! Gostaria de tirar duvidas sobre as camisas da IF Legacy."
): string {
  const numero = lojaConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(assunto)}`;
}
