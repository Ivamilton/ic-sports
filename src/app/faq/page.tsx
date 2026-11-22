import { Ruler, HelpCircle, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { lojaConfig } from "@/config/loja";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tabela de Medidas e FAQ — ${lojaConfig.nomeLoja}`,
  description: `Guia de tamanhos em centímetros e respostas para as principais dúvidas sobre pedidos na ${lojaConfig.nomeLoja}.`,
};

const perguntasFrequentes = [
  {
    p: "Como sei qual é o meu tamanho ideal?",
    r: "Recomendamos medir uma camisa sua que você gosta do caimento. Meça a largura de axila a axila e o comprimento da gola até a barra inferior, comparando com nossa tabela abaixo. Na versão Jogador, que é mais ajustada ao corpo, sugerimos um tamanho acima caso você prefira um caimento mais solto.",
  },
  {
    p: "Como funciona a compra sem pagamento no site?",
    r: "Nosso foco é a conveniência e o atendimento pessoal: você escolhe a camisa e clica em 'Comprar no WhatsApp'. O WhatsApp abre já com o modelo e tamanho preenchidos. Você confirma a disponibilidade e detalhes com o Ítalo Cauan e combina o pagamento (Pix ou Cartão) e a entrega.",
  },
  {
    p: "Como funciona a entrega?",
    r: "Atendemos a cidade e regiões próximas com entrega rápida ou retirada a combinar. Fale diretamente no WhatsApp com o Ítalo Cauan para alinhar o local de entrega.",
  },
  {
    p: "As camisas possuem garantia?",
    r: "Sim! Garantimos a qualidade do tecido, costura e escudos oficiais. Caso haja qualquer defeito de fabricação, realizamos a troca sem nenhum custo adicional em até 7 dias após o recebimento.",
  },
  {
    p: "Vocês fazem personalização com nome e número?",
    r: "Sim! Podemos estampar o nome e número oficial que você desejar na maioria dos modelos sob encomenda. Basta informar os dados desejados durante a conversa no WhatsApp.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#737373]">
          Guia de Compras
        </span>
        <h1 className="font-athletic text-4xl sm:text-6xl font-black uppercase tracking-wide text-[#0A0A0A]">
          Tabela de Medidas & FAQ
        </h1>
        <p className="text-sm text-[#737373]">
          Tudo o que você precisa saber para acertar no tamanho e no seu pedido.
        </p>
      </div>

      {/* 1. Guia de Medidas Detalhado */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] space-y-8 shadow-xs">
        <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
          <div className="p-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]">
            <Ruler size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-athletic text-3xl font-black uppercase text-[#0A0A0A]">
              Tabela de Medidas Oficial (cm)
            </h2>
            <p className="text-xs text-[#737373]">
              Medidas aproximadas com margem de tolerância de até 1 a 2 cm.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tabela Torcedor */}
          <div>
            <h3 className="font-athletic text-xl font-bold uppercase text-[#0A0A0A] mb-2">
              Versão Torcedor (Modelagem Padrão / Reta)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#E5E5E5] rounded-xl overflow-hidden">
                <thead className="bg-[#0A0A0A] text-white font-bold">
                  <tr>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Largura (Peito)</th>
                    <th className="p-3">Comprimento (Altura)</th>
                    <th className="p-3">Peso Sugerido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] font-semibold text-[#333333]">
                  <tr className="bg-white"><td className="p-3 font-bold">P</td><td className="p-3">50 - 52 cm</td><td className="p-3">69 - 71 cm</td><td className="p-3">50 - 65 kg</td></tr>
                  <tr className="bg-[#F9F9F9]"><td className="p-3 font-bold">M</td><td className="p-3">53 - 55 cm</td><td className="p-3">71 - 73 cm</td><td className="p-3">65 - 75 kg</td></tr>
                  <tr className="bg-white"><td className="p-3 font-bold">G</td><td className="p-3">56 - 58 cm</td><td className="p-3">73 - 75 cm</td><td className="p-3">75 - 85 kg</td></tr>
                  <tr className="bg-[#F9F9F9]"><td className="p-3 font-bold">GG</td><td className="p-3">59 - 61 cm</td><td className="p-3">75 - 77 cm</td><td className="p-3">85 - 95 kg</td></tr>
                  <tr className="bg-white"><td className="p-3 font-bold">XG</td><td className="p-3">62 - 64 cm</td><td className="p-3">77 - 79 cm</td><td className="p-3">95 - 110 kg</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabela Jogador */}
          <div>
            <h3 className="font-athletic text-xl font-bold uppercase text-[#0A0A0A] mb-2">
              Versão Jogador (Modelagem Atlética / Ajustada)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#E5E5E5] rounded-xl overflow-hidden">
                <thead className="bg-[#0A0A0A] text-white font-bold">
                  <tr>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Largura</th>
                    <th className="p-3">Comprimento</th>
                    <th className="p-3">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] font-semibold text-[#333333]">
                  <tr className="bg-white"><td className="p-3 font-bold">P</td><td className="p-3">48 - 50 cm</td><td className="p-3">68 - 70 cm</td><td className="p-3">Mais justa</td></tr>
                  <tr className="bg-[#F9F9F9]"><td className="p-3 font-bold">M</td><td className="p-3">51 - 53 cm</td><td className="p-3">70 - 72 cm</td><td className="p-3">Mais justa</td></tr>
                  <tr className="bg-white"><td className="p-3 font-bold">G</td><td className="p-3">54 - 56 cm</td><td className="p-3">72 - 74 cm</td><td className="p-3">Mais justa</td></tr>
                  <tr className="bg-[#F9F9F9]"><td className="p-3 font-bold">GG</td><td className="p-3">57 - 59 cm</td><td className="p-3">74 - 76 cm</td><td className="p-3">Mais justa</td></tr>
                  <tr className="bg-white"><td className="p-3 font-bold">XG</td><td className="p-3">60 - 62 cm</td><td className="p-3">76 - 78 cm</td><td className="p-3">Mais justa</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Perguntas Frequentes (Accordion) */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] space-y-6 shadow-xs">
        <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
          <div className="p-2.5 rounded-xl bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]">
            <HelpCircle size={24} aria-hidden="true" />
          </div>
          <h2 className="font-athletic text-3xl font-black uppercase text-[#0A0A0A]">
            Dúvidas Frequentes
          </h2>
        </div>

        <Accordion className="space-y-3">
          {perguntasFrequentes.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-[#E5E5E5] pb-3">
              <AccordionTrigger className="text-left font-bold text-sm text-[#0A0A0A] hover:text-[#525252]">
                {item.p}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[#525252] leading-relaxed pt-1">
                {item.r}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
