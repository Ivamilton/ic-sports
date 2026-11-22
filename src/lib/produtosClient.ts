import type { Produto } from "@/lib/getProducts";

const TTL_MS = 30 * 1000;
const STORAGE_KEY = "iflegacy_produtos_v1";

let produtosEmMemoria: Produto[] | null = null;
let atualizadoEm: number | null = null;
let requisicaoEmAndamento: Promise<Produto[]> | null = null;

export async function obterProdutosCacheados(): Promise<Produto[]> {
  const agora = Date.now();

  if (produtosEmMemoria && atualizadoEm && agora - atualizadoEm < TTL_MS) {
    return produtosEmMemoria;
  }

  try {
    const salvo = sessionStorage.getItem(STORAGE_KEY);
    if (salvo) {
      const dados = JSON.parse(salvo) as { produtos: Produto[]; atualizadoEm: number };
      if (dados.produtos && agora - dados.atualizadoEm < TTL_MS) {
        produtosEmMemoria = dados.produtos;
        atualizadoEm = dados.atualizadoEm;
        return dados.produtos;
      }
    }
  } catch {
    // O cache de sessão é opcional.
  }

  if (requisicaoEmAndamento) {
    return requisicaoEmAndamento;
  }

  requisicaoEmAndamento = fetch("/api/produtos", { cache: "default" })
    .then((resposta) => {
      if (!resposta.ok) throw new Error("Não foi possível carregar o catálogo.");
      return resposta.json() as Promise<Produto[]>;
    })
    .then((produtos) => {
      produtosEmMemoria = produtos;
      atualizadoEm = Date.now();

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ produtos, atualizadoEm })
        );
      } catch {
        // Navegadores privados podem bloquear o sessionStorage.
      }

      return produtos;
    })
    .finally(() => {
      requisicaoEmAndamento = null;
    });

  return requisicaoEmAndamento;
}
