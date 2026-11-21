import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProdutoPorSlug, getProdutosRelacionados, getProdutos } from "@/lib/getProducts";
import { DetalhesProdutoView } from "@/components/produto/DetalhesProdutoView";
import { lojaConfig } from "@/config/loja";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);

  if (!produto) {
    return {
      title: `Produto não encontrado — ${lojaConfig.nomeLoja}`,
    };
  }

  const precoFormatado = (produto.preco_promocional || produto.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return {
    title: `${produto.nome} (${produto.categoria}) — ${lojaConfig.nomeLoja}`,
    description: `Compre a ${produto.nome} por ${precoFormatado} na ${lojaConfig.nomeLoja}. Peça no WhatsApp com ${lojaConfig.responsavel}.`,
    openGraph: {
      title: `${produto.nome} — ${lojaConfig.nomeLoja}`,
      description: `${produto.time} (${produto.temporada}) por ${precoFormatado}. Peça no WhatsApp!`,
      images: produto.imagens.length > 0 ? [{ url: produto.imagens[0] }] : [],
    },
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);

  if (!produto) {
    notFound();
  }

  const relacionados = await getProdutosRelacionados(produto, 4);

  return <DetalhesProdutoView produto={produto} relacionados={relacionados} />;
}
