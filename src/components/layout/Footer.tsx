import Link from "next/link";
import { MessageCircle, Clock, ShieldCheck, Truck } from "lucide-react";
import { lojaConfig } from "@/config/loja";
import { gerarLinkWhatsAppGeral } from "@/lib/whatsapp";

function InstagramIcon({ size = 18 }: { size?: number }) {
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
  const whatsappUrl = gerarLinkWhatsAppGeral();
  const instagramUrl = `https://instagram.com/${lojaConfig.instagram.replace("@", "")}`;

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 border-t-4 border-[#D10000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Grid Superior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#222222]">
          {/* Coluna 1: Marca & Apresentação */}
          <div className="space-y-4">
            <span className="font-athletic text-3xl font-black italic tracking-wider text-[#D10000]">
              IC <span className="text-white">SPORTS</span>
            </span>
            <p className="text-sm text-[#999999] leading-relaxed">
              O catálogo oficial de mantos de futebol da <strong className="text-white">IC Sports</strong>. Qualidade padrão oficial, atendimento direto no WhatsApp e envio seguro para todo o Brasil.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da IC Sports"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle size={18} aria-hidden="true" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da IC Sports"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="font-athletic text-xl font-bold tracking-wider text-[#D10000] uppercase">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-[#999999]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <Link href="/camisas" className="hover:text-white transition-colors">Catálogo de Camisas</Link>
              </li>
              <li>
                <Link href="/pronta-entrega" className="hover:text-white transition-colors">Pronta Entrega</Link>
              </li>
              <li>
                <Link href="/time/brasil" className="hover:text-white transition-colors">Seleções Mundiais</Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">Sobre a Loja</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Ajuda & Políticas */}
          <div className="space-y-3">
            <h4 className="font-athletic text-xl font-bold tracking-wider text-[#D10000] uppercase">
              Ajuda & Suporte
            </h4>
            <ul className="space-y-2 text-sm text-[#999999]">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">Tabela de Medidas</Link>
              </li>
              <li>
                <Link href="/politicas#trocas" className="hover:text-white transition-colors">Políticas de Troca</Link>
              </li>
              <li>
                <Link href="/politicas#envios" className="hover:text-white transition-colors">Prazos e Envios</Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">Horário de Atendimento</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Segurança */}
          <div className="space-y-3">
            <h4 className="font-athletic text-xl font-bold tracking-wider text-[#D10000] uppercase">
              Atendimento Direto
            </h4>
            <div className="space-y-2.5 text-sm text-[#999999]">
              <p className="flex items-start gap-2">
                <Clock size={16} className="text-[#D10000] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{lojaConfig.horarioAtendimento.semana}</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck size={16} className="text-[#D10000] shrink-0" aria-hidden="true" />
                <span>Envio rápido com rastreio Correios</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#D10000] shrink-0" aria-hidden="true" />
                <span>Atendimento pessoal com {lojaConfig.responsavel}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>© {new Date().getFullYear()} IC Sports · Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            <span>Desenvolvido para</span>
            <strong className="text-white">{lojaConfig.nomeLoja}</strong>
            <span>({lojaConfig.responsavel})</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
