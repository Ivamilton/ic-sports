import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { lojaConfig } from "@/config/loja";

const faqs = [
  {
    id: "pedido-whatsapp",
    pergunta: "Como funciona o pedido pelo WhatsApp?",
    resposta:
      "É muito simples: ao navegar pelo nosso catálogo, basta clicar no botão 'Pedir no WhatsApp' na camisa desejada. Uma mensagem automática já sairá montada no seu WhatsApp informando o modelo e o tipo (Torcedor ou Jogador). Você só precisa enviar para o Ítalo Cauan e combinar o tamanho e envio.",
  },
  {
    id: "torcedor-vs-jogador",
    pergunta: "Qual a diferença entre a versão Torcedor e Jogador?",
    resposta:
      "A versão Torcedor é confeccionada para o uso diário e casual, com escudo e logo bordados e modelagem reta confortável. A versão Jogador é exatamente a que os atletas usam em campo: tecido mais leve e tecnológico para máxima respiração, escudo silkado/termotransferido emborrachado e corte mais atlético e ajustado ao corpo.",
  },
  {
    id: "tamanhos",
    pergunta: "Quais os tamanhos disponíveis?",
    resposta:
      "Normalmente trabalhamos com tamanhos do P ao GG (e alguns modelos no XGG). Como o estoque gira rápido, ao chamar no WhatsApp o Ítalo confirma na hora quais tamanhos estão em estoque para o modelo que você quer.",
  },
  {
    id: "pagamento",
    pergunta: "Quais são as formas de pagamento aceitas?",
    resposta:
      lojaConfig.formasPagamento[0] !== "TODO"
        ? `Aceitamos ${lojaConfig.formasPagamento.join(", ")}. Todos os detalhes e comprovantes são combinados com segurança no WhatsApp.`
        : "Aceitamos Pix, cartão de crédito e demais formas facilitadas. As opções e condições de parcelamento são informadas diretamente no WhatsApp.",
  },
  {
    id: "entrega",
    pergunta: "Qual o prazo de entrega e como é feito o envio?",
    resposta:
      lojaConfig.prazoEntrega !== "TODO"
        ? `Nosso prazo padrão é ${lojaConfig.prazoEntrega}. Enviamos com código de rastreio para você acompanhar tudo até a chegada em sua casa.`
        : "Realizamos envios para todo o Brasil via Correios / transportadoras com código de rastreamento. O prazo e o frete exatos são calculados de acordo com o seu CEP durante a conversa no WhatsApp.",
  },
  {
    id: "esgotados",
    pergunta: "Posso encomendar uma camisa que aparece como esgotada?",
    resposta:
      "Sim! Se o modelo que você procura está marcado como 'Esgotado', fale diretamente com o Ítalo Cauan no WhatsApp. Muitas vezes temos reposição programada ou podemos fazer a encomenda especial para você.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#080C14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37]">
            Dúvidas Frequentes
          </span>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-[#F8FAFC] uppercase tracking-wide">
            Perguntas & Respostas
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Tire todas as suas dúvidas sobre nossos mantos, processo de pedido e atendimento.
          </p>
        </div>

        <div className="bg-[#101626] border border-[#1F2C44] rounded-2xl p-6 sm:p-8 shadow-sm">
          <Accordion className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-[#1F2C44]/70 last:border-b-0 pb-3.5"
              >
                <AccordionTrigger className="text-[#F8FAFC] hover:text-[#D4AF37] text-left font-bold text-base py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg">
                  {faq.pergunta}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#94A3B8] leading-relaxed pt-1 pb-3">
                  {faq.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
