import Link from "next/link";
import { MessageCircle, Clock, CreditCard, Truck, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { lojaConfig } from "@/config/loja";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const whatsappValido = lojaConfig.whatsapp && lojaConfig.whatsapp !== "TODO";
  const whatsappUrl = whatsappValido
    ? `https://wa.me/${lojaConfig.whatsapp}?text=${encodeURIComponent("Olá, Ítalo! Gostaria de falar com o atendimento da IC Sports.")}`
    : "#";

  const instagramValido = lojaConfig.instagram && lojaConfig.instagram !== "TODO";
  const instagramUser = instagramValido ? lojaConfig.instagram.replace("@", "") : "";
  const instagramUrl = instagramValido ? `https://instagram.com/${instagramUser}` : "#";

  return (
    <footer className="bg-[#06090F] border-t border-[#1F2C44] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Coluna 1: Apresentação da Loja */}
          <div className="space-y-4 lg:col-span-1">
            <Logo size={46} />
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              A <strong className="text-[#F8FAFC]">{lojaConfig.nomeLoja}</strong> é o seu catálogo especializado em camisas de futebol internacionais, nacionais e de seleções. Qualidade de tecido, detalhes oficiais e atendimento exclusivo.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold pt-1">
              <User size={14} aria-hidden="true" />
              <span>Responsável: {lojaConfig.responsavel}</span>
            </div>
          </div>

          {/* Coluna 2: Ligas e Navegação */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Ligas Principais
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/liga/brasileirao"
                  className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  Brasileirão Série A
                </Link>
              </li>
              <li>
                <Link
                  href="/liga/la-liga"
                  className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  La Liga (Espanha)
                </Link>
              </li>
              <li>
                <Link
                  href="/liga/premier-league"
                  className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  Premier League (Inglaterra)
                </Link>
              </li>
              <li>
                <Link
                  href="/liga/ligue-1"
                  className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  Ligue 1 (França)
                </Link>
              </li>
              <li>
                <Link
                  href="/liga/selecoes"
                  className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  Seleções Mundiais
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento e Contato */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Atendimento Direto
            </p>
            <div className="space-y-2.5 text-sm text-[#94A3B8]">
              {whatsappValido ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#F8FAFC] hover:text-[#D4AF37] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  <MessageCircle size={16} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {lojaConfig.whatsapp}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2.5">
                  <MessageCircle size={16} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>WhatsApp: Sob consulta</span>
                </div>
              )}

              {instagramValido ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#F8FAFC] hover:text-[#D4AF37] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                >
                  <InstagramIcon size={16} />
                  <span>{lojaConfig.instagram}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2.5">
                  <InstagramIcon size={16} />
                  <span>Instagram: Sob consulta</span>
                </div>
              )}

              <div className="flex items-center gap-2.5 pt-1">
                <Clock size={16} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span>
                  {lojaConfig.horario !== "TODO"
                    ? lojaConfig.horario
                    : "Atendimento diário via WhatsApp"}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Informações de Pagamento e Envio */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Pagamento & Envio
            </p>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <div className="flex items-start gap-2.5">
                <CreditCard size={16} className="text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#F8FAFC] font-semibold text-xs uppercase tracking-wider">
                    Formas de Pagamento
                  </p>
                  <p className="text-xs mt-0.5">
                    {lojaConfig.formasPagamento[0] !== "TODO"
                      ? lojaConfig.formasPagamento.join(", ")
                      : "Pix, Cartão de Crédito e Transferência"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck size={16} className="text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#F8FAFC] font-semibold text-xs uppercase tracking-wider">
                    Prazo de Entrega
                  </p>
                  <p className="text-xs mt-0.5">
                    {lojaConfig.prazoEntrega !== "TODO"
                      ? lojaConfig.prazoEntrega
                      : "Consultar com o CEP no WhatsApp"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé inferior com Copyright e Responsável */}
        <div className="mt-14 pt-8 border-t border-[#1F2C44]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>
            © {new Date().getFullYear()} <strong className="text-[#94A3B8]">{lojaConfig.nomeLoja}</strong>. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Responsável comercial:</span>
            <strong className="text-[#D4AF37]">{lojaConfig.responsavel}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
