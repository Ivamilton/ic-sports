"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const formatarBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CartDrawer() {
  const {
    itens,
    totalItens,
    subtotal,
    carrinhoAberto,
    fecharCarrinho,
    atualizarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    linkWhatsAppCheckout,
  } = useCart();

  // Fecha o drawer ao apertar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && carrinhoAberto) {
        fecharCarrinho();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [carrinhoAberto, fecharCarrinho]);

  // Evita scroll da página de fundo quando aberto
  useEffect(() => {
    if (carrinhoAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [carrinhoAberto]);

  if (!carrinhoAberto) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end" role="dialog" aria-modal="true" aria-label="Carrinho de compras">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={fecharCarrinho}
        aria-hidden="true"
      />

      {/* Conteúdo do Drawer */}
      <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in-right">
        {/* Cabeçalho do Carrinho */}
        <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white text-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} className="text-[#0A0A0A]" aria-hidden="true" />
            <h2 className="font-athletic text-2xl sm:text-3xl font-black uppercase tracking-wide">
              Seu Carrinho
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white text-[11px] font-black">
              {totalItens}
            </span>
          </div>

          <button
            onClick={fecharCarrinho}
            aria-label="Fechar carrinho"
            className="p-2 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Lista de Itens do Carrinho */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#F0F0F0]">
          {itens.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#F5F5F5] border border-dashed border-[#D4D4D4] flex items-center justify-center text-[#737373]">
                <ShoppingBag size={36} aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
                  Seu carrinho está vazio
                </p>
                <p className="text-xs text-[#737373] max-w-xs">
                  Navegue pelo catálogo e escolha seus mantos favoritos com tamanho para adicionar aqui.
                </p>
              </div>
              <Link
                href="/camisas"
                onClick={fecharCarrinho}
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                <span>Ver Catálogo</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            itens.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 items-start">
                {/* Miniatura do Manto */}
                <div className="relative w-20 h-20 rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] shrink-0 overflow-hidden flex items-center justify-center p-1.5">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Detalhes do Item */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/produto/${item.slug}`}
                      onClick={fecharCarrinho}
                      className="font-bold text-xs sm:text-sm text-[#0A0A0A] hover:text-[#525252] transition-colors line-clamp-1 leading-snug"
                    >
                      {item.nome}
                    </Link>
                    <button
                      onClick={() => removerDoCarrinho(item.id)}
                      aria-label={`Remover ${item.nome} do carrinho`}
                      className="text-[#A3A3A3] hover:text-[#DC2626] transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>

                  {/* Badges de Versão e Tamanho */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#737373]">
                    <span className="px-2 py-0.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-md border border-[#E5E5E5]">
                      {item.versao}
                    </span>
                    <span className="px-2 py-0.5 bg-[#0A0A0A] text-white rounded-md font-bold">
                      Tam: {item.tamanho}
                    </span>
                  </div>

                  {/* Preço e Controle de Quantidade */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-athletic text-lg font-black text-[#0A0A0A]">
                      {formatarBRL(item.preco * item.quantidade)}
                    </span>

                    <div className="flex items-center border border-[#E5E5E5] rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                        aria-label="Diminuir quantidade"
                        className="p-1.5 text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        <Minus size={13} aria-hidden="true" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#0A0A0A] select-none min-w-[24px] text-center">
                        {item.quantidade}
                      </span>
                      <button
                        type="button"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        aria-label="Aumentar quantidade"
                        disabled={item.quantidade >= item.estoqueMaximo}
                        title={item.quantidade >= item.estoqueMaximo ? "Quantidade máxima disponível" : "Aumentar quantidade"}
                        className="p-1.5 text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors cursor-pointer disabled:text-[#C0C0C0] disabled:cursor-not-allowed disabled:hover:bg-white"
                      >
                        <Plus size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com Subtotal e Botão de WhatsApp */}
        {itens.length > 0 && (
          <div className="p-5 border-t border-[#E5E5E5] bg-[#FAFAFA] space-y-4">
            {/* Bloco de Totais */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs text-[#737373] font-semibold">
                <span>Subtotal ({totalItens} {totalItens === 1 ? "manto" : "mantos"})</span>
                <span>{formatarBRL(subtotal)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-[#E5E5E5] pt-2">
                <span className="font-athletic text-xl font-bold uppercase text-[#0A0A0A]">Total do Pedido:</span>
                <span className="font-athletic text-3xl font-black text-[#0A0A0A]">
                  {formatarBRL(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Entrega local e pagamento (Pix ou Cartão) alinhados diretamente no WhatsApp.
              </p>
            </div>

            {/* Botão de Finalização no WhatsApp */}
            <a
              href={linkWhatsAppCheckout}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-101 active:scale-98"
            >
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span>Finalizar Pedido no WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs font-semibold text-[#737373] pt-1">
              <button
                type="button"
                onClick={fecharCarrinho}
                className="hover:text-[#0A0A0A] underline underline-offset-2 cursor-pointer"
              >
                Continuar comprando
              </button>
              <button
                type="button"
                onClick={limparCarrinho}
                className="hover:text-[#DC2626] transition-colors cursor-pointer"
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
