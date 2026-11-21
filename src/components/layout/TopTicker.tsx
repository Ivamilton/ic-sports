import { ShieldCheck, Truck, MessageCircle, CreditCard, Flame } from "lucide-react";

const itensTicker = [
  { texto: "COMPRA 100% SEGURA", icone: ShieldCheck },
  { texto: "ATENDIMENTO DIRETO NO WHATSAPP", icone: MessageCircle },
  { texto: "ENVIO PARA TODO O BRASIL", icone: Truck },
  { texto: "PARCELAMENTO EM ATÉ 12X", icone: CreditCard },
  { texto: "PROMOÇÃO: PAGUE 3, LEVE 5", icone: Flame },
  { texto: "QUALIDADE PADRÃO OFICIAL", icone: ShieldCheck },
];

export function TopTicker() {
  return (
    <div className="bg-[#0A0A0A] text-white py-2 overflow-hidden border-b border-black text-xs font-bold tracking-wider select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Bloco 1 */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {itensTicker.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div key={`a-${idx}`} className="flex items-center gap-2">
                <Icon size={14} className="text-[#D10000]" aria-hidden="true" />
                <span className="uppercase text-[11px] sm:text-xs tracking-wider">{item.texto}</span>
                <span className="text-[#D10000] mx-2">•</span>
              </div>
            );
          })}
        </div>

        {/* Bloco 2 duplicado para looping infinito perfeito */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {itensTicker.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div key={`b-${idx}`} className="flex items-center gap-2">
                <Icon size={14} className="text-[#D10000]" aria-hidden="true" />
                <span className="uppercase text-[11px] sm:text-xs tracking-wider">{item.texto}</span>
                <span className="text-[#D10000] mx-2">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
