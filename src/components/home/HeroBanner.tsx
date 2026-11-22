import Link from "next/link";
import { MessageCircle, ShieldCheck, Truck, CreditCard, ArrowRight, Shirt } from "lucide-react";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

export function HeroBanner() {
  const whatsappUrl = gerarLinkWhatsAppGeral("Olá, Ítalo! Gostaria de consultar os modelos disponíveis no catálogo da IF Legacy.");

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white border-b border-[#262626]">
      {/* Background estilizado com gradiente monocromático sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-white/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Tag de Coleção */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Shirt size={14} className="text-white" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest uppercase text-white">
              COLEÇÃO 2024 / 2025 · MANTOS OFICIAIS
            </span>
          </div>

          {/* Logo / Título Principal */}
          <div className="space-y-4">
            <h1 className="font-athletic text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none text-white whitespace-nowrap">
              O Seu Manto Sagrado Está Aqui
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#A3A3A3] max-w-2xl mx-auto font-medium leading-relaxed">
              Seleção exclusiva de camisas dos gigantes do futebol nacional, internacional e modelos retrô históricos.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/camisas"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A0A0A] font-black uppercase text-xs sm:text-sm tracking-wider rounded-2xl hover:bg-[#F5F5F5] transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Explorar Catálogo</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#171717] hover:bg-[#262626] border border-[#404040] text-white font-black uppercase text-xs sm:text-sm tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            >
              <MessageCircle size={18} className="text-[#25D366]" aria-hidden="true" />
              <span>Pedir no WhatsApp</span>
            </a>
          </div>

          {/* Destaques Rápidos */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <Truck size={22} className="text-white shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-white uppercase">Entrega Local</p>
                <p className="text-[11px] text-[#A3A3A3]">Na cidade e cidades próximas</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <CreditCard size={22} className="text-white shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-white uppercase">Pagamento Fácil</p>
                <p className="text-[11px] text-[#A3A3A3]">Pix ou em até 12x no cartão</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <ShieldCheck size={22} className="text-white shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-white uppercase">Qualidade Oficial</p>
                <p className="text-[11px] text-[#A3A3A3]">Acabamento e tecido de campo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
