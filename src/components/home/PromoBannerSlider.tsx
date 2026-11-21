"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, Flame } from "lucide-react";
import promosData from "@/data/promos.json";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";

export function PromoBannerSlider() {
  const [ativo, setAtivo] = useState(0);

  // Troca automática a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setAtivo((prev) => (prev + 1) % promosData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const promoAtual = promosData[ativo] || promosData[0];
  const whatsappUrl = gerarLinkWhatsAppGeral(`Olá! Quero aproveitar a promoção: ${promoAtual.subtitulo}`);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div
        className={`relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center bg-gradient-to-r ${promoAtual.corFundo} px-6 py-12 transition-all duration-700`}
      >
        {/* Luz ambiente de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 animate-fade-in">
          {/* Badge de Oferta */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
            <Flame size={16} className="text-[#FACC15]" aria-hidden="true" />
            <span className="text-xs font-black tracking-widest uppercase text-white">
              {promoAtual.tag}
            </span>
          </div>

          {/* Título e Subtítulo */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-white/80">
              {promoAtual.titulo}
            </p>
            <h2 className="font-athletic text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tight uppercase leading-none drop-shadow-md text-white">
              {promoAtual.subtitulo}
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-medium pt-2 leading-relaxed">
              {promoAtual.descricao}
            </p>
          </div>

          {/* Botões do Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#D10000] font-black uppercase text-sm rounded-xl shadow-xl hover:bg-[#F4F4F4] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{promoAtual.ctaTexto}</span>
            </a>

            <Link
              href={promoAtual.ctaLink}
              className="w-full sm:w-auto px-6 py-3.5 bg-black/40 hover:bg-black/60 border border-white/30 text-white font-bold uppercase text-sm rounded-xl transition-all"
            >
              Ver Todas as Camisas
            </Link>
          </div>
        </div>

        {/* Setas de Navegação */}
        <button
          onClick={() => setAtivo((prev) => (prev - 1 + promosData.length) % promosData.length)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Banner anterior"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <button
          onClick={() => setAtivo((prev) => (prev + 1) % promosData.length)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Próximo banner"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        {/* Indicadores de pontinho (Dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {promosData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setAtivo(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                ativo === idx ? "w-8 bg-[#D10000]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir para banner ${idx + 1}`}
              aria-pressed={ativo === idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
