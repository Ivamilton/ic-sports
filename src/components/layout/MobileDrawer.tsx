"use client";

import Link from "next/link";
import { X, MessageCircleMore, ChevronRight, PackageCheck } from "lucide-react";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

interface MobileDrawerProps {
  aberto: boolean;
  onFechar: () => void;
}

const linksPrincipais = [
  { nome: "Início", href: "/" },
  { nome: "Catálogo Completo", href: "/camisas" },
  { nome: "Todos os Clubes", href: "/camisas?origem=clubes" },
  { nome: "Clubes Nacionais", href: "/camisas?origem=nacionais" },
  { nome: "Clubes Internacionais", href: "/camisas?origem=internacionais" },
  { nome: "Seleções Mundiais", href: "/time/brasil" },
  { nome: "Pronta Entrega", href: "/pronta-entrega", destaque: true },
  { nome: "Sobre & Contato", href: "/sobre" },
  { nome: "Políticas & Envio", href: "/politicas" },
  { nome: "Tabela de Medidas (FAQ)", href: "/faq" },
];

export function MobileDrawer({ aberto, onFechar }: MobileDrawerProps) {
  if (!aberto) return null;

  const whatsappUrl = gerarLinkWhatsAppGeral();

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onFechar}
        aria-hidden="true"
      />

      {/* Drawer lateral */}
      <div className="relative w-[85%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
        <div>
          {/* Topo do Drawer */}
          <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white text-[#0A0A0A]">
            <Link
              href="/"
              onClick={onFechar}
              className="flex flex-col"
            >
              <span className="font-athletic text-2xl font-black italic tracking-wider text-[#0A0A0A] uppercase leading-none whitespace-nowrap">
                IF LEGACY
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#737373] mt-[1px] leading-none whitespace-nowrap">
                MODA ESPORTIVA
              </span>
            </Link>
            <button
              onClick={onFechar}
              aria-label="Fechar menu lateral"
              className="p-2 text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          {/* Links de navegação */}
          <nav className="p-4 space-y-1" aria-label="Navegação móvel">
            {linksPrincipais.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onFechar}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-sm transition-all ${
                  link.destaque
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#0A0A0A] hover:bg-[#F5F5F5]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.destaque && <PackageCheck size={15} className="text-white" aria-hidden="true" />}
                  <span>{link.nome}</span>
                </div>
                <ChevronRight size={16} className={link.destaque ? "text-white/60" : "text-[#999999]"} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Categorias Rápidas */}
          <div className="px-5 py-4 border-t border-[#E5E5E5] space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#737373] block">
              Compre por Versão
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/camisas?categoria=torcedor"
                onClick={onFechar}
                className="p-2.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-lg text-center hover:bg-[#E5E5E5] transition-colors"
              >
                Torcedor
              </Link>
              <Link
                href="/camisas?categoria=jogador"
                onClick={onFechar}
                className="p-2.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-lg text-center hover:bg-[#E5E5E5] transition-colors"
              >
                Jogador
              </Link>
              <Link
                href="/camisas?categoria=retro"
                onClick={onFechar}
                className="p-2.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-lg text-center hover:bg-[#E5E5E5] transition-colors"
              >
                Retrô Clássica
              </Link>
              <Link
                href="/camisas?categoria=infantil"
                onClick={onFechar}
                className="p-2.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-lg text-center hover:bg-[#E5E5E5] transition-colors"
              >
                Kids / Infantil
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé do Drawer com botão de WhatsApp */}
        <div className="p-5 border-t border-[#E5E5E5] bg-[#F5F5F5] space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] hover:bg-[#262626] text-white font-black py-3 rounded-xl shadow-md transition-all text-sm uppercase tracking-wide cursor-pointer"
          >
            <MessageCircleMore size={18} className="text-[#25D366]" aria-hidden="true" />
            <span>Falar no WhatsApp</span>
          </a>
          <p className="text-center text-[11px] font-semibold text-[#737373]">
            Atendimento com {lojaConfig.responsavel}
          </p>
        </div>
      </div>
    </div>
  );
}
