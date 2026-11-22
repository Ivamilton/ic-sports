import Papa from "papaparse";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { lojaConfig } from "@/config/loja";
import localProductsRaw from "@/data/products.json";

let ultimoCatalogoValido: Produto[] | null = null;

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  time: string;
  liga: string;
  categoria: "torcedor" | "jogador" | "retro" | "infantil";
  temporada: string;
  preco: number;
  preco_promocional?: number;
  tamanhos_disponiveis: string[];
  quantidade_em_estoque_por_tamanho: Record<string, number>;
  totalEstoque: number;
  imagens: string[];
  destaque: boolean;
  ativo: boolean;
  tipoOrigem: "nacional" | "internacional" | "selecao";
  descricao: string;
}

function normalizarSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseEstoquePorTamanho(str: string, tamanhosPadrao: string[] = ["P", "M", "G", "GG"]): { mapa: Record<string, number>; total: number } {
  const mapa: Record<string, number> = {};
  tamanhosPadrao.forEach((t) => {
    mapa[t] = 0;
  });
  let total = 0;
  if (!str || typeof str !== "string" || !str.trim()) return { mapa, total };

  const limpo = str.trim();

  // Caso seja apenas um número: ex: "3"
  if (/^\d+$/.test(limpo)) {
    const qtd = parseInt(limpo, 10);
    tamanhosPadrao.forEach((t) => {
      mapa[t] = qtd;
    });
    return { mapa, total: qtd * tamanhosPadrao.length };
  }

  // Caso normal: "P:2, M:4" ou "P: 2, G: 1" ou apenas tamanhos "P, M, G"
  const partes = limpo.split(",");
  for (const parte of partes) {
    const item = parte.trim().toUpperCase();
    if (!item) continue;
    if (item.includes(":")) {
      const [tam, qtdStr] = item.split(":").map((s) => s.trim().toUpperCase());
      const qtd = parseInt(qtdStr, 10);
      const qtdValida = isNaN(qtd) ? 0 : Math.max(0, qtd);
      if (tam) {
        mapa[tam] = qtdValida;
        total += qtdValida;
      }
    } else {
      mapa[item] = 1;
      total += 1;
    }
  }

  return { mapa, total };
}

function parsePrecoNum(val: unknown): number {
  if (typeof val === "number") return val;
  if (!val || typeof val !== "string") return 0;
  const limpo = val
    .replace(/R\$\s?/gi, "")
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace(",", ".");
  const n = parseFloat(limpo);
  return isNaN(n) ? 0 : n;
}

function formatarUrlImagem(url: string): string {
  const limpa = url.trim().replace(/^['"]|['"]$/g, "");
  if (!limpa) return "";

  // Suporte a links de compartilhamento do Google Drive
  const driveMatch = limpa.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  return limpa;
}

function mapearProdutoRaw(p: any, index: number = 0): Produto {
  const rawNome = p.nome || p.Nome || p.titulo || p.Titulo || p.produto || p.Produto || "Camisa";
  const rawId = p.id || p.ID || p.Id || String(index + 1);
  const rawCategoria = (p.categoria || p.Categoria || "torcedor").toLowerCase();
  const slug = p.slug || normalizarSlug(`${rawNome}-${rawCategoria}-${rawId}`);

  // Categoria refinada (detecta retro e infantil se vier no nome/id)
  let catFinal: "torcedor" | "jogador" | "retro" | "infantil" = "torcedor";
  const nameLower = rawNome.toLowerCase();
  const idLower = String(rawId).toLowerCase();
  if (rawCategoria.includes("jog") || nameLower.includes("jogador") || idLower.includes("player")) {
    catFinal = "jogador";
  } else if (rawCategoria.includes("ret") || nameLower.includes("retro") || idLower.includes("retro")) {
    catFinal = "retro";
  } else if (rawCategoria.includes("inf") || rawCategoria.includes("kid") || nameLower.includes("kids") || idLower.includes("kids")) {
    catFinal = "infantil";
  }

  // Tamanhos
  const rawTamanhos = p.tamanhos_disponiveis || p.tamanhos || p.Tamanhos;
  const tamanhos = typeof rawTamanhos === "string" && rawTamanhos.trim() !== ""
    ? rawTamanhos.split(",").map((s: string) => s.trim().toUpperCase()).filter(Boolean)
    : catFinal === "infantil"
      ? ["4", "6", "8", "10", "12", "14"]
      : ["P", "M", "G", "GG", "2GG"];

  // Preço
  const rawPreco = p.preco || p.Preco || p.Preço || p.valor || p.Valor;
  const precoInformado = parsePrecoNum(rawPreco);
  const temPrecoPreenchido = precoInformado > 0;

  // Estoque
  const rawEstoque = p.quantidade_em_estoque_por_tamanho || p.estoque || p.Estoque;
  const temEstoquePreenchido =
    typeof rawEstoque === "string" &&
    rawEstoque.trim() !== "" &&
    rawEstoque.trim() !== "0";

  // REGRA DA OPÇÃO 2:
  // Apenas as camisas que o usuário colocou estoque OU preço no cadastro são exibidas.
  // As linhas vazias da lista de atacado ficam ocultas automaticamente!
  const temCadastroNoEstoque = temEstoquePreenchido || temPrecoPreenchido;

  let mapaEstoque: Record<string, number> = {};
  let totalEstoque = 0;
  if (temEstoquePreenchido && typeof rawEstoque === "string") {
    const parsed = parseEstoquePorTamanho(rawEstoque, tamanhos);
    mapaEstoque = parsed.mapa;
    totalEstoque = parsed.total;
  } else if (rawEstoque && typeof rawEstoque === "object") {
    mapaEstoque = rawEstoque;
    totalEstoque = Object.values(mapaEstoque).reduce((a: number, b: any) => a + Number(b || 0), 0);
  } else if (temPrecoPreenchido) {
    for (const t of tamanhos) {
      mapaEstoque[t] = 3;
    }
    totalEstoque = tamanhos.length * 3;
  }

  // Imagens (suporta separador | ou ,)
  const rawImagens = p.imagens || p.Imagens || p.imagem || p.Imagem || p.foto || p.Foto || p.fotos || p.Fotos || p.link || p.Link;
  const imagensArr = typeof rawImagens === "string"
    ? rawImagens.split(/[|,]/).map(formatarUrlImagem).filter(Boolean)
    : Array.isArray(rawImagens)
      ? rawImagens.map(formatarUrlImagem).filter(Boolean)
      : [];

  const rawTime = p.time || p.Time || p.clube || p.Clube || rawNome.split(" ")[1] || "Geral";
  const rawLiga = p.liga || p.Liga || "Futebol";
  const ligaNorm = rawLiga.toLowerCase();
  const timeNorm = rawTime.toLowerCase();

  let tipoOrigem: "nacional" | "internacional" | "selecao" = "internacional";
  if (
    ligaNorm.includes("brasil") ||
    ligaNorm.includes("paulista") ||
    ligaNorm.includes("carioca") ||
    ["flamengo", "palmeiras", "corinthians", "são paulo", "sao paulo", "santos", "gremio", "grêmio", "internacional", "vasco", "fluminense", "botafogo", "cruzeiro", "atletico-mg", "atlético-mg", "bahia", "fortaleza", "sport"].includes(timeNorm)
  ) {
    tipoOrigem = "nacional";
  } else if (ligaNorm.includes("seleç") || ligaNorm.includes("selec") || timeNorm.includes("brasil") || timeNorm.includes("argentina") || timeNorm.includes("portugal")) {
    tipoOrigem = "selecao";
  }

  // Preço (usa valor da planilha se tiver, senão usa padrão inteligente por categoria)
  let preco = precoInformado;
  if (preco <= 0) {
    if (catFinal === "jogador") preco = 289.90;
    else if (catFinal === "retro") preco = 219.90;
    else if (catFinal === "infantil") preco = 149.90;
    else preco = 189.90;
  }

  const rawPrecoPromocional = p.preco_promocional || p.PrecoPromocional || p.promocao || p.desconto;
  const precoPromocional = rawPrecoPromocional ? parsePrecoNum(rawPrecoPromocional) : undefined;

  const rawDescricao = p["descrição"] || p["Descrição"] || p.descricao || p.Descricao;
  const descricao = rawDescricao && rawDescricao.trim() !== ""
    ? rawDescricao.trim()
    : `Camisa oficial ${rawNome} confeccionada com tecido respirável de alta tecnologia, costuras reforçadas e excelente caimento para torcer e jogar.`;

  const ativoRaw = p.ativo ?? p.Ativo ?? "true";
  const ativoStr = String(ativoRaw).trim().toLowerCase();
  const ativoExplicito = ativoStr !== "false" && ativoStr !== "nao" && ativoStr !== "não" && ativoRaw !== false;

  // Só fica ativo se estiver explicitly ativo E tiver sido cadastrado no estoque/preço
  const ativo = ativoExplicito && temCadastroNoEstoque;

  const destaqueRaw = p.destaque ?? p.Destaque ?? "false";
  const destaqueStr = String(destaqueRaw).trim().toLowerCase();
  const destaque = destaqueStr === "true" || destaqueStr === "sim" || destaqueRaw === true;

  return {
    id: String(rawId),
    slug,
    nome: rawNome,
    time: rawTime,
    liga: rawLiga,
    categoria: catFinal,
    temporada: p.temporada || p.Temporada || "2024/25",
    preco,
    preco_promocional: precoPromocional && precoPromocional > 0 ? precoPromocional : undefined,
    tamanhos_disponiveis: tamanhos,
    quantidade_em_estoque_por_tamanho: mapaEstoque,
    totalEstoque,
    imagens: imagensArr.length > 0 ? imagensArr : ["/placeholder-shirt.svg"],
    destaque,
    ativo,
    tipoOrigem,
    descricao,
  };
}

async function carregarProdutosDaFonte(): Promise<Produto[]> {
  // Se houver URL da planilha configurada, tenta buscar o CSV
  if (lojaConfig.planilhaCsvUrl && lojaConfig.planilhaCsvUrl.trim() !== "") {
    try {
      const res = await fetch(lojaConfig.planilhaCsvUrl, {
        cache: "force-cache",
        next: { revalidate: 30 },
      });
      if (res.ok) {
        const csv = await res.text();
        const parsed = Papa.parse<any>(csv, {
          header: true,
          skipEmptyLines: "greedy",
          transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(),
        });
        if (parsed.data && parsed.data.length > 0) {
          const produtos = parsed.data
            .map(mapearProdutoRaw)
            .filter((p) => p.ativo);
          ultimoCatalogoValido = produtos;
          return produtos;
        }
      }
    } catch (e) {
      console.warn("Falha ao ler planilha online, usando dados locais:", e);
    }
  }

  if (ultimoCatalogoValido) {
    return ultimoCatalogoValido;
  }

  // Fallback para products.json local
  return (localProductsRaw as any[])
    .map(mapearProdutoRaw)
    .filter((p) => p.ativo);
}

export const getProdutos = unstable_cache(
  carregarProdutosDaFonte,
  ["ic-sports-produtos-v2"],
  { revalidate: 30 }
);

export const getProdutoPorSlug = cache(async (slug: string): Promise<Produto | null> => {
  const produtos = await getProdutos();
  return produtos.find((p) => p.slug === slug || normalizarSlug(p.nome) === slug) || null;
});

export async function getProdutosPorTime(time: string): Promise<Produto[]> {
  const produtos = await getProdutos();
  const termo = normalizarSlug(time);
  return produtos.filter((p) => normalizarSlug(p.time) === termo || normalizarSlug(p.time).includes(termo));
}

export async function getProdutosPorLiga(ligaSlug: string): Promise<Produto[]> {
  const produtos = await getProdutos();
  const termo = normalizarSlug(ligaSlug);
  return produtos.filter((p) => {
    const ligaProd = normalizarSlug(p.liga);
    return ligaProd === termo || ligaProd.includes(termo) || termo.includes(ligaProd);
  });
}

export async function getProdutosProntaEntrega(): Promise<Produto[]> {
  const produtos = await getProdutos();
  return produtos.filter((p) => p.totalEstoque > 0);
}

export async function getProdutosRelacionados(produtoAtual: Produto, limit = 4): Promise<Produto[]> {
  const produtos = await getProdutos();
  return produtos
    .filter((p) => p.id !== produtoAtual.id && (p.time === produtoAtual.time || p.liga === produtoAtual.liga))
    .slice(0, limit);
}
