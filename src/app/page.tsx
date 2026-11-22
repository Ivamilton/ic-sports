import { getProdutos } from "@/lib/getProducts";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ComprePorTime } from "@/components/home/ComprePorTime";
import { ComprePorCategoria } from "@/components/home/ComprePorCategoria";
import { SecaoLigas } from "@/components/home/SecaoLigas";
import { MaisVendidos } from "@/components/home/MaisVendidos";
import { Depoimentos } from "@/components/home/Depoimentos";
import { MessageCircle } from "lucide-react";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const produtos = await getProdutos();
  const whatsappUrl = gerarLinkWhatsAppGeral();

  return (
    <div>
      {/* 1. Hero Principal da Loja (Sem banner de promoção) */}
      <HeroBanner />

      {/* 3. Seção Compre por Time (com Abas) */}
      <ComprePorTime produtos={produtos} />

      {/* 4. Seção Compre por Categoria em Cards Grandes */}
      <ComprePorCategoria />

      {/* 5. Seção Ligas */}
      <SecaoLigas />

      {/* 6. Mais Vendidos (Abas Nacionais / Internacionais) */}
      <MaisVendidos produtos={produtos} />

      {/* 7. Depoimentos (Clientes Satisfeitos) */}
      <Depoimentos />

      {/* 8. Faixa de Fechamento com Chamada WhatsApp */}
      <section className="bg-[#0A0A0A] text-white py-14 sm:py-20 border-t border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#A3A3A3]">
            Não achou a camisa que procura?
          </span>
          <h2 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide">
            Faça sua Encomenda no WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-[#A3A3A3] max-w-xl mx-auto leading-relaxed">
            Trabalhamos com mais de 300 modelos de clubes e seleções históricas. Fale agora com {lojaConfig.responsavel} e consulte a disponibilidade para entrega na sua região.
          </p>
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span>Chamar no WhatsApp Agora</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
