import { Produto } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";

export function ProdutosRelacionados({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#E5E5E5] space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-athletic text-3xl font-black uppercase tracking-wider text-[#0A0A0A]">
          Quem viu este, também gostou
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {produtos.map((p) => (
          <CardProduto key={p.id} produto={p} />
        ))}
      </div>
    </section>
  );
}
