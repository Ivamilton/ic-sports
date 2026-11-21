import { getProdutos } from "@/lib/getProdutos";
import { FiltrosProdutos } from "@/components/FiltrosProdutos";
import { BannerErro } from "@/components/BannerErro";
import { lojaConfig } from "@/config/loja";
import Link from "next/link";
import { ChevronLeft, Trophy } from "lucide-react";
import { Metadata } from "next";

const slugMap: Record<string, string> = {
  brasileirao: "Brasileirão",
  "la-liga": "La Liga",
  "premier-league": "Premier League",
  "ligue-1": "Ligue 1",
  selecoes: "Seleções",
  "serie-a": "Série A (Itália)",
  bundesliga: "Bundesliga",
};

function formatSlugToNome(slug: string): string {
  const normalizado = slug.toLowerCase();
  if (slugMap[normalizado]) return slugMap[normalizado];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nomeLiga = formatSlugToNome(slug);
  return {
    title: `Camisas de ${nomeLiga} — ${lojaConfig.nomeLoja}`,
    description: `Confira os mantos e camisas de ${nomeLiga} disponíveis na ${lojaConfig.nomeLoja}. Peça no WhatsApp com ${lojaConfig.responsavel}.`,
  };
}

export default async function LigaPage({ params }: PageProps) {
  const { slug } = await params;
  const nomeLiga = formatSlugToNome(slug);
  const { produtos, erro } = await getProdutos();

  // Filtra camisas que correspondam à liga
  const produtosDaLiga = produtos.filter((p) => {
    const ligaProd = p.liga.toLowerCase().trim();
    const termo = nomeLiga.toLowerCase().trim();
    const termoSlug = slug.replace(/-/g, " ").toLowerCase().trim();
    return ligaProd === termo || ligaProd.includes(termo) || ligaProd.includes(termoSlug);
  });

  const disponiveisCount = produtosDaLiga.filter((p) => p.estoque > 0).length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Botão de retorno */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-md px-2 py-1"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Voltar ao catálogo completo</span>
        </Link>
      </div>

      {erro && <BannerErro />}

      {/* Cabeçalho da Liga */}
      <div className="mb-10 pb-6 border-b border-[#1F2C44]/70">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
          <Trophy size={14} aria-hidden="true" />
          <span>Coleção por Campeonato</span>
        </div>
        <h1 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-black text-[#F8FAFC] uppercase tracking-wide">
          {nomeLiga}
        </h1>
        <p className="text-sm text-[#94A3B8] mt-2">
          {disponiveisCount} {disponiveisCount === 1 ? "camisa disponível" : "camisas disponíveis"} em estoque
        </p>
      </div>

      {/* Exibição dos produtos */}
      {produtosDaLiga.length === 0 ? (
        <div className="text-center py-20 bg-[#101626]/50 border border-dashed border-[#1F2C44] rounded-2xl p-8 space-y-4">
          <p className="text-lg font-bold text-[#F8FAFC]">
            Nenhuma camisa encontrada para {nomeLiga}.
          </p>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
            Novos modelos são adicionados periodicamente à nossa planilha. Você também pode consultar o Ítalo Cauan sobre encomendas desse campeonato.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#080C14] font-bold text-sm hover:bg-[#B89328] transition-colors"
            >
              Ver todas as camisas
            </Link>
          </div>
        </div>
      ) : (
        <FiltrosProdutos
          produtos={produtosDaLiga}
          ocultarFiltroLiga={true}
        />
      )}
    </main>
  );
}
