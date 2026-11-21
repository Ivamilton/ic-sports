import { AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lojaConfig } from "@/config/loja";

export function BannerErro() {
  const whatsappValido = lojaConfig.whatsapp && lojaConfig.whatsapp !== "TODO";
  const whatsappUrl = whatsappValido
    ? `https://wa.me/${lojaConfig.whatsapp}?text=${encodeURIComponent("Olá, Ítalo! Acessei o site da IC Sports e gostaria de consultar a lista atualizada de camisas disponíveis.")}`
    : "#";

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-amber-600/40 bg-gradient-to-r from-amber-950/40 via-[#101626] to-[#101626] p-5 sm:p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
          <AlertCircle size={24} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#F8FAFC]">
            Exibindo catálogo em modo de demonstração
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
            Não foi possível carregar a planilha online no momento. Consulte o estoque em tempo real com {lojaConfig.responsavel}.
          </p>
        </div>
      </div>

      <div className="shrink-0 w-full sm:w-auto">
        <a
          href={whatsappUrl}
          target={whatsappValido ? "_blank" : undefined}
          rel={whatsappValido ? "noopener noreferrer" : undefined}
          className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
        >
          <Button
            size="sm"
            className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#B89328] text-[#080C14] font-black gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>Consultar no WhatsApp</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
