import { lojaConfig } from "@/config/loja";

export interface DadosPedidoWhatsApp {
  nome: string;
  versao: string;
  tamanho?: string;
  preco?: number;
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

  // Mensagem solicitada: "Olá! Quero a camisa [nome do produto], versão [torcedor/jogador], tamanho [M]. Ela está disponível?"
  const mensagem = `Olá! Quero a camisa ${nome}, versão ${versao}, ${tamanhoStr}${precoStr}. Ela está disponível?`;

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function gerarLinkWhatsAppGeral(assunto = "Olá! Gostaria de tirar dúvidas sobre as camisas da IC Sports."): string {
  const numero = lojaConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(assunto)}`;
}
