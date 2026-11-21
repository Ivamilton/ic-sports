import Papa from "papaparse";
import { lojaConfig } from "@/config/loja";
import localProductsRaw from "@/data/products.json";

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

function parseEstoquePorTamanho(str: string): { mapa: Record<string, number>; total: number } {
  const mapa: Record<string, number> = {};
  let total = 0;
  if (!str) return { mapa, total };

  // Exemplo de entrada: "P:2,M:4,G:3,GG:1,XG:0"
  const pares = str.split(",");
  for (const par of pares) {
    const [tam, qtdStr] = par.split(":").map((s) => s.trim().toUpperCase());
    if (tam) {
      const qtd = parseInt(qtdStr, 10);
      const qtdValida = isNaN(qtd) ? 0 : Math.max(0, qtd);
      mapa[tam] = qtdValida;
      total += qtdValida;
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

function mapearProdutoRaw(p: any): Produto {
  const slug = p.slug || normalizarSlug(`${p.nome}-${p.categoria}-${p.id}`);
  const { mapa, total } = typeof p.quantidade_em_estoque_por_tamanho === "string"
    ? parseEstoquePorTamanho(p.quantidade_em_estoque_por_tamanho)
    : { mapa: p.quantidade_em_estoque_por_tamanho || {}, total: 10 };

  const tamanhos = typeof p.tamanhos_disponiveis === "string"
    ? p.tamanhos_disponiveis.split(",").map((s: string) => s.trim().toUpperCase())
    : ["P", "M", "G", "GG", "XG"];

  const imagensArr = typeof p.imagens === "string"
    ? p.imagens.split(",").map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(p.imagens) ? p.imagens : [];

  const ligaNorm = (p.liga || "").toLowerCase();
  let tipoOrigem: "nacional" | "internacional" | "selecao" = "internacional";
  if (ligaNorm.includes("brasil") || p.time === "Flamengo" || p.time === "Palmeiras") {
    tipoOrigem = "nacional";
  } else if (ligaNorm.includes("seleç") || p.time === "Brasil") {
    tipoOrigem = "selecao";
  }

  return {
    id: String(p.id),
    slug,
    nome: p.nome || "Camisa sem nome",
    time: p.time || "Time",
    liga: p.liga || "Ligas",
    categoria: (p.categoria?.toLowerCase() || "torcedor") as any,
    temporada: p.temporada || "2024/25",
    preco: parsePrecoNum(p.preco),
    preco_promocional: p.preco_promocional ? parsePrecoNum(p.preco_promocional) : undefined,
    tamanhos_disponiveis: tamanhos,
    quantidade_em_estoque_por_tamanho: mapa,
    totalEstoque: total,
    imagens: imagensArr.length > 0 ? imagensArr : ["/placeholders/real-madrid-1.svg"],
    destaque: p.destaque === "sim" || p.destaque === true,
    ativo: p.ativo !== "nao" && p.ativo !== false,
    tipoOrigem,
    descricao: p.descricao || `Camisa oficial ${p.nome} confeccionada com tecnologia esportiva de ponta.`,
  };
}

export async function getProdutos(): Promise<Produto[]> {
  // Se houver URL da planilha configurada, tenta buscar o CSV
  if (lojaConfig.planilhaCsvUrl && lojaConfig.planilhaCsvUrl.trim() !== "") {
    try {
      const res = await fetch(lojaConfig.planilhaCsvUrl, { next: { revalidate: 300 } });
      if (res.ok) {
        const csv = await res.text();
        const parsed = Papa.parse<any>(csv, { header: true, skipEmptyLines: "greedy" });
        if (parsed.data && parsed.data.length > 0) {
          const produtos = parsed.data
            .map(mapearProdutoRaw)
            .filter((p) => p.ativo);
          if (produtos.length > 0) return produtos;
        }
      }
    } catch (e) {
      console.warn("Falha ao ler planilha online, usando dados locais:", e);
    }
  }

  // Fallback para products.json local
  return (localProductsRaw as any[])
    .map(mapearProdutoRaw)
    .filter((p) => p.ativo);
}

export async function getProdutoPorSlug(slug: string): Promise<Produto | null> {
  const produtos = await getProdutos();
  return produtos.find((p) => p.slug === slug || normalizarSlug(p.nome) === slug) || null;
}

export async function getProdutosPorTime(time: string): Promise<Produto[]> {
  const produtos = await getProdutos();
  const termo = normalizarSlug(time);
  return produtos.filter((p) => normalizarSlug(p.time) === termo || normalizarSlug(p.time).includes(termo));
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
