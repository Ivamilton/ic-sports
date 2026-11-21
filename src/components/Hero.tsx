import Image from "next/image";
import { MessageCircle, ShieldCheck, Flame, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lojaConfig } from "@/config/loja";

export function Hero() {
  const whatsappValido = lojaConfig.whatsapp && lojaConfig.whatsapp !== "TODO";
  const whatsappUrl = whatsappValido
    ? `https://wa.me/${lojaConfig.whatsapp}?text=${encodeURIComponent("Olá, Ítalo! Gostaria de consultar os modelos disponíveis na IC Sports.")}`
    : "#";

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#1F2C44]/60 bg-gradient-to-b from-[#0B101C] via-[#080C14] to-[#080C14]">
      {/* Luz ambiente de fundo (dourado e azul profundo) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#1E293B]/20 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#D4AF37]/40 shadow-sm">
            <Flame size={14} className="text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Coleção 2024 / 2025 · Estoque Imediato
            </span>
          </div>

          {/* Logo e Nome da Loja */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl scale-125 transition-transform group-hover:scale-150" />
              <Image
                src="/logo-ic-sports.svg"
                alt="Escudo oficial IC Sports"
                width={110}
                height={110}
                priority
                className="relative z-10 drop-shadow-[0_10px_25px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h1 className="font-athletic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F8FAFC] uppercase leading-none mt-2">
              IC <span className="text-[#D4AF37]">SPORTS</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl font-medium leading-relaxed">
              Bem-vindo ao catálogo oficial da <strong className="text-[#F8FAFC]">IC Sports</strong>.
              Aqui você encontra mantos dos maiores clubes do futebol mundial e seleções, com pedido
              prático e atendimento pessoal com <strong className="text-[#D4AF37]">{lojaConfig.responsavel}</strong>.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md pt-2">
            <a
              href="#catalogo"
              className="w-full sm:w-auto flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
            >
              <Button
                size="lg"
                className="w-full bg-[#D4AF37] hover:bg-[#B89328] text-[#080C14] font-black tracking-wide text-sm sm:text-base h-13 rounded-xl shadow-[0_6px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explorar Catálogo</span>
                <ArrowDown size={16} aria-hidden="true" />
              </Button>
            </a>

            <a
              href={whatsappUrl}
              target={whatsappValido ? "_blank" : undefined}
              rel={whatsappValido ? "noopener noreferrer" : undefined}
              className="w-full sm:w-auto flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-[#1F2C44] bg-[#101626]/80 text-[#F8FAFC] hover:bg-[#172033] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 font-bold text-sm sm:text-base h-13 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="text-[#D4AF37]" aria-hidden="true" />
                <span>Chamar no WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Diferenciais em Pílulas */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl text-left">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#101626]/70 border border-[#1F2C44]/80 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#F8FAFC]">Atendimento Direto</p>
                <p className="text-[11px] text-[#94A3B8]">Com {lojaConfig.responsavel}</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#101626]/70 border border-[#1F2C44]/80 flex items-center gap-3">
              <Flame size={20} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#F8FAFC]">Torcedor & Jogador</p>
                <p className="text-[11px] text-[#94A3B8]">Padrão oficial de tecido</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 sm:p-4 rounded-xl bg-[#101626]/70 border border-[#1F2C44]/80 flex items-center gap-3 justify-center sm:justify-start">
              <MessageCircle size={20} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#F8FAFC]">Sem Burocracia</p>
                <p className="text-[11px] text-[#94A3B8]">Pedido feito pelo WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
