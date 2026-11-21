"use client";

import { useState } from "react";
import Link from "next/link";
import { Produto } from "@/lib/getProducts";
import { GaleriaFotos } from "@/components/produto/GaleriaFotos";
import { SeletorTamanho } from "@/components/produto/SeletorTamanho";
import { ModalTabelaMedidas } from "@/components/produto/ModalTabelaMedidas";
import { BotaoComprarWhatsapp } from "@/components/produto/BotaoComprarWhatsapp";
import { ProdutosRelacionados } from "@/components/produto/ProdutosRelacionados";
import { ShieldCheck, Truck, MessageCircle, ChevronLeft, Flame, AlertCircle } from "lucide-react";

interface DetalhesProdutoViewProps {
  produto: Produto;
  relacionados: Produto[];
}

const formatarBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function DetalhesProdutoView({ produto, relacionados }: DetalhesProdutoViewProps) {
  // Tamanho inicial selecionado: primeiro tamanho disponível com estoque
  const tamanhoInicial =
    produto.tamanhos_disponiveis.find(
      (tam) => (produto.quantidade_em_estoque_por_tamanho[tam] || 0) > 0
    ) || produto.tamanhos_disponiveis[0] || "M";

  const [tamanho, setTamanho] = useState<string>(tamanhoInicial);

  const isEsgotado = produto.totalEstoque <= 0;
  const precoAtual = produto.preco_promocional || produto.preco;
  const temPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco;
  const descontoPercentual = temPromocao
    ? Math.round(((produto.preco - produto.preco_promocional!) / produto.preco) * 100)
    : 0;

  const estoqueTamanhoSelecionado =
    produto.quantidade_em_estoque_por_tamanho[tamanho] !== undefined
      ? produto.quantidade_em_estoque_por_tamanho[tamanho]
      : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Botão Voltar */}
      <div>
        <Link
          href="/camisas"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#666666] hover:text-[#D10000] transition-colors"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      {/* Grid Principal do Produto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Lado Esquerdo: Galeria de Fotos */}
        <GaleriaFotos imagens={produto.imagens} nome={produto.nome} />

        {/* Lado Direito: Informações e Compra */}
        <div className="space-y-6">
          {/* Breadcrumbs e Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#F4F4F4] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider rounded-md">
              {produto.liga}
            </span>
            <span className="px-2.5 py-1 bg-[#0A0A0A] text-white font-bold text-xs uppercase tracking-wider rounded-md">
              Versão {produto.categoria}
            </span>
            <span className="text-xs font-bold text-[#666666]">
              Temporada {produto.temporada}
            </span>
          </div>

          {/* Nome do Produto */}
          <h1 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A] leading-tight">
            {produto.nome}
          </h1>

          {/* Bloco de Preço */}
          <div className="p-4 rounded-2xl bg-[#F9F9F9] border border-[#EBEBEB] space-y-1">
            <div className="flex items-baseline gap-3">
              {temPromocao && (
                <span className="text-sm sm:text-base text-[#888888] line-through font-semibold">
                  {formatarBRL(produto.preco)}
                </span>
              )}
              <span className="font-athletic text-4xl sm:text-5xl font-black text-[#D10000] tracking-wide">
                {formatarBRL(precoAtual)}
              </span>
              {temPromocao && (
                <span className="px-2 py-0.5 bg-[#D10000] text-white text-xs font-black uppercase rounded-md">
                  Economize {formatarBRL(produto.preco - produto.preco_promocional!)} ({descontoPercentual}% OFF)
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-[#666666]">
              À vista no Pix ou em até 12x no cartão de crédito
            </p>
          </div>

          {/* Seletor de Tamanho */}
          <div className="space-y-3 pt-2">
            <SeletorTamanho
              tamanhos={produto.tamanhos_disponiveis}
              estoquePorTamanho={produto.quantidade_em_estoque_por_tamanho}
              tamanhoSelecionado={tamanho}
              onSelecionar={(t) => setTamanho(t)}
            />

            {/* Aviso de estoque do tamanho selecionado */}
            {estoqueTamanhoSelecionado === 0 ? (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-bold text-red-700">
                <AlertCircle size={16} aria-hidden="true" />
                <span>O tamanho {tamanho} está esgotado no momento. Escolha outro tamanho ou consulte encomenda no WhatsApp.</span>
              </div>
            ) : estoqueTamanhoSelecionado <= 3 ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-800">
                <Flame size={16} className="text-amber-600" aria-hidden="true" />
                <span>Atenção: Restam apenas {estoqueTamanhoSelecionado} {estoqueTamanhoSelecionado === 1 ? "unidade" : "unidades"} no tamanho {tamanho}!</span>
              </div>
            ) : null}

            {/* Tabela de Medidas */}
            <div className="pt-1">
              <ModalTabelaMedidas />
            </div>
          </div>

          {/* Botão de Compra no WhatsApp */}
          <div className="pt-4">
            <BotaoComprarWhatsapp
              produto={produto}
              tamanhoSelecionado={tamanho}
              desabilitado={isEsgotado || estoqueTamanhoSelecionado === 0}
            />
            <p className="text-center text-xs font-semibold text-[#777777] mt-3">
              ⚡ Ao clicar, abre o WhatsApp com o modelo e tamanho escolhidos pré-preenchidos.
            </p>
          </div>

          {/* Selos de Confiança */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E5E5] text-center">
            <div className="p-3 bg-[#F9F9F9] rounded-xl space-y-1">
              <ShieldCheck size={20} className="text-[#D10000] mx-auto" aria-hidden="true" />
              <p className="text-[11px] font-bold text-[#0A0A0A]">Qualidade Oficial</p>
            </div>
            <div className="p-3 bg-[#F9F9F9] rounded-xl space-y-1">
              <Truck size={20} className="text-[#D10000] mx-auto" aria-hidden="true" />
              <p className="text-[11px] font-bold text-[#0A0A0A]">Envio com Rastreio</p>
            </div>
            <div className="p-3 bg-[#F9F9F9] rounded-xl space-y-1">
              <MessageCircle size={20} className="text-[#D10000] mx-auto" aria-hidden="true" />
              <p className="text-[11px] font-bold text-[#0A0A0A]">Suporte Direto</p>
            </div>
          </div>

          {/* Descrição do Produto */}
          <div className="pt-4 border-t border-[#E5E5E5] space-y-2">
            <h3 className="font-athletic text-2xl font-bold uppercase tracking-wider text-[#0A0A0A]">
              Detalhes do Manto
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              {produto.descricao}
            </p>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      <ProdutosRelacionados produtos={relacionados} />
    </div>
  );
}
