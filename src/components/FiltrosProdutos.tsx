"use client";

import { useState, useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardProduto } from "@/components/CardProduto";
import { Produto } from "@/data/exemplo";

interface FiltrosProdutosProps {
  produtos: Produto[];
  ligaInicial?: string;
  ocultarFiltroLiga?: boolean;
}

export function FiltrosProdutos({
  produtos,
  ligaInicial = "todas",
  ocultarFiltroLiga = false,
}: FiltrosProdutosProps) {
  const [busca, setBusca] = useState("");
  const [ligaSelecionada, setLigaSelecionada] = useState(ligaInicial);
  const [tipoSelecionado, setTipoSelecionado] = useState<"todos" | "Torcedor" | "Jogador">("todos");

  // Lista de ligas dinâmicas a partir dos produtos
  const ligasDisponiveis = useMemo(() => {
    const set = new Set<string>();
    produtos.forEach((p) => {
      if (p.liga) set.add(p.liga);
    });
    return Array.from(set).sort();
  }, [produtos]);

  // Filtragem dos produtos
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      // Filtro de liga
      if (!ocultarFiltroLiga && ligaSelecionada !== "todas") {
        if (p.liga.toLowerCase() !== ligaSelecionada.toLowerCase()) return false;
      }

      // Filtro de tipo
      if (tipoSelecionado !== "todos") {
        if (p.tipo !== tipoSelecionado) return false;
      }

      // Filtro de busca textual
      if (busca.trim() !== "") {
        const termo = busca.toLowerCase().trim();
        const noNome = p.nome.toLowerCase().includes(termo);
        const noTime = p.time.toLowerCase().includes(termo);
        const naLiga = p.liga.toLowerCase().includes(termo);
        if (!noNome && !noTime && !naLiga) return false;
      }

      return true;
    });
  }, [produtos, ligaSelecionada, tipoSelecionado, busca, ocultarFiltroLiga]);

  // Separa disponíveis de esgotados e ordena
  const { disponiveis, esgotados, totalOrdenado } = useMemo(() => {
    const disp: Produto[] = [];
    const esg: Produto[] = [];

    produtosFiltrados.forEach((p) => {
      if (p.estoque > 0) disp.push(p);
      else esg.push(p);
    });

    return {
      disponiveis: disp,
      esgotados: esg,
      totalOrdenado: [...disp, ...esg],
    };
  }, [produtosFiltrados]);

  const temFiltroAtivo =
    (!ocultarFiltroLiga && ligaSelecionada !== "todas") ||
    tipoSelecionado !== "todos" ||
    busca.trim() !== "";

  const limparFiltros = () => {
    setBusca("");
    setLigaSelecionada("todas");
    setTipoSelecionado("todos");
  };

  return (
    <div className="space-y-8">
      {/* Barra de Filtros e Busca */}
      <div className="bg-[#101626] border border-[#1F2C44] rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
        {/* Campo de Busca */}
        <div className="relative">
          <label htmlFor="busca-camisas" className="sr-only">
            Buscar camisa por time ou modelo
          </label>
          <div className="relative flex items-center">
            <Search
              size={18}
              className="absolute left-3.5 text-[#94A3B8] pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="busca-camisas"
              type="search"
              placeholder="Buscar por time, modelo ou liga…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-[#080C14] border-[#1F2C44] text-[#F8FAFC] placeholder:text-[#64748B] rounded-xl focus-visible:ring-2 focus-visible:ring-[#D4AF37] h-11 text-sm"
            />
          </div>
        </div>

        {/* Linha de Filtros: Liga + Tipo */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          {/* Filtro de Ligas (se não estiver em página de liga fixa) */}
          {!ocultarFiltroLiga && (
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] block">
                Filtrar por Liga
              </span>
              <div
                className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none"
                role="group"
                aria-label="Filtro de ligas"
              >
                <button
                  type="button"
                  onClick={() => setLigaSelecionada("todas")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    ligaSelecionada === "todas"
                      ? "bg-[#D4AF37] text-[#080C14] shadow-sm"
                      : "bg-[#172033] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1F2C44]"
                  }`}
                  aria-pressed={ligaSelecionada === "todas"}
                >
                  Todas ({produtos.length})
                </button>
                {ligasDisponiveis.map((liga) => {
                  const qtd = produtos.filter((p) => p.liga === liga).length;
                  const isSelected = ligaSelecionada.toLowerCase() === liga.toLowerCase();
                  return (
                    <button
                      key={liga}
                      type="button"
                      onClick={() => setLigaSelecionada(liga)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        isSelected
                          ? "bg-[#D4AF37] text-[#080C14] shadow-sm"
                          : "bg-[#172033] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1F2C44]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {liga} ({qtd})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filtro de Tipo (Torcedor / Jogador) */}
          <div className="space-y-2 shrink-0">
            <span className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] block">
              Tipo de Camisa
            </span>
            <div
              className="inline-flex p-1 bg-[#080C14] border border-[#1F2C44] rounded-xl"
              role="group"
              aria-label="Filtro de tipo de camisa"
            >
              {(["todos", "Torcedor", "Jogador"] as const).map((tipo) => {
                const ativo = tipoSelecionado === tipo;
                return (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoSelecionado(tipo)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      ativo
                        ? "bg-[#D4AF37] text-[#080C14]"
                        : "text-[#94A3B8] hover:text-[#F8FAFC]"
                    }`}
                    aria-pressed={ativo}
                  >
                    {tipo === "todos" ? "Todos" : tipo}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resumo de Resultados e Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1F2C44]/70 text-xs">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span>Exibindo:</span>
            <span className="font-bold text-[#D4AF37]">{disponiveis.length} disponíveis</span>
            {esgotados.length > 0 && (
              <>
                <span aria-hidden="true">•</span>
                <span className="text-[#64748B]">{esgotados.length} esgotadas</span>
              </>
            )}
          </div>

          {temFiltroAtivo && (
            <button
              type="button"
              onClick={limparFiltros}
              className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid de Produtos */}
      {totalOrdenado.length === 0 ? (
        <div className="text-center py-20 px-4 bg-[#101626]/50 border border-dashed border-[#1F2C44] rounded-2xl space-y-4">
          <p className="text-base font-semibold text-[#F8FAFC]">
            Nenhuma camisa encontrada com esses critérios.
          </p>
          <p className="text-sm text-[#94A3B8]">
            Tente buscar com outro nome de time ou limpe os filtros ativos.
          </p>
          <Button
            onClick={limparFiltros}
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            Ver todas as camisas
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {totalOrdenado.map((prod, index) => (
            <CardProduto
              key={`${prod.nome}-${prod.time}-${index}`}
              produto={prod}
              priority={index < 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
