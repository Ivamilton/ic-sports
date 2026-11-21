import Link from "next/link";
import { getProdutosProntaEntrega } from "@/lib/getProducts";
import { CardProduto } from "@/components/produto/CardProduto";
import { Zap, ChevronLeft, Truck } from "lucide-react";
import { lojaConfig } from "@/config/loja";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Pronta Entrega — ${lojaConfig.nomeLoja}`,
  description: `Camisas de futebol a pronta entrega com envio imediato no Brasil na ${lojaConfig.nomeLoja}.`,
};

export default async function ProntaEntregaPage() {
  const produtos = await getProdutosProntaEntrega();

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

      <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D10000] text-white font-black text-xs uppercase tracking-wider">
            <Zap size={14} aria-hidden="true" />
            <span>Estoque no Brasil</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide">
            Pronta Entrega
          </h1>
          <p className="text-sm text-[#CCCCCC] max-w-lg leading-relaxed">
            Peças já disponíveis em estoque com postagem em até 24 horas úteis. Sem esperar semanas de importação!
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
          <Truck size={32} className="text-[#D10000] shrink-0" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-black uppercase text-white">Postagem Imediata</p>
            <p className="text-[#CCCCCC]">Com código de rastreamento</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-[#666666] uppercase tracking-wider pb-2 border-b border-[#E5E5E5]">
        <span>Mostrando {produtos.length} modelos com estoque imediato</span>
      </div>

      {produtos.length === 0 ? (
        <div className="p-16 text-center bg-[#F9F9F9] rounded-2xl border border-dashed border-[#CCCCCC] space-y-4">
          <p className="font-athletic text-2xl font-bold uppercase text-[#0A0A0A]">
            Todas as peças de pronta entrega foram vendidas recentemente
          </p>
          <p className="text-xs sm:text-sm text-[#666666]">
            Fale com a gente no WhatsApp para conferir a data do próximo lote ou fazer uma encomenda.
          </p>
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
