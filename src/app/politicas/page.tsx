import { ShieldCheck, Truck, RefreshCw, AlertCircle } from "lucide-react";
import { lojaConfig } from "@/config/loja";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Políticas de Troca e Envio — ${lojaConfig.nomeLoja}`,
  description: `Saiba como funcionam as trocas, garantias e entregas na ${lojaConfig.nomeLoja}.`,
};

export default function PoliticasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#737373]">
          Garantia & Transparência
        </span>
        <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
          Políticas de Troca e Entrega
        </h1>
        <p className="text-sm text-[#737373]">
          Nosso compromisso com a sua satisfação em cada pedido.
        </p>
      </div>

      <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] shadow-xs">
        {/* Seção 1: Envios e Prazos */}
        <section id="envios" className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-3">
            <div className="p-2 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]">
              <Truck size={22} aria-hidden="true" />
            </div>
            <h2 className="font-athletic text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
              1. Prazos e Modalidades de Entrega
            </h2>
          </div>

          <div className="space-y-3 text-sm text-[#525252] leading-relaxed">
            <p>
              Atualmente atendemos com entrega ágil na cidade e regiões próximas. Todos os detalhes e opções de retirada ou entrega são alinhados diretamente via WhatsApp.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pronta Entrega:</strong> Peças disponíveis em nosso estoque físico local têm entrega ou disponibilização para retirada em até <strong>24 horas úteis</strong>.
              </li>
              <li>
                <strong>Encomendas Especiais / Sob Pedido:</strong> Para modelos sob encomenda personalizada, o prazo estimado é de <strong>10 a 20 dias úteis</strong>, com acompanhamento passo a passo no WhatsApp.
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 2: Políticas de Troca e Devolução */}
        <section id="trocas" className="space-y-4 pt-6 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-3">
            <div className="p-2 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]">
              <RefreshCw size={22} aria-hidden="true" />
            </div>
            <h2 className="font-athletic text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
              2. Trocas e Garantia
            </h2>
          </div>

          <div className="space-y-3 text-sm text-[#525252] leading-relaxed">
            <p>
              Prezamos pela qualidade impecável dos nossos mantos. Caso ocorra qualquer divergência:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Defeito de Fabricação:</strong> Troca imediata e gratuita garantida pela IF Legacy. O prazo para solicitação é de até <strong>7 dias corridos</strong> após o recebimento.
              </li>
              <li>
                <strong>Troca por Tamanho:</strong> Realizamos a troca caso o tamanho escolhido não fique adequado, desde que o produto esteja sem marcas de uso, com etiquetas intactas e na embalagem original.
              </li>
              <li>
                <strong>Camisas Personalizadas:</strong> Camisas com nome e número personalizados sob encomenda só possuem troca em caso de defeito comprovado de confecção.
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 3: Como solicitar */}
        <section className="space-y-4 pt-6 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-3">
            <div className="p-2 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h2 className="font-athletic text-2xl sm:text-3xl font-bold uppercase text-[#0A0A0A]">
              3. Como Solicitar Suporte
            </h2>
          </div>

          <p className="text-sm text-[#525252] leading-relaxed">
            Basta enviar uma mensagem no WhatsApp oficial da loja. O responsável <strong className="text-[#0A0A0A]">{lojaConfig.responsavel}</strong> dará retorno imediato para solucionar qualquer questão.
          </p>
        </section>
      </div>
    </div>
  );
}
