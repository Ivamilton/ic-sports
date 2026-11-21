"use client";

import { MessageCircle } from "lucide-react";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

export function FloatingWhatsapp() {
  const url = gerarLinkWhatsAppGeral();

  return (
    <aside aria-label="Atendimento pelo WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Balão de chamada no desktop */}
      <div className="hidden sm:flex items-center mr-3 bg-white text-[#0A0A0A] font-bold text-xs px-3.5 py-2 rounded-full shadow-lg border border-[#E5E5E5] group-hover:scale-105 transition-transform">
        <span>Fale com {lojaConfig.responsavel}</span>
        <div className="w-2 h-2 bg-[#25D366] rounded-full ml-2 animate-ping" />
      </div>

      {/* Botão flutuante */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar atendimento da IC Sports no WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        <MessageCircle size={30} aria-hidden="true" />
      </a>
    </aside>
  );
}
