import { getProdutos } from "@/lib/getProducts";
import { PromoBannerSlider } from "@/components/home/PromoBannerSlider";
import { ComprePorTime } from "@/components/home/ComprePorTime";
import { ComprePorCategoria } from "@/components/home/ComprePorCategoria";
import { SecaoLigas } from "@/components/home/SecaoLigas";
import { MaisVendidos } from "@/components/home/MaisVendidos";
import { Depoimentos } from "@/components/home/Depoimentos";
import { MessageCircle, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";
import { lojaConfig } from "@/config/loja";

export default async function HomePage() {
  const produtos = await getProdutos();
  const whatsappUrl = gerarLinkWhatsAppGeral();

  return (
    <div>
      {/* 1. Banner Promocional Rotativo */}
      <PromoBannerSlider />

      {/* 2. Destaques de Vantagens Rápidas */}
      <section className="bg-white border-b border-[#E5E5E5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
              <Truck size={24} className="text-[#D10000] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase text-[#0A0A0A]">Envio Seguro</p>
                <p className="text-[11px] text-[#666666]">Com código de rastreio</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
              <MessageCircle size={24} className="text-[#D10000] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase text-[#0A0A0A]">Atendimento VIP</p>
                <p className="text-[11px] text-[#666666]">Direto com {lojaConfig.responsavel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
              <CreditCard size={24} className="text-[#D10000] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase text-[#0A0A0A]">Pagamento Fácil</p>
                <p className="text-[11px] text-[#666666]">Pix com 5% OFF ou até 12x</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
              <ShieldCheck size={24} className="text-[#D10000] shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase text-[#0A0A0A]">Qualidade Premium</p>
                <p className="text-[11px] text-[#666666]">Tecido e acabamento oficial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="bg-[#0A0A0A] text-white py-14 sm:py-20 border-t-2 border-[#D10000]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#D10000]">
            Não achou a camisa que procura?
          </span>
          <h2 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide">
            Faça sua Encomenda Especial no WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-[#999999] max-w-xl mx-auto leading-relaxed">
            Trabalhamos com mais de 300 modelos de clubes de todas as divisões e seleções históricas. Fale agora com {lojaConfig.responsavel} e consulte disponibilidade.
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
