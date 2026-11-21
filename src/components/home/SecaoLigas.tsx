import Link from "next/link";
import { Trophy } from "lucide-react";

const ligas = [
  { nome: "Brasileirão Série A", slug: "brasileirao", pais: "Brasil", cor: "from-green-600 to-emerald-800" },
  { nome: "Premier League", slug: "premier-league", pais: "Inglaterra", cor: "from-purple-700 to-indigo-900" },
  { nome: "La Liga", slug: "la-liga", pais: "Espanha", cor: "from-red-600 to-orange-700" },
  { nome: "Champions League", slug: "champions-league", pais: "Europa", cor: "from-blue-800 to-slate-900" },
  { nome: "Ligue 1", slug: "ligue-1", pais: "França", cor: "from-blue-600 to-indigo-800" },
  { nome: "Seleções Mundiais", slug: "selecoes", pais: "Mundo", cor: "from-yellow-500 to-amber-700" },
];

export function SecaoLigas() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
            Grandes Campeonatos
          </span>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A]">
            Principais Ligas
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ligas.map((liga) => (
            <Link
              key={liga.slug}
              href={`/camisas?liga=${encodeURIComponent(liga.nome)}`}
              className="group p-5 rounded-2xl bg-[#F4F4F4] hover:bg-[#0A0A0A] hover:text-white border border-[#E5E5E5] flex flex-col justify-between transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-white group-hover:bg-[#D10000] flex items-center justify-center shadow-xs transition-colors">
                <Trophy size={22} className="text-[#D10000] group-hover:text-white" aria-hidden="true" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] group-hover:text-[#CCCCCC] block">
                  {liga.pais}
                </span>
                <h3 className="font-athletic text-xl font-bold uppercase tracking-wide leading-tight mt-1 text-[#0A0A0A] group-hover:text-white">
                  {liga.nome}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
