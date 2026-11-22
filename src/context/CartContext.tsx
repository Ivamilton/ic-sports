"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { Produto } from "@/lib/getProducts";
import { gerarLinkWhatsAppCarrinho, ItemPedidoCarrinho } from "@/lib/whatsapp";
import { obterProdutosCacheados } from "@/lib/produtosClient";

export interface ItemCarrinho {
  id: string; // produtoId-tamanho
  produtoId: string;
  slug: string;
  nome: string;
  time: string;
  versao: string;
  tamanho: string;
  preco: number;
  quantidade: number;
  imagem: string;
  estoqueMaximo: number;
}

interface CartContextType {
  itens: ItemCarrinho[];
  totalItens: number;
  subtotal: number;
  carrinhoAberto: boolean;
  setCarrinhoAberto: (aberto: boolean) => void;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  alternarCarrinho: () => void;
  adicionarAoCarrinho: (produto: Produto, tamanho: string, quantidade?: number) => void;
  removerDoCarrinho: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void;
  limparCarrinho: () => void;
  linkWhatsAppCheckout: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "iflegacy_carrinho_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Carrega do LocalStorage na montagem no cliente
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) {
          setItens(parsed);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar carrinho do LocalStorage:", e);
    } finally {
      setHidratado(true);
    }
  }, []);

  // Salva no LocalStorage sempre que itens mudarem
  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch (e) {
      console.error("Erro ao salvar carrinho no LocalStorage:", e);
    }
  }, [itens, hidratado]);

  useEffect(() => {
    if (!hidratado) return;

    obterProdutosCacheados()
      .then((produtos: Produto[]) => {
        setItens((atuais) =>
          atuais
            .map((item) => {
              const produto = produtos.find((p) => p.id === item.produtoId);
              const estoqueMaximo = produto
                ? Math.max(0, produto.quantidade_em_estoque_por_tamanho[item.tamanho] || 0)
                : 0;

              if (!produto || estoqueMaximo <= 0) return null;
              return {
                ...item,
                estoqueMaximo,
                quantidade: Math.min(item.quantidade, estoqueMaximo),
              };
            })
            .filter((item): item is ItemCarrinho => item !== null)
        );
      })
      .catch(() => {
        // Mantém os itens existentes caso o catálogo não possa ser consultado.
      });
  }, [hidratado]);

  const abrirCarrinho = () => setCarrinhoAberto(true);
  const fecharCarrinho = () => setCarrinhoAberto(false);
  const alternarCarrinho = () => setCarrinhoAberto((prev) => !prev);

  const adicionarAoCarrinho = (produto: Produto, tamanho: string, quantidade = 1) => {
    const precoUnitario = produto.preco_promocional || produto.preco;
    const tamanhoNormalizado = tamanho.toUpperCase();
    const itemKey = `${produto.id}-${tamanhoNormalizado}`;
    const imagem = produto.imagens[0] || "/placeholder-shirt.svg";
    const estoqueMaximo = Math.max(
      0,
      produto.quantidade_em_estoque_por_tamanho[tamanhoNormalizado] || 0
    );

    if (estoqueMaximo <= 0) return;
    const quantidadeSolicitada = Math.max(1, Math.floor(quantidade));

    setItens((prev) => {
      const existente = prev.find((item) => item.id === itemKey);
      if (existente) {
        return prev.map((item) =>
          item.id === itemKey
            ? {
                ...item,
                quantidade: Math.min(
                  (item.estoqueMaximo || estoqueMaximo),
                  item.quantidade + quantidadeSolicitada
                ),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          produtoId: produto.id,
          slug: produto.slug,
          nome: produto.nome,
          time: produto.time,
          versao: produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1),
          tamanho: tamanhoNormalizado,
          preco: precoUnitario,
          quantidade: Math.min(estoqueMaximo, quantidadeSolicitada),
          imagem,
          estoqueMaximo,
        },
      ];
    });

    // Abre o carrinho para feedback visual imediato
    setCarrinhoAberto(true);
  };

  const removerDoCarrinho = (id: string) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setItens((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const limite = item.estoqueMaximo && item.estoqueMaximo > 0
          ? item.estoqueMaximo
          : Number.MAX_SAFE_INTEGER;
        return { ...item, quantidade: Math.min(limite, Math.floor(quantidade)) };
      })
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = useMemo(
    () => itens.reduce((acc, item) => acc + item.quantidade, 0),
    [itens]
  );

  const subtotal = useMemo(
    () => itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    [itens]
  );

  const linkWhatsAppCheckout = useMemo(() => {
    const itensPedido: ItemPedidoCarrinho[] = itens.map((item) => ({
      id: item.id,
      nome: item.nome,
      versao: item.versao,
      tamanho: item.tamanho,
      quantidade: item.quantidade,
      preco: item.preco,
    }));
    return gerarLinkWhatsAppCarrinho(itensPedido);
  }, [itens]);

  return (
    <CartContext.Provider
      value={{
        itens,
        totalItens,
        subtotal,
        carrinhoAberto,
        setCarrinhoAberto,
        abrirCarrinho,
        fecharCarrinho,
        alternarCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        linkWhatsAppCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
