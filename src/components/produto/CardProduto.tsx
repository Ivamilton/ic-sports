"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { Produto } from "@/lib/getProducts";
import { useCart } from "@/context/CartContext";

interface CardProdutoProps {
  produto: Produto;
  prioridade?: boolean;
}

const formatarBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CardProduto({ produto, prioridade = false }: CardProdutoProps) {
  const { adicionarAoCarrinho } = useCart();
  const imagemPrincipal = produto.imagens[0] || "/placeholder-shirt.svg";
  const [escolhendoTamanho, setEscolhendoTamanho] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [imagemExibida, setImagemExibida] = useState(imagemPrincipal);

  useEffect(() => {
    setImagemExibida(imagemPrincipal);
    setImagemCarregada(false);
  }, [imagemPrincipal]);

  const isEsgotado = produto.totalEstoque <= 0;
  const precoAtual = produto.preco_promocional || produto.preco;

  function handleSelecionarTamanho(tamanho: string) {
    adicionarAoCarrinho(produto, tamanho);
    setEscolhendoTamanho(false);
  }

  return (
    <div
      className={`motion-enter group relative bg-white rounded-2xl border border-[#E5E5E5] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-black ${
        isEsgotado ? "opacity-75" : ""
      }`}
    >
      {/* Imagem do Produto com Badges */}
      <div className="relative aspect-square w-full bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-3">
        <Link href={`/produto/${produto.slug}`} className="w-full h-full relative block">
          {!imagemCarregada && (
            <div className="skeleton absolute inset-2 rounded-xl" aria-hidden="true" />
          )}
          <Image
            src={imagemExibida}
            alt={produto.nome}
            fill
            loading={prioridade ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={prioridade}
            onLoad={() => setImagemCarregada(true)}
            onError={() => {
              setImagemExibida("/placeholder-shirt.svg");
              setImagemCarregada(true);
            }}
            className={`object-contain p-2 transition-all duration-300 ease-out group-hover:scale-[1.04] ${
              imagemCarregada ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Badges superiores de Versão */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {produto.categoria === "jogador" && (
            <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Jogador
            </span>
          )}
          {produto.categoria === "torcedor" && (
            <span className="px-2 py-0.5 bg-[#262626] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Torcedor
            </span>
          )}
          {produto.categoria === "retro" && (
            <span className="px-2 py-0.5 bg-[#525252] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Retro
            </span>
          )}
          {produto.categoria === "infantil" && (
            <span className="px-2 py-0.5 bg-[#737373] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Kids
            </span>
          )}
        </div>

        {/* Badge de Estoque */}
        <div className="absolute top-2.5 right-2.5 pointer-events-none">
          {isEsgotado ? (
            <span className="px-2 py-0.5 bg-[#737373] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Esgotado
            </span>
          ) : produto.totalEstoque <= 3 ? (
            <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/20">
              Ultimas {produto.totalEstoque} un.
            </span>
          ) : null}
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-[#737373] uppercase tracking-wider mb-1">
            <span>{produto.time}</span>
            <span className="text-[#A3A3A3]">{produto.temporada}</span>
          </div>

          <Link href={`/produto/${produto.slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-[#0A0A0A] line-clamp-2 leading-snug group-hover:text-[#525252] transition-colors">
              {produto.nome}
            </h3>
          </Link>
        </div>

        {/* Preco e Acoes */}
        <div className="pt-2 border-t border-[#F0F0F0] space-y-2">
          <div className="flex items-baseline">
            <span className="font-athletic text-2xl font-black text-[#0A0A0A] tracking-wide">
              {formatarBRL(precoAtual)}
            </span>
          </div>

          {/* Seletor de tamanho inline */}
          {escolhendoTamanho ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                  Escolha o tamanho:
                </span>
                <button
                  type="button"
                  onClick={() => setEscolhendoTamanho(false)}
                  className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                  aria-label="Cancelar"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {produto.tamanhos_disponiveis.map((tamanho) => {
                  const temEstoque = (produto.quantidade_em_estoque_por_tamanho[tamanho] || 0) > 0;
                  return (
                    <button
                      key={tamanho}
                      type="button"
                      disabled={!temEstoque}
                      onClick={() => handleSelecionarTamanho(tamanho)}
                      className={`min-w-[36px] h-8 px-2 rounded-lg text-xs font-bold border transition-colors ${
                        temEstoque
                          ? "border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white cursor-pointer"
                          : "border-[#E5E5E5] bg-[#F5F5F5] text-[#C0C0C0] cursor-not-allowed line-through"
                      }`}
                    >
                      {tamanho}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/produto/${produto.slug}`}
                className="w-full py-2.5 px-2 bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#0A0A0A] text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center"
              >
                Ver Detalhes
              </Link>

              {isEsgotado ? (
                <button
                  disabled
                  className="w-full py-2.5 px-2 bg-[#F5F5F5] text-[#A3A3A3] text-xs font-bold rounded-xl text-center cursor-not-allowed"
                >
                  Esgotado
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEscolhendoTamanho(true)}
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                  className="w-full py-2.5 px-2 bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-black rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag size={14} aria-hidden="true" />
                  <span>+ Carrinho</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
