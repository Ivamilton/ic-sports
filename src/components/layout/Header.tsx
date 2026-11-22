"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, MessageCircle, Zap, ShoppingBag } from "lucide-react";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import type { Produto } from "@/lib/getProducts";
import { obterProdutosCacheados } from "@/lib/produtosClient";

function normalizarTexto(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Header() {
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const buscaRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { totalItens, abrirCarrinho } = useCart();

  const sugestoes = useMemo(() => {
    const termo = normalizarTexto(termoBusca.trim());
    if (termo.length < 2) return [];

    return produtos
      .filter((produto) =>
        normalizarTexto(`${produto.nome} ${produto.time} ${produto.liga}`).includes(termo)
      )
      .slice(0, 5);
  }, [produtos, termoBusca]);

  useEffect(() => {
    const fecharAoClicarFora = (evento: MouseEvent) => {
      if (buscaRef.current && !buscaRef.current.contains(evento.target as Node)) {
        setBuscaAberta(false);
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  useEffect(() => {
    obterProdutosCacheados()
      .then((dados) => setProdutos(dados))
      .catch(() => setProdutos([]));
  }, []);

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    if (termoBusca.trim()) {
      router.push(`/camisas?busca=${encodeURIComponent(termoBusca.trim())}`);
    }
  };

  const whatsappUrl = gerarLinkWhatsAppGeral();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Lado Esquerdo: Hambúrguer Mobile + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerAberto(true)}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-2 -ml-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <Menu size={26} aria-hidden="true" />
            </button>

            {/* Marca em Texto: IF LEGACY com MODA ESPORTIVA coladinho */}
            <Link
              href="/"
              className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg py-1 px-1"
              aria-label="IF Legacy Moda Esportiva - Página inicial"
            >
              <span className="font-athletic text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-wider text-[#0A0A0A] uppercase transition-transform group-hover:scale-102 leading-none whitespace-nowrap">
                IF LEGACY
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#737373] group-hover:text-[#0A0A0A] transition-colors leading-none mt-[1px] whitespace-nowrap">
                MODA ESPORTIVA
              </span>
            </Link>
          </div>

          {/* Centro: Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold tracking-wide" aria-label="Navegação desktop">
            <Link
              href="/"
              className="text-[#0A0A0A] hover:text-[#525252] transition-colors py-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
              Início
            </Link>
            <Link
              href="/camisas"
              className="text-[#0A0A0A] hover:text-[#525252] transition-colors py-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
              Catálogo
            </Link>
            <Link
              href="/time/brasil"
              className="text-[#0A0A0A] hover:text-[#525252] transition-colors py-1 border-b-2 border-transparent hover:border-black whitespace-nowrap"
            >
              Seleções
            </Link>
          </nav>

          {/* Lado Direito: Barra de Busca + Cards Proporcionais */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Campo de Busca Rápida (Desktop) */}
            <form ref={buscaRef} onSubmit={handleBusca} className="hidden xl:flex relative items-center w-56">
              <input
                type="text"
                placeholder="Buscar camisa…"
                value={termoBusca}
                onChange={(e) => {
                  setTermoBusca(e.target.value);
                  setBuscaAberta(true);
                }}
                onFocus={() => termoBusca.trim().length >= 2 && setBuscaAberta(true)}
                aria-label="Buscar camisa"
                aria-expanded={buscaAberta && sugestoes.length > 0}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all placeholder:text-[#888888]"
              />
              <Search size={15} className="absolute left-3 text-[#666666] pointer-events-none" aria-hidden="true" />

              {buscaAberta && termoBusca.trim().length >= 2 && (
                <div className="absolute top-full right-0 mt-2 w-[320px] bg-white border border-[#E5E5E5] rounded-2xl shadow-xl overflow-hidden z-50">
                  {sugestoes.length > 0 ? (
                    sugestoes.map((produto) => (
                      <Link
                        key={produto.id}
                        href={`/produto/${produto.slug}`}
                        onClick={() => {
                          setBuscaAberta(false);
                          setTermoBusca("");
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F5F5F5] transition-colors"
                      >
                        <img
                          src={produto.imagens[0]}
                          alt={produto.nome}
                          className="w-12 h-12 rounded-lg object-cover bg-[#F5F5F5]"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0A0A0A] truncate">{produto.nome}</p>
                          <p className="text-[11px] text-[#737373] truncate">{produto.time} · {produto.liga}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-left text-xs font-bold text-[#737373] hover:bg-[#F5F5F5]"
                    >
                      Buscar “{termoBusca.trim()}” no catálogo
                    </button>
                  )}
                </div>
              )}
            </form>

            {/* Card Pronta Entrega Proporcional */}
            <Link
              href="/pronta-entrega"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] text-white font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-xs shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Zap size={15} className="text-white shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Pronta Entrega</span>
            </Link>

            {/* Card Pedir no WhatsApp Proporcional */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] text-white font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-xs shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <MessageCircle size={16} className="text-[#25D366] shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Pedir no WhatsApp</span>
            </a>

            {/* Card Carrinho Proporcional */}
            <button
              type="button"
              onClick={abrirCarrinho}
              aria-label={`Ver carrinho de compras (${totalItens} ${totalItens === 1 ? "item" : "itens"})`}
              className="relative inline-flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-xl bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#0A0A0A] font-black text-xs uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <div className="relative">
                <ShoppingBag size={18} aria-hidden="true" />
                {totalItens > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0A0A0A] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-scale-in">
                    {totalItens}
                  </span>
                )}
              </div>
              <span className="hidden md:inline whitespace-nowrap">Carrinho</span>
            </button>

            {/* Ícones Mobile para telas pequenas */}
            <Link
              href="/pronta-entrega"
              aria-label="Ver produtos a Pronta Entrega"
              className="sm:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-[#0A0A0A] text-white shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Zap size={18} className="text-white" aria-hidden="true" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a IF Legacy no WhatsApp"
              className="sm:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-[#0A0A0A] text-white shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <MessageCircle size={19} className="text-[#25D366]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      {/* Drawer móvel */}
      <MobileDrawer aberto={drawerAberto} onFechar={() => setDrawerAberto(false)} />
    </>
  );
}
