"use client";

import { useState } from "react";
import Link from "next/link";
import { Produto } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { Flame, ArrowRight } from "lucide-react";

interface MaisVendidosProps {
  produtos: Produto[];
}

export function MaisVendidos({ produtos }: MaisVendidosProps) {
  const [abaAtiva, setAbaAtiva] = useState<"nacionais" | "internacionais">("nacionais");

  const produtosFiltrados = produtos
    .filter((p) => {
      if (abaAtiva === "nacionais") {
        return p.tipoOrigem === "nacional" || p.liga.toLowerCase().includes("brasil");
      }
      return p.tipoOrigem === "internacional" || p.tipoOrigem === "selecao";
    })
    .slice(0, 4);

  return (
    <section id="mais-vendidos" className="py-14 sm:py-20 bg-[#F4F4F4] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#D10000]">
              <Flame size={15} aria-hidden="true" />
              <span>Destaques da Galera</span>
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A]">
              Mais Vendidos
            </h2>
          </div>

          {/* Abas Nacionais / Internacionais */}
          <div className="flex items-center p-1.5 bg-white border border-[#E5E5E5] rounded-full self-start sm:self-auto" role="tablist">
            <button
              role="tab"
              aria-selected={abaAtiva === "nacionais"}
              onClick={() => setAbaAtiva("nacionais")}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                abaAtiva === "nacionais"
                  ? "bg-[#D10000] text-white shadow-xs"
                  : "text-[#666666] hover:text-[#0A0A0A]"
              }`}
            >
              Nacionais
            </button>
            <button
              role="tab"
              aria-selected={abaAtiva === "internacionais"}
              onClick={() => setAbaAtiva("internacionais")}
              className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                abaAtiva === "internacionais"
                  ? "bg-[#D10000] text-white shadow-xs"
                  : "text-[#666666] hover:text-[#0A0A0A]"
              }`}
            >
              Internacionais & Seleções
            </button>
          </div>
        </div>

        {/* Grid de Mais Vendidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {produtosFiltrados.map((prod) => (
            <CardProduto key={prod.id} produto={prod} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/camisas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] hover:bg-[#222222] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            <span>Explorar Todos os Lançamentos</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
