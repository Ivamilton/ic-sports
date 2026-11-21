import Papa from "papaparse";
import { Produto, produtosExemplo } from "@/data/exemplo";
import { lojaConfig } from "@/config/loja";

export function parsePreco(valor: unknown): number {
  if (typeof valor === "number") return valor;
  if (!valor || typeof valor !== "string") return 0;
  
  // Limpa R$, espaços, e trata vírgula como separador decimal
  const limpo = valor
    .replace(/R\$\s?/gi, "")
    .replace(/\s+/g, "")
    .replace(".", "") // remove ponto de milhar caso exista ex: 1.199,90 -> 1199,90
    .replace(",", "."); // converte decimal vírgula para ponto

  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

export function parseEstoque(valor: unknown): number {
  if (typeof valor === "number") return Math.max(0, Math.floor(valor));
  if (!valor || typeof valor !== "string") return 0;
  
  const trimmed = valor.trim();
  if (trimmed === "") return 0;
  const num = parseInt(trimmed, 10);
  return isNaN(num) ? 0 : Math.max(0, num);
}

export function sortProdutos(lista: Produto[]): Produto[] {
  return [...lista].sort((a, b) => {
    // 1º critério: Camisas disponíveis (estoque > 0) antes das esgotadas (estoque <= 0)
    const aDisponivel = a.estoque > 0 ? 0 : 1;
    const bDisponivel = b.estoque > 0 ? 0 : 1;
    if (aDisponivel !== bDisponivel) {
      return aDisponivel - bDisponivel;
    }
    // 2º critério: Ordem alfabética pelo nome
    return a.nome.localeCompare(b.nome, "pt-BR");
  });
}

export async function getProdutos(): Promise<{ produtos: Produto[]; erro: boolean }> {
  // Se a URL estiver vazia, usa os produtos de exemplo sem erro
  if (!lojaConfig.planilhaCsvUrl || lojaConfig.planilhaCsvUrl.trim() === "") {
    return {
      produtos: sortProdutos(produtosExemplo),
      erro: false,
    };
  }

  try {
    const res = await fetch(lojaConfig.planilhaCsvUrl, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Erro ao carregar CSV: HTTP ${res.status}`);
      return {
        produtos: sortProdutos(produtosExemplo),
        erro: true,
      };
    }

    const csvText = await res.text();
    if (!csvText || csvText.trim() === "") {
      return {
        produtos: sortProdutos(produtosExemplo),
        erro: true,
      };
    }

    // Papa.parse trata aspas, vírgulas internas, quebras de linha e tipos automaticamente
    const parsed = Papa.parse<string[]>(csvText, {
      skipEmptyLines: "greedy",
    });

    if (!parsed.data || parsed.data.length <= 1) {
      return {
        produtos: sortProdutos(produtosExemplo),
        erro: true,
      };
    }

    // A primeira linha é o cabeçalho: Nome, Time, Liga, Tipo, Preço, Estoque, Foto
    const linhas = parsed.data.slice(1);

    const produtosValidos: Produto[] = [];

    for (const linha of linhas) {
      if (!linha || linha.length < 2) continue;
      
      const nome = (linha[0] || "").trim();
      const time = (linha[1] || "").trim();
      if (!nome && !time) continue;

      const liga = (linha[2] || "Outros").trim();
      const tipoRaw = (linha[3] || "Torcedor").trim().toLowerCase();
      const tipo: "Torcedor" | "Jogador" = tipoRaw.includes("jogador") ? "Jogador" : "Torcedor";
      const preco = parsePreco(linha[4]);
      const estoque = parseEstoque(linha[5]);
      const foto = (linha[6] || "").trim();

      produtosValidos.push({
        nome: nome || "Camisa sem nome",
        time: time || "Time",
        liga: liga || "Outros",
        tipo,
        preco,
        estoque,
        foto,
      });
    }

    if (produtosValidos.length === 0) {
      return {
        produtos: sortProdutos(produtosExemplo),
        erro: true,
      };
    }

    return {
      produtos: sortProdutos(produtosValidos),
      erro: false,
    };
  } catch (error) {
    console.error("Falha ao processar planilha CSV:", error);
    return {
      produtos: sortProdutos(produtosExemplo),
      erro: true,
    };
  }
}
