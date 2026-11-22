import { Star, CheckCircle } from "lucide-react";
import depoimentosData from "@/data/depoimentos.json";

export function Depoimentos() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#737373]">
            Avaliações Reais
          </span>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A]">
            Clientes Satisfeitos
          </h2>
          <p className="text-sm text-[#737373]">
            Mais de 1.500 mantos entregues na cidade e região. Veja o que diz quem já pediu na IF Legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {depoimentosData.map((dep) => (
            <div
              key={dep.id}
              className="p-6 rounded-2xl bg-[#F9F9F9] border border-[#E5E5E5] flex flex-col justify-between space-y-4 hover:border-black transition-colors shadow-xs"
            >
              <div className="space-y-3">
                {/* Estrelas */}
                <div className="flex items-center gap-1 text-[#0A0A0A]">
                  {Array.from({ length: dep.estrelas }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>

                <p className="text-xs text-[#333333] italic leading-relaxed">
                  "{dep.comentario}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAEAEA]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1">
                      <span>{dep.nome}</span>
                      <CheckCircle size={12} className="text-[#0A0A0A] inline" aria-label="Comprador verificado" />
                    </p>
                    <p className="text-[11px] text-[#777777]">{dep.cidade}</p>
                  </div>
                  <span className="text-[10px] text-[#999999]">{dep.data}</span>
                </div>
                <p className="text-[10px] font-bold text-[#0A0A0A] mt-1 truncate">
                  Camisa: {dep.camisa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
