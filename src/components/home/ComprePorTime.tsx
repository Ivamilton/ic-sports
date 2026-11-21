"use client";

import { useState } from "react";
import Link from "next/link";
import { Produto } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { ArrowRight } from "lucide-react";

interface ComprePorTimeProps {
  produtos: Produto[];
}

const abasTimes = [
  { id: "selecoes", rotulo: "Seleções Mundiais", filtro: "Seleções Mundiais" },
  { id: "brasileirao", rotulo: "Brasileirão", filtro: "Brasileirão" },
  { id: "premier-league", rotulo: "Premier League", filtro: "Premier League" },
  { id: "la-liga", rotulo: "La Liga", filtro: "La Liga" },
];

export function ComprePorTime({ produtos }: ComprePorTimeProps) {
  const [abaAtiva, setAbaAtiva] = useState(abasTimes[0].id);

  const filtroAtual = abasTimes.find((a) => a.id === abaAtiva)?.filtro || "";
  const produtosFiltrados = produtos
    .filter((p) => p.liga.toLowerCase() === filtroAtual.toLowerCase())
    .slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Título da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
              Clubes & Seleções
            </span>
            <h2 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A]">
              Compre por Time
            </h2>
          </div>

          <Link
            href="/camisas"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D10000] hover:underline"
          >
            <span>Ver todos os times</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Abas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {abasTimes.map((aba) => {
            const ativo = abaAtiva === aba.id;
            return (
              <button
                key={aba.id}
                role="tab"
                aria-selected={ativo}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10000] ${
                  ativo
                    ? "bg-[#D10000] text-white shadow-sm"
                    : "bg-[#F4F4F4] text-[#666666] hover:bg-[#E5E5E5] hover:text-[#0A0A0A]"
                }`}
              >
                {aba.rotulo}
              </button>
            );
          })}
        </div>

        {/* Grid de Produtos do Time/Liga selecionado */}
        {produtosFiltrados.length === 0 ? (
          <div className="p-12 text-center bg-[#F4F4F4] rounded-2xl text-[#666666] text-sm font-medium">
            Novos modelos desta competição estão sendo adicionados ao estoque.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {produtosFiltrados.map((prod) => (
              <CardProduto key={prod.id} produto={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
