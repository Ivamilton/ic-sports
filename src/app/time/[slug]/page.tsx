import Link from "next/link";
import { getProdutosPorTime, getProdutos } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { ChevronLeft, Trophy } from "lucide-react";
import { lojaConfig } from "@/config/loja";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatarSlugParaNome(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nomeTime = formatarSlugParaNome(slug);
  return {
    title: `Camisas do ${nomeTime} — ${lojaConfig.nomeLoja}`,
    description: `Confira todos os mantos e camisas do ${nomeTime} disponíveis para compra na ${lojaConfig.nomeLoja}.`,
  };
}

export default async function TimePage({ params }: PageProps) {
  const { slug } = await params;
  const nomeTime = formatarSlugParaNome(slug);
  const produtos = await getProdutosPorTime(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div>
        <Link
          href="/camisas"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#666666] hover:text-[#D10000] transition-colors"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Voltar ao catálogo geral</span>
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E5E5] space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#D10000]">
          <Trophy size={14} aria-hidden="true" />
          <span>Coleção Oficial</span>
        </div>
        <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
          {nomeTime}
        </h1>
        <p className="text-xs sm:text-sm text-[#666666]">
          {produtos.length} {produtos.length === 1 ? "manto disponível" : "mantos disponíveis"} deste clube / seleção
        </p>
      </div>

      {produtos.length === 0 ? (
        <div className="p-16 text-center bg-[#F9F9F9] rounded-2xl border border-dashed border-[#CCCCCC] space-y-4">
          <p className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
            Nenhuma camisa cadastrada no momento para {nomeTime}
          </p>
          <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto">
            Gostaria de encomendar este manto? Entre em contato diretamente no WhatsApp do Ítalo Cauan.
          </p>
          <Link
            href="/camisas"
            className="inline-block px-6 py-3 bg-[#D10000] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
          >
            Ver outros clubes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {produtos.map((p) => (
            <CardProduto key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
