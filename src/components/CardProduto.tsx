import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShieldAlert } from "lucide-react";
import { Produto, getPlaceholderImage } from "@/data/exemplo";
import { lojaConfig } from "@/config/loja";

const precoFormatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CardProduto({ produto, priority = false }: { produto: Produto; priority?: boolean }) {
  const isEsgotado = produto.estoque <= 0;
  const isUltimasUnidades = produto.estoque >= 1 && produto.estoque <= 3;

  // Mensagem obrigatória: "Olá! Quero pedir a [nome] ([tipo]). Qual o tamanho disponível?"
  const mensagemWhatsApp = `Olá! Quero pedir a ${produto.nome} (${produto.tipo}). Qual o tamanho disponível?`;

  const numeroWhatsApp = lojaConfig.whatsapp && lojaConfig.whatsapp !== "TODO"
    ? lojaConfig.whatsapp
    : "";

  const linkWhatsApp = numeroWhatsApp
    ? `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemWhatsApp)}`
    : "#";

  const imagemSrc = produto.foto && produto.foto.trim() !== ""
    ? produto.foto
    : getPlaceholderImage(produto.time, produto.tipo);

  return (
    <article
      className={`group relative flex flex-col h-full rounded-2xl bg-[#101626] border transition-all duration-300 ${
        isEsgotado
          ? "border-[#1F2C44]/40 opacity-75 grayscale-[25%]"
          : "border-[#1F2C44] hover:border-[#D4AF37]/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
      } overflow-hidden`}
    >
      {/* Container de imagem com proporção fixa */}
      <div className="relative aspect-square w-full bg-[#0B101C] overflow-hidden flex items-center justify-center">
        <Image
          src={imagemSrc}
          alt={`Foto da ${produto.nome} (${produto.tipo})`}
          width={500}
          height={500}
          priority={priority}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            isEsgotado ? "opacity-60" : "opacity-95"
          }`}
        />

        {/* Badges no topo da imagem */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Badge de tipo de camisa */}
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#080C14]/85 text-[#F8FAFC] border border-[#1F2C44] backdrop-blur-sm">
            {produto.tipo}
          </span>

          {/* Badge de estoque */}
          {isEsgotado ? (
            <Badge
              variant="outline"
              className="bg-rose-950/80 text-rose-300 border-rose-800 text-[11px] font-bold px-2.5 py-1 backdrop-blur-sm"
            >
              Esgotado
            </Badge>
          ) : isUltimasUnidades ? (
            <Badge
              variant="outline"
              className="bg-amber-950/80 text-amber-300 border-amber-600 text-[11px] font-bold px-2.5 py-1 backdrop-blur-sm shadow-sm"
            >
              Últimas {produto.estoque} {produto.estoque === 1 ? "unidade" : "unidades"}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <span>{produto.liga}</span>
            <span className="text-[#1F2C44]" aria-hidden="true">•</span>
            <span className="text-[#94A3B8]">{produto.time}</span>
          </div>

          <h3 className="font-bold text-base text-[#F8FAFC] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
            {produto.nome}
          </h3>
        </div>

        <div className="space-y-3 pt-2 border-t border-[#1F2C44]/60">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#94A3B8]">
              Valor à vista
            </span>
            <span className="font-athletic text-2xl font-black text-[#D4AF37] tracking-wide">
              {precoFormatador.format(produto.preco)}
            </span>
          </div>

          {/* Ação: Botão WhatsApp ou Estado Esgotado */}
          {isEsgotado ? (
            <div className="w-full">
              <Button
                disabled
                className="w-full bg-[#172033] text-[#64748B] font-bold py-2.5 rounded-xl cursor-not-allowed border border-[#1F2C44]/40 flex items-center justify-center gap-2"
                aria-label={`${produto.nome} está esgotado no momento`}
              >
                <ShieldAlert size={16} aria-hidden="true" />
                <span>Produto Esgotado</span>
              </Button>
            </div>
          ) : (
            <a
              href={linkWhatsApp}
              target={numeroWhatsApp ? "_blank" : undefined}
              rel={numeroWhatsApp ? "noopener noreferrer" : undefined}
              className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl"
              aria-label={`Pedir ${produto.nome} no WhatsApp`}
            >
              <Button
                className="w-full bg-[#D4AF37] hover:bg-[#B89328] text-[#080C14] font-black py-2.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Pedir no WhatsApp</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
