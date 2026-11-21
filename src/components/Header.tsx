"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { lojaConfig } from "@/config/loja";

const ligasPrincipais = [
  { nome: "Brasileirão", slug: "brasileirao" },
  { nome: "La Liga", slug: "la-liga" },
  { nome: "Premier League", slug: "premier-league" },
  { nome: "Ligue 1", slug: "ligue-1" },
  { nome: "Seleções", slug: "selecoes" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const whatsappValido = lojaConfig.whatsapp && lojaConfig.whatsapp !== "TODO";
  const whatsappUrl = whatsappValido
    ? `https://wa.me/${lojaConfig.whatsapp}?text=${encodeURIComponent("Olá, Ítalo! Gostaria de tirar dúvidas sobre as camisas da IC Sports.")}`
    : "#";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080C14]/95 backdrop-blur-md border-b border-[#1F2C44]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Marca / Logo */}
        <Logo size={42} />

        {/* Navegação Desktop */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold"
          aria-label="Navegação por ligas"
        >
          <Link
            href="/"
            className="px-3 py-2 text-[#94A3B8] hover:text-[#D4AF37] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Todas as Camisas
          </Link>
          {ligasPrincipais.map((liga) => (
            <Link
              key={liga.slug}
              href={`/liga/${liga.slug}`}
              className="px-3 py-2 text-[#94A3B8] hover:text-[#D4AF37] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {liga.nome}
            </Link>
          ))}
          <a
            href="#como-comprar"
            className="px-3 py-2 text-[#94A3B8] hover:text-[#D4AF37] transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Como Comprar
          </a>
        </nav>

        {/* CTA WhatsApp Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target={whatsappValido ? "_blank" : undefined}
            rel={whatsappValido ? "noopener noreferrer" : undefined}
            tabIndex={0}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
          >
            <Button
              className="bg-[#D4AF37] hover:bg-[#B89328] text-[#080C14] font-black tracking-wide gap-2 px-4 py-2.5 rounded-xl shadow-[0_4px_16px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Chamar no WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Menu Mobile (Sheet) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Botão rápido WhatsApp mobile */}
          <a
            href={whatsappUrl}
            target={whatsappValido ? "_blank" : undefined}
            rel={whatsappValido ? "noopener noreferrer" : undefined}
            aria-label="Falar com Ítalo Cauan no WhatsApp"
            className="sm:hidden p-2 text-[#D4AF37] hover:bg-[#172033] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <MessageCircle size={22} aria-hidden="true" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="p-2 text-[#F8FAFC] hover:bg-[#172033] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer inline-flex items-center justify-center transition-colors"
              aria-label="Abrir menu de navegação"
            >
              <Menu size={24} aria-hidden="true" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#101626] border-l border-[#1F2C44] w-[300px] sm:w-[360px] p-6 text-[#F8FAFC]"
            >
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="pb-6 border-b border-[#1F2C44]">
                    <Logo size={40} />
                  </div>

                  <div className="py-6">
                    <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-3">
                      Navegue por Ligas
                    </p>
                    <nav className="flex flex-col space-y-1.5" aria-label="Menu móvel de ligas">
                      <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#F8FAFC] hover:bg-[#172033] hover:text-[#D4AF37] transition-colors"
                      >
                        Todas as Camisas
                      </Link>
                      {ligasPrincipais.map((liga) => (
                        <Link
                          key={liga.slug}
                          href={`/liga/${liga.slug}`}
                          onClick={() => setOpen(false)}
                          className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:bg-[#172033] hover:text-[#D4AF37] transition-colors"
                        >
                          {liga.nome}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-6 pt-6 border-t border-[#1F2C44]">
                      <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-3">
                        Ajuda e Dúvidas
                      </p>
                      <nav className="flex flex-col space-y-1.5" aria-label="Menu móvel institucional">
                        <a
                          href="#como-comprar"
                          onClick={() => setOpen(false)}
                          className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:bg-[#172033] hover:text-[#D4AF37] transition-colors"
                        >
                          Como Comprar (3 Passos)
                        </a>
                        <a
                          href="#faq"
                          onClick={() => setOpen(false)}
                          className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:bg-[#172033] hover:text-[#D4AF37] transition-colors"
                        >
                          Perguntas Frequentes
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1F2C44]">
                  <a
                    href={whatsappUrl}
                    target={whatsappValido ? "_blank" : undefined}
                    rel={whatsappValido ? "noopener noreferrer" : undefined}
                    className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
                  >
                    <Button
                      className="w-full bg-[#D4AF37] hover:bg-[#B89328] text-[#080C14] font-black py-3 rounded-xl gap-2 shadow-lg"
                    >
                      <MessageCircle size={18} aria-hidden="true" />
                      Pedir pelo WhatsApp
                    </Button>
                  </a>
                  <p className="text-center text-xs text-[#94A3B8] mt-3">
                    Atendimento com {lojaConfig.responsavel}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
