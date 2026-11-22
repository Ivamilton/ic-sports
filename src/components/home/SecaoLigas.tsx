import Link from "next/link";

const ligas = [
  { nome: "Brasileirão Série A", slug: "brasileirao", pais: "Brasil", logo: "/ligas/brasileirao.svg" },
  { nome: "Premier League", slug: "premier-league", pais: "Inglaterra", logo: "/ligas/premier-league.svg" },
  { nome: "La Liga", slug: "la-liga", pais: "Espanha", logo: "/ligas/la-liga.svg" },
  { nome: "Champions League", slug: "champions-league", pais: "Europa", logo: "/ligas/champions-league.svg" },
  { nome: "Ligue 1", slug: "ligue-1", pais: "França", logo: "/ligas/ligue-1.svg" },
  { nome: "Seleções Mundiais", slug: "selecoes", pais: "Mundo", logo: "/ligas/selecoes.svg" },
];

export function SecaoLigas() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#737373]">
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
              className="group p-5 rounded-2xl bg-[#F5F5F5] hover:bg-[#0A0A0A] hover:text-white border border-[#E5E5E5] flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className="mx-auto mb-3 h-20 w-full rounded-xl bg-white flex items-center justify-center px-3 shadow-xs">
                <img
                  src={liga.logo}
                  alt={`Logo oficial da ${liga.nome}`}
                  className="max-h-16 max-w-[104px] w-auto h-auto object-contain"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737373] group-hover:text-[#A3A3A3] block">
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
