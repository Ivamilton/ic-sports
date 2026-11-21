"use client";

import { MessageCircle } from "lucide-react";
import { Produto } from "@/lib/getProducts";
import { gerarLinkWhatsAppProduto } from "@/lib/whatsapp";

interface BotaoComprarWhatsappProps {
  produto: Produto;
  tamanhoSelecionado: string | null;
  desabilitado?: boolean;
}

export function BotaoComprarWhatsapp({
  produto,
  tamanhoSelecionado,
  desabilitado = false,
}: BotaoComprarWhatsappProps) {
  const precoAtual = produto.preco_promocional || produto.preco;

  const url = gerarLinkWhatsAppProduto({
    nome: produto.nome,
    versao: produto.categoria,
    tamanho: tamanhoSelecionado || undefined,
    preco: precoAtual,
  });

  if (desabilitado) {
    return (
      <button
        disabled
        className="w-full py-4 px-6 rounded-2xl bg-[#E5E5E5] text-[#888888] font-bold text-base cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2"
      >
        <span>Produto Esgotado</span>
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all flex items-center justify-center gap-3 cursor-pointer group hover:scale-101 active:scale-98 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
      <span>Comprar no WhatsApp</span>
    </a>
  );
}
