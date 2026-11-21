import { ShoppingBag, MessageSquareText, PackageCheck } from "lucide-react";
import { lojaConfig } from "@/config/loja";

const passos = [
  {
    numero: "01",
    icone: ShoppingBag,
    titulo: "Escolha seu Manto",
    descricao:
      "Navegue pelas ligas, clubes e seleções. Utilize os filtros de Torcedor ou Jogador para achar exatamente o modelo que você procura.",
  },
  {
    numero: "02",
    icone: MessageSquareText,
    titulo: "Peça pelo WhatsApp",
    descricao:
      "Ao clicar no botão de pedido, seu WhatsApp abrirá automaticamente com o modelo e tipo já pré-preenchidos na mensagem.",
  },
  {
    numero: "03",
    icone: PackageCheck,
    titulo: "Confirme com o Ítalo",
    descricao:
      `Converse diretamente com ${lojaConfig.responsavel} para confirmar a disponibilidade de tamanho (P, M, G, GG), forma de pagamento e prazo de entrega.`,
  },
];

export function ComoComprar() {
  return (
    <section id="como-comprar" className="py-20 md:py-28 bg-[#0B101C] border-y border-[#1F2C44]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da seção */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37]">
            Passo a Passo
          </span>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-[#F8FAFC] uppercase tracking-wide">
            Como Fazer Seu Pedido
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Processo 100% transparente e sem necessidade de cadastro.
            Você fala direto com a gente.
          </p>
        </div>

        {/* Grade de 3 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {passos.map((passo, idx) => {
            const Icon = passo.icone;
            return (
              <div
                key={passo.numero}
                className="relative rounded-2xl bg-[#101626] border border-[#1F2C44] p-8 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-athletic text-4xl sm:text-5xl font-black text-[#D4AF37]/30 tracking-tight">
                      {passo.numero}
                    </span>
                    <div className="p-3 rounded-xl bg-[#172033] border border-[#1F2C44] text-[#D4AF37]">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-3">
                    {passo.titulo}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {passo.descricao}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1F2C44]/50 flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <span>Etapa {idx + 1} de 3</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
