"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Produto } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { FiltrosSidebar, EstadoFiltros } from "@/components/catalogo/FiltrosSidebar";
import { FiltrosMobileModal } from "@/components/catalogo/FiltrosMobileModal";
import { OrdenacaoSelect } from "@/components/catalogo/OrdenacaoSelect";
import { SlidersHorizontal, Search, RotateCcw } from "lucide-react";

interface CatalogoViewProps {
  produtosIniciais: Produto[];
}

export function CatalogoView({ produtosIniciais }: CatalogoViewProps) {
  const searchParams = useSearchParams();
  const buscaParam = searchParams.get("busca") || "";
  const categoriaParam = searchParams.get("categoria") || "todas";
  const ligaParam = searchParams.get("liga") || "todas";

  const [busca, setBusca] = useState(buscaParam);
  const [modalFiltrosAberto, setModalFiltrosAberto] = useState(false);

  const [filtros, setFiltros] = useState<EstadoFiltros>({
    time: "todos",
    liga: ligaParam,
    categoria: categoriaParam,
    tamanho: "todos",
    faixaPreco: "todas",
    ordenacao: "mais-recentes",
  });

  // Lista dinâmica de times e ligas
  const { timesDisponiveis, ligasDisponiveis } = useMemo(() => {
    const timesSet = new Set<string>();
    const ligasSet = new Set<string>();

    produtosIniciais.forEach((p) => {
      if (p.time) timesSet.add(p.time);
      if (p.liga) ligasSet.add(p.liga);
    });

    return {
      timesDisponiveis: Array.from(timesSet).sort(),
      ligasDisponiveis: Array.from(ligasSet).sort(),
    };
  }, [produtosIniciais]);

  const handleChangeFiltro = (chave: keyof EstadoFiltros, valor: string) => {
    setFiltros((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleLimpar = () => {
    setBusca("");
    setFiltros({
      time: "todos",
      liga: "todas",
      categoria: "todas",
      tamanho: "todos",
      faixaPreco: "todas",
      ordenacao: "mais-recentes",
    });
  };

  // Filtragem
  const produtosFiltrados = useMemo(() => {
    let lista = [...produtosIniciais];

    // Busca por texto
    if (busca.trim()) {
      const termo = busca.toLowerCase().trim();
      lista = lista.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.time.toLowerCase().includes(termo) ||
          p.liga.toLowerCase().includes(termo)
      );
    }

    // Filtro Categoria
    if (filtros.categoria !== "todas") {
      lista = lista.filter((p) => p.categoria.toLowerCase() === filtros.categoria.toLowerCase());
    }

    // Filtro Liga
    if (filtros.liga !== "todas") {
      lista = lista.filter((p) => p.liga.toLowerCase() === filtros.liga.toLowerCase());
    }

    // Filtro Time
    if (filtros.time !== "todos") {
      lista = lista.filter((p) => p.time.toLowerCase() === filtros.time.toLowerCase());
    }

    // Filtro Tamanho
    if (filtros.tamanho !== "todos") {
      lista = lista.filter((p) => {
        const estoque = p.quantidade_em_estoque_por_tamanho[filtros.tamanho];
        return estoque !== undefined && estoque > 0;
      });
    }

    // Filtro Faixa de Preço
    if (filtros.faixaPreco !== "todas") {
      lista = lista.filter((p) => {
        const preco = p.preco_promocional || p.preco;
        if (filtros.faixaPreco === "ate-200") return preco <= 200;
        if (filtros.faixaPreco === "200-300") return preco > 200 && preco <= 300;
        if (filtros.faixaPreco === "acima-300") return preco > 300;
        return true;
      });
    }

    // Ordenação
    if (filtros.ordenacao === "menor-preco") {
      lista.sort((a, b) => (a.preco_promocional || a.preco) - (b.preco_promocional || b.preco));
    } else if (filtros.ordenacao === "maior-preco") {
      lista.sort((a, b) => (b.preco_promocional || b.preco) - (a.preco_promocional || a.preco));
    } else if (filtros.ordenacao === "mais-vendidos") {
      lista.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }

    return lista;
  }, [produtosIniciais, busca, filtros]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Cabeçalho do Catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
            Mantos Oficiais & Retrô
          </span>
          <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
            Catálogo Completo
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-1">
            Exibindo <strong>{produtosFiltrados.length}</strong> camisas encontradas
          </p>
        </div>

        {/* Barra de Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar no catálogo…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-xs font-semibold bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#D10000] focus:ring-2 focus:ring-[#D10000]/20"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" aria-hidden="true" />
          </div>

          <OrdenacaoSelect
            valor={filtros.ordenacao}
            onChange={(val) => handleChangeFiltro("ordenacao", val)}
          />

          {/* Botão de abrir filtros no Mobile */}
          <button
            type="button"
            onClick={() => setModalFiltrosAberto(true)}
            className="lg:hidden flex items-center justify-center gap-2 py-2 px-4 bg-[#0A0A0A] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Grid com Sidebar de Filtros no Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FiltrosSidebar
            filtros={filtros}
            onChangeFiltro={handleChangeFiltro}
            onLimpar={handleLimpar}
            timesDisponiveis={timesDisponiveis}
            ligasDisponiveis={ligasDisponiveis}
          />
        </div>

        {/* Grid de Produtos */}
        <div className="lg:col-span-3">
          {produtosFiltrados.length === 0 ? (
            <div className="p-16 text-center bg-[#F9F9F9] rounded-2xl border border-dashed border-[#CCCCCC] space-y-4">
              <p className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
                Nenhuma camisa encontrada
              </p>
              <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto">
                Tente alterar os filtros ou pesquisar com outro termo. Também aceitamos encomendas pelo WhatsApp!
              </p>
              <button
                type="button"
                onClick={handleLimpar}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D10000] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Limpar todos os filtros</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {produtosFiltrados.map((prod, idx) => (
                <CardProduto key={prod.id} produto={prod} prioridade={idx < 6} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal / Gaveta de Filtros no Mobile */}
      <FiltrosMobileModal
        aberto={modalFiltrosAberto}
        onFechar={() => setModalFiltrosAberto(false)}
        filtros={filtros}
        onChangeFiltro={handleChangeFiltro}
        onLimpar={handleLimpar}
        timesDisponiveis={timesDisponiveis}
        ligasDisponiveis={ligasDisponiveis}
        totalResultados={produtosFiltrados.length}
      />
    </div>
  );
}
