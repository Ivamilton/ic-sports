import { Suspense } from "react";
import { getProdutos } from "@/lib/getProducts";
import { CatalogoView } from "@/components/catalogo/CatalogoView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo Completo de Camisas de Futebol — IC Sports",
  description: "Navegue por todas as camisas nacionais, internacionais, retrô e infantis disponíveis na IC Sports.",
};

export default async function CamisasPage() {
  const produtos = await getProdutos();

  return (
    <Suspense fallback={<div className="p-16 text-center text-sm font-bold text-[#666666]">Carregando catálogo…</div>}>
      <CatalogoView produtosIniciais={produtos} />
    </Suspense>
  );
}
