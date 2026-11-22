import { ShieldCheck, Truck, MessageCircle, CreditCard, Sparkles, Shirt } from "lucide-react";

const itensTicker = [
  { texto: "COMPRA 100% SEGURA", icone: ShieldCheck },
  { texto: "ATENDIMENTO DIRETO NO WHATSAPP", icone: MessageCircle },
  { texto: "ENTREGA NA CIDADE E REGIÕES PRÓXIMAS", icone: Truck },
  { texto: "QUALIDADE PADRÃO OFICIAL", icone: Sparkles },
  { texto: "PARCELAMENTO EM ATÉ 12X", icone: CreditCard },
  { texto: "MANTOS NACIONAIS, INTERNACIONAIS E RETRÔ", icone: Shirt },
];

export function TopTicker() {
  return (
    <div className="bg-[#0A0A0A] text-white py-2 overflow-hidden border-b border-[#262626] text-xs font-bold tracking-wider select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Bloco 1 */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {itensTicker.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div key={`a-${idx}`} className="flex items-center gap-2">
                <Icon size={14} className="text-white" aria-hidden="true" />
                <span className="uppercase text-[11px] sm:text-xs tracking-wider text-[#F5F5F5]">{item.texto}</span>
                <span className="text-[#737373] mx-2">•</span>
              </div>
            );
          })}
        </div>

        {/* Bloco 2 duplicado para looping infinito */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {itensTicker.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div key={`b-${idx}`} className="flex items-center gap-2">
                <Icon size={14} className="text-white" aria-hidden="true" />
                <span className="uppercase text-[11px] sm:text-xs tracking-wider text-[#F5F5F5]">{item.texto}</span>
                <span className="text-[#737373] mx-2">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
