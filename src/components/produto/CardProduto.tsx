import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Flame } from "lucide-react";
import { Produto } from "@/lib/getProducts";
import { gerarLinkWhatsAppProduto } from "@/lib/whatsapp";

interface CardProdutoProps {
  produto: Produto;
  prioridade?: boolean;
}

const formatarBRL = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CardProduto({ produto, prioridade = false }: CardProdutoProps) {
  const isEsgotado = produto.totalEstoque <= 0;
  const precoAtual = produto.preco_promocional || produto.preco;
  const temPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco;
  const descontoPercentual = temPromocao
    ? Math.round(((produto.preco - produto.preco_promocional!) / produto.preco) * 100)
    : 0;

  const imagemPrincipal = produto.imagens[0] || "/placeholders/real-madrid-1.svg";
  const whatsappUrl = gerarLinkWhatsAppProduto({
    nome: produto.nome,
    versao: produto.categoria,
    preco: precoAtual,
  });

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-[#E5E5E5] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D10000]/40 ${
        isEsgotado ? "opacity-75" : ""
      }`}
    >
      {/* Imagem do Produto com Badges */}
      <div className="relative aspect-square w-full bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-3">
        <Link href={`/produto/${produto.slug}`} className="w-full h-full relative block">
          <Image
            src={imagemPrincipal}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={prioridade}
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-106"
          />
        </Link>

        {/* Badges superiores */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {temPromocao && (
            <span className="px-2 py-0.5 bg-[#D10000] text-white text-[11px] font-black uppercase tracking-wider rounded-md shadow-xs">
              -{descontoPercentual}% OFF
            </span>
          )}
          {produto.categoria === "jogador" && (
            <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Jogador
            </span>
          )}
          {produto.categoria === "retro" && (
            <span className="px-2 py-0.5 bg-[#B45309] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Retrô
            </span>
          )}
        </div>

        {/* Badge de Pronta Entrega ou Esgotado */}
        <div className="absolute top-2.5 right-2.5 pointer-events-none">
          {isEsgotado ? (
            <span className="px-2 py-0.5 bg-[#4B5563] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              Esgotado
            </span>
          ) : produto.totalEstoque <= 3 ? (
            <span className="px-2 py-0.5 bg-[#F59E0B] text-black text-[10px] font-black uppercase tracking-wider rounded-md">
              Últimas {produto.totalEstoque} un.
            </span>
          ) : null}
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">
            <span>{produto.time}</span>
            <span className="text-[#999999]">{produto.temporada}</span>
          </div>

          <Link href={`/produto/${produto.slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-[#0A0A0A] line-clamp-2 leading-snug group-hover:text-[#D10000] transition-colors">
              {produto.nome}
            </h3>
          </Link>
        </div>

        {/* Preços e Ações */}
        <div className="pt-2 border-t border-[#F0F0F0] space-y-3">
          <div className="flex items-baseline gap-2">
            {temPromocao && (
              <span className="text-xs text-[#999999] line-through">
                {formatarBRL(produto.preco)}
              </span>
            )}
            <span className="font-athletic text-2xl font-black text-[#D10000] tracking-wide">
              {formatarBRL(precoAtual)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/produto/${produto.slug}`}
              className="w-full py-2.5 px-2 bg-[#F4F4F4] hover:bg-[#EAEAEA] text-[#0A0A0A] text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center"
            >
              Ver Detalhes
            </Link>

            {isEsgotado ? (
              <button
                disabled
                className="w-full py-2.5 px-2 bg-[#F0F0F0] text-[#999999] text-xs font-bold rounded-xl text-center cursor-not-allowed"
              >
                Esgotado
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Comprar ${produto.nome} no WhatsApp`}
                className="w-full py-2.5 px-2 bg-[#D10000] hover:bg-[#B00000] text-white text-xs font-black rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>Comprar</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
