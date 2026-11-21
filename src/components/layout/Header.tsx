"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, Search, MessageCircle, Flame, ShieldAlert } from "lucide-react";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

export function Header() {
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const router = useRouter();

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
              className="lg:hidden p-2 -ml-2 text-[#0A0A0A] hover:bg-[#F4F4F4] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10000]"
            >
              <Menu size={26} aria-hidden="true" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10000] rounded-lg p-1"
              aria-label="IC Sports - Página inicial"
            >
              <div className="flex flex-col">
                <span className="font-athletic text-3xl sm:text-4xl font-black italic tracking-wider text-[#D10000] leading-none transition-transform group-hover:scale-102">
                  IC <span className="text-[#0A0A0A]">SPORTS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666] leading-none mt-1">
                  Mantos & Camisas de Time
                </span>
              </div>
            </Link>
          </div>

          {/* Centro: Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold tracking-wide" aria-label="Navegação desktop">
            <Link
              href="/"
              className="text-[#0A0A0A] hover:text-[#D10000] transition-colors py-1 border-b-2 border-transparent hover:border-[#D10000]"
            >
              Início
            </Link>
            <Link
              href="/camisas"
              className="text-[#0A0A0A] hover:text-[#D10000] transition-colors py-1 border-b-2 border-transparent hover:border-[#D10000]"
            >
              Catálogo
            </Link>
            <Link
              href="/time/flamengo"
              className="text-[#0A0A0A] hover:text-[#D10000] transition-colors py-1 border-b-2 border-transparent hover:border-[#D10000]"
            >
              Clubes
            </Link>
            <Link
              href="/time/brasil"
              className="text-[#0A0A0A] hover:text-[#D10000] transition-colors py-1 border-b-2 border-transparent hover:border-[#D10000]"
            >
              Seleções
            </Link>
            <Link
              href="/pronta-entrega"
              className="inline-flex items-center gap-1.5 text-[#D10000] hover:text-[#A00000] transition-colors py-1 font-extrabold bg-[#D10000]/10 px-2.5 rounded-full"
            >
              <Flame size={14} aria-hidden="true" />
              <span>Pronta Entrega</span>
            </Link>
          </nav>

          {/* Lado Direito: Barra de Busca + CTA WhatsApp */}
          <div className="flex items-center gap-3">
            {/* Campo de Busca Rápida (Desktop e Tablet) */}
            <form onSubmit={handleBusca} className="hidden sm:flex relative items-center w-48 md:w-64">
              <input
                type="text"
                placeholder="Buscar camisa ou time…"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-[#F4F4F4] border border-[#E5E5E5] rounded-full focus:bg-white focus:border-[#D10000] focus:ring-2 focus:ring-[#D10000]/20 focus:outline-none transition-all placeholder:text-[#888888]"
              />
              <Search size={15} className="absolute left-3 text-[#666666] pointer-events-none" aria-hidden="true" />
            </form>

            {/* Botão de Pedido WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#D10000] hover:bg-[#B00000] text-white font-black text-xs md:text-sm uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(209,0,0,0.25)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10000]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Pedir no WhatsApp</span>
            </a>

            {/* Ícone WhatsApp Mobile */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a IC Sports no WhatsApp"
              className="sm:hidden p-2.5 bg-[#25D366] text-white rounded-xl shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <MessageCircle size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      {/* Drawer móvel */}
      <MobileDrawer aberto={drawerAberto} onFechar={() => setDrawerAberto(false)} />
    </>
  );
}
