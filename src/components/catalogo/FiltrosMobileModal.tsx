"use client";

import { X } from "lucide-react";
import { EstadoFiltros, FiltrosSidebar } from "@/components/catalogo/FiltrosSidebar";

interface FiltrosMobileModalProps {
  aberto: boolean;
  onFechar: () => void;
  filtros: EstadoFiltros;
  onChangeFiltro: (chave: keyof EstadoFiltros, valor: string) => void;
  onLimpar: () => void;
  timesDisponiveis: string[];
  ligasDisponiveis: string[];
  totalResultados: number;
}

export function FiltrosMobileModal({
  aberto,
  onFechar,
  filtros,
  onChangeFiltro,
  onLimpar,
  timesDisponiveis,
  ligasDisponiveis,
  totalResultados,
}: FiltrosMobileModalProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onFechar}
        aria-hidden="true"
      />

      <div className="relative ml-auto w-[85%] max-w-[360px] bg-white h-full shadow-2xl flex flex-col justify-between z-10">
        <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h3 className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
            Filtrar Produtos
          </h3>
          <button
            onClick={onFechar}
            aria-label="Fechar filtros"
            className="p-2 text-[#666666] hover:text-[#0A0A0A] rounded-lg"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <FiltrosSidebar
            filtros={filtros}
            onChangeFiltro={onChangeFiltro}
            onLimpar={onLimpar}
            timesDisponiveis={timesDisponiveis}
            ligasDisponiveis={ligasDisponiveis}
          />
        </div>

        <div className="p-4 border-t border-[#E5E5E5] bg-[#F4F4F4]">
          <button
            type="button"
            onClick={onFechar}
            className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#262626] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Ver {totalResultados} {totalResultados === 1 ? "Produto" : "Produtos"}
          </button>
        </div>
      </div>
    </div>
  );
}
