import Link from "next/link";
import { Zap, History, Shirt, Trophy, Baby, ArrowUpRight } from "lucide-react";

const categorias = [
  {
    nome: "Pronta Entrega",
    sub: "Envio Imediato",
    tag: "ESTOQUE NO BRASIL",
    href: "/pronta-entrega",
    icone: Zap,
    corFundo: "bg-[#0A0A0A] text-white border-black",
    destaque: true,
  },
  {
    nome: "Versão Jogador",
    sub: "Padrão de Campo",
    tag: "ALTA PERFORMANCE",
    href: "/camisas?categoria=jogador",
    icone: Trophy,
    corFundo: "bg-white text-[#0A0A0A] border-[#E5E5E5]",
    destaque: false,
  },
  {
    nome: "Versão Torcedor",
    sub: "Conforto & Dia a Dia",
    tag: "CLÁSSICO",
    href: "/camisas?categoria=torcedor",
    icone: Shirt,
    corFundo: "bg-white text-[#0A0A0A] border-[#E5E5E5]",
    destaque: false,
  },
  {
    nome: "Mantos Retrô",
    sub: "Épocas Históricas",
    tag: "RARIDADES",
    href: "/camisas?categoria=retro",
    icone: History,
    corFundo: "bg-[#F4F4F4] text-[#0A0A0A] border-[#E5E5E5]",
    destaque: false,
  },
  {
    nome: "Linha Infantil",
    sub: "Para os Pequenos Craques",
    tag: "KIDS",
    href: "/camisas?categoria=infantil",
    icone: Baby,
    corFundo: "bg-white text-[#0A0A0A] border-[#E5E5E5]",
    destaque: false,
  },
];

export function ComprePorCategoria() {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F4F4] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
            Navegue por Estilo
          </span>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black uppercase tracking-wide text-[#0A0A0A]">
            Compre por Categoria
          </h2>
        </div>

        {/* Grid de Cards Grandes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categorias.map((cat) => {
            const Icon = cat.icone;
            return (
              <Link
                key={cat.nome}
                href={cat.href}
                className={`group relative p-5 sm:p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-102 ${cat.corFundo}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${cat.destaque ? "bg-[#D10000] text-white" : "bg-[#F4F4F4] text-[#D10000]"}`}>
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-[#999999] group-hover:text-[#D10000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${cat.destaque ? "text-[#D10000]" : "text-[#888888]"}`}>
                    {cat.tag}
                  </span>
                  <h3 className="font-athletic text-2xl font-black uppercase leading-tight tracking-wide">
                    {cat.nome}
                  </h3>
                </div>

                <p className="text-xs font-medium text-[#777777] mt-3">
                  {cat.sub}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
