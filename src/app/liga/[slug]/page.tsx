import Link from "next/link";
import { getProdutosPorLiga, Produto } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { ChevronLeft, Trophy } from "lucide-react";
import { lojaConfig } from "@/config/loja";
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
  const produtos = await getProdutosPorLiga(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div>
        <Link
          href="/camisas"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737373] hover:text-[#0A0A0A] transition-colors"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Voltar ao catálogo geral</span>
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E5E5] space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0A0A0A]">
          <Trophy size={14} aria-hidden="true" />
          <span>Coleção por Campeonato</span>
        </div>
        <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
          {nomeLiga}
        </h1>
        <p className="text-xs sm:text-sm text-[#737373]">
          {produtos.length} {produtos.length === 1 ? "manto disponível" : "mantos disponíveis"} nesta liga
        </p>
      </div>

      {produtos.length === 0 ? (
        <div className="p-16 text-center bg-[#F5F5F5] rounded-2xl border border-dashed border-[#E5E5E5] space-y-4">
          <p className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
            Nenhuma camisa encontrada para {nomeLiga}
          </p>
          <p className="text-xs sm:text-sm text-[#737373] max-w-md mx-auto">
            Novos modelos chegam semanalmente. Fale com {lojaConfig.responsavel} no WhatsApp para encomendar modelos específicos deste campeonato.
          </p>
          <Link
            href="/camisas"
            className="inline-block px-6 py-3 bg-[#0A0A0A] hover:bg-[#262626] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {produtos.map((p: Produto) => (
            <CardProduto key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
