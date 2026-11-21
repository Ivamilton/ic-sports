"use client";

import { RotateCcw } from "lucide-react";

export interface EstadoFiltros {
  time: string;
  liga: string;
  categoria: string;
  tamanho: string;
  faixaPreco: string;
  ordenacao: string;
}

interface FiltrosSidebarProps {
  filtros: EstadoFiltros;
  onChangeFiltro: (chave: keyof EstadoFiltros, valor: string) => void;
  onLimpar: () => void;
  timesDisponiveis: string[];
  ligasDisponiveis: string[];
}

export function FiltrosSidebar({
  filtros,
  onChangeFiltro,
  onLimpar,
  timesDisponiveis,
  ligasDisponiveis,
}: FiltrosSidebarProps) {
  const categorias = [
    { id: "todas", label: "Todas as Versões" },
    { id: "torcedor", label: "Torcedor" },
    { id: "jogador", label: "Jogador" },
    { id: "retro", label: "Retrô" },
    { id: "infantil", label: "Infantil / Kids" },
  ];

  const tamanhos = ["P", "M", "G", "GG", "XG"];

  const faixasPreco = [
    { id: "todas", label: "Qualquer Preço" },
    { id: "ate-200", label: "Até R$ 200" },
    { id: "200-300", label: "R$ 200 a R$ 300" },
    { id: "acima-300", label: "Acima de R$ 300" },
  ];

  const temFiltroAtivo =
    filtros.time !== "todos" ||
    filtros.liga !== "todas" ||
    filtros.categoria !== "todas" ||
    filtros.tamanho !== "todos" ||
    filtros.faixaPreco !== "todas";

  return (
    <aside className="w-full space-y-6 bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
        <h3 className="font-athletic text-2xl font-black uppercase tracking-wider text-[#0A0A0A]">
          Filtros
        </h3>
        {temFiltroAtivo && (
          <button
            type="button"
            onClick={onLimpar}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#D10000] hover:underline cursor-pointer"
          >
            <RotateCcw size={12} aria-hidden="true" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Categoria / Versão */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
          Versão
        </span>
        <div className="space-y-1 text-xs font-semibold text-[#555555]">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChangeFiltro("categoria", cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                filtros.categoria === cat.id
                  ? "bg-[#D10000] text-white font-bold"
                  : "hover:bg-[#F4F4F4] text-[#444444]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ligas */}
      <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
          Campeonato / Liga
        </span>
        <div className="space-y-1 text-xs font-semibold text-[#555555] max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onChangeFiltro("liga", "todas")}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              filtros.liga === "todas"
                ? "bg-[#D10000] text-white font-bold"
                : "hover:bg-[#F4F4F4] text-[#444444]"
            }`}
          >
            Todas as Ligas
          </button>
          {ligasDisponiveis.map((liga) => (
            <button
              key={liga}
              type="button"
              onClick={() => onChangeFiltro("liga", liga)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                filtros.liga === liga
                  ? "bg-[#D10000] text-white font-bold"
                  : "hover:bg-[#F4F4F4] text-[#444444]"
              }`}
            >
              {liga}
            </button>
          ))}
        </div>
      </div>

      {/* Tamanho */}
      <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
          Tamanho Disponível
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onChangeFiltro("tamanho", "todos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filtros.tamanho === "todos"
                ? "bg-[#D10000] text-white"
                : "bg-[#F4F4F4] text-[#555555] hover:bg-[#E5E5E5]"
            }`}
          >
            Todos
          </button>
          {tamanhos.map((tam) => (
            <button
              key={tam}
              type="button"
              onClick={() => onChangeFiltro("tamanho", tam)}
              className={`w-9 h-9 rounded-lg text-xs font-athletic text-base font-bold transition-colors flex items-center justify-center cursor-pointer ${
                filtros.tamanho === tam
                  ? "bg-[#D10000] text-white"
                  : "bg-[#F4F4F4] text-[#0A0A0A] hover:bg-[#E5E5E5]"
              }`}
            >
              {tam}
            </button>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] block">
          Faixa de Preço
        </span>
        <div className="space-y-1 text-xs font-semibold text-[#555555]">
          {faixasPreco.map((faixa) => (
            <button
              key={faixa.id}
              type="button"
              onClick={() => onChangeFiltro("faixaPreco", faixa.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                filtros.faixaPreco === faixa.id
                  ? "bg-[#D10000] text-white font-bold"
                  : "hover:bg-[#F4F4F4] text-[#444444]"
              }`}
            >
              {faixa.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
