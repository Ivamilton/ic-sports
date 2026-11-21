import { verificarStatusAtendimento } from "@/lib/horarioAtendimento";
import { lojaConfig } from "@/config/loja";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { MessageCircle, Clock, MapPin, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: `Sobre e Contato — ${lojaConfig.nomeLoja}`,
  description: `Conheça a história da ${lojaConfig.nomeLoja}, horários de atendimento e canais de contato com ${lojaConfig.responsavel}.`,
};

export default function SobrePage() {
  const status = verificarStatusAtendimento();
  const whatsappUrl = gerarLinkWhatsAppGeral();
  const instagramUrl = `https://instagram.com/${lojaConfig.instagram.replace("@", "")}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Título Principal */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
          Quem Somos & Contato
        </span>
        <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
          Sobre a {lojaConfig.nomeLoja}
        </h1>
        <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
          Nascemos da paixão por futebol e colecionismo de camisas de time, oferecendo o padrão que todo torcedor merece.
        </p>
      </div>

      {/* Grid de Apresentação e Status de Atendimento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Card de Status de Atendimento em Tempo Real (America/Fortaleza) */}
        <div className="md:col-span-1 p-6 rounded-3xl bg-[#0A0A0A] text-white space-y-6 shadow-xl border border-black">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D10000]">
              Status de Atendimento
            </span>
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  status.aberto ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                }`}
              />
              <h2 className="font-athletic text-2xl font-bold uppercase tracking-wider">
                {status.aberto ? "Aberto Agora" : "Fechado Agora"}
              </h2>
            </div>
            <p className="text-xs text-[#AAAAAA] leading-relaxed">
              {status.mensagem}
            </p>
            <p className="text-[11px] font-semibold text-[#777777] pt-1">
              {status.horarioAtualFormatado}
            </p>
          </div>

          <div className="pt-4 border-t border-[#222222] space-y-3 text-xs">
            <p className="font-bold text-white uppercase tracking-wider">Horários Oficiais:</p>
            <p className="text-[#AAAAAA]">
              <strong>Seg - Sex:</strong> 09:00 às 19:00
            </p>
            <p className="text-[#AAAAAA]">
              <strong>Sábado:</strong> 09:00 às 14:00
            </p>
            <p className="text-[#AAAAAA]">
              <strong>Domingo:</strong> Fechado (pedidos recebidos serão atendidos no próximo dia útil)
            </p>
          </div>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Informações da Loja e História */}
        <div className="md:col-span-2 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] shadow-xs">
          <div className="space-y-4">
            <h3 className="font-athletic text-3xl font-black uppercase tracking-wider text-[#0A0A0A]">
              Nossa Proposta
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              A <strong className="text-[#0A0A0A]">{lojaConfig.nomeLoja}</strong>, liderada por <strong className="text-[#D10000]">{lojaConfig.responsavel}</strong>, foi criada para atender torcedores e colecionadores exigentes. Selecionamos apenas mantos com tecido de alta tecnologia, costuras reforçadas e escudos com acabamento idêntico ao oficial das marcas esportivas mundiais.
            </p>
            <p className="text-sm text-[#555555] leading-relaxed">
              Diferente de grandes sites automatizados e impessoais, nosso modelo é focado em <strong>atendimento consultivo pelo WhatsApp</strong>: conferimos as medidas exatas da camisa com você antes de enviar, enviamos fotos e códigos de rastreio para garantir que seu manto chegue perfeito.
            </p>
          </div>

          {/* Dados de Contato Direto */}
          <div className="pt-6 border-t border-[#E5E5E5] space-y-4">
            <h4 className="font-athletic text-2xl font-bold uppercase tracking-wider text-[#0A0A0A]">
              Canais Oficiais
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#444444]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#F9F9F9] hover:bg-[#F0FDF4] border border-[#EBEBEB] flex items-center gap-3 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-[#25D366] text-white">
                  <MessageCircle size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] text-[#888888] uppercase">WhatsApp Direto</p>
                  <p className="text-sm font-bold text-[#0A0A0A]">{lojaConfig.whatsapp}</p>
                </div>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#F9F9F9] hover:bg-[#FDF2F8] border border-[#EBEBEB] flex items-center gap-3 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-[#E1306C] text-white">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-[#888888] uppercase">Instagram Oficial</p>
                  <p className="text-sm font-bold text-[#0A0A0A]">{lojaConfig.instagram}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
