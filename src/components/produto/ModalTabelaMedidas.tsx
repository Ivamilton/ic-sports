"use client";

import { useState } from "react";
import { Ruler, X } from "lucide-react";

export function ModalTabelaMedidas() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0A] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
      >
        <Ruler size={14} aria-hidden="true" />
        <span>Ver Guia de Medidas</span>
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setAberto(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <div className="flex items-center gap-2">
                <Ruler size={20} className="text-[#0A0A0A]" aria-hidden="true" />
                <h3 className="font-athletic text-2xl font-bold uppercase tracking-wider text-[#0A0A0A]">
                  Tabela de Medidas (cm)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="p-1 text-[#666666] hover:text-[#0A0A0A] rounded-lg"
                aria-label="Fechar tabela de medidas"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-2">
                  1. Versão Torcedor (Corte Padrão / Tradicional)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-[#E5E5E5] rounded-xl overflow-hidden">
                    <thead className="bg-[#0A0A0A] text-white font-bold">
                      <tr>
                        <th className="p-2.5">Tamanho</th>
                        <th className="p-2.5">Largura (Peito)</th>
                        <th className="p-2.5">Comprimento (Altura)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5] font-semibold text-[#333333]">
                      <tr className="bg-white"><td className="p-2.5 font-bold">P</td><td className="p-2.5">50 - 52 cm</td><td className="p-2.5">69 - 71 cm</td></tr>
                      <tr className="bg-[#F9F9F9]"><td className="p-2.5 font-bold">M</td><td className="p-2.5">53 - 55 cm</td><td className="p-2.5">71 - 73 cm</td></tr>
                      <tr className="bg-white"><td className="p-2.5 font-bold">G</td><td className="p-2.5">56 - 58 cm</td><td className="p-2.5">73 - 75 cm</td></tr>
                      <tr className="bg-[#F9F9F9]"><td className="p-2.5 font-bold">GG</td><td className="p-2.5">59 - 61 cm</td><td className="p-2.5">75 - 77 cm</td></tr>
                      <tr className="bg-white"><td className="p-2.5 font-bold">XG</td><td className="p-2.5">62 - 64 cm</td><td className="p-2.5">77 - 79 cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-2">
                  2. Versão Jogador (Corte Atlético / Ajustado)
                </h4>
                <p className="text-[11px] text-[#666666] mb-2">
                  * Dica: Por ter modelagem mais colada ao corpo, sugerimos pedir um número acima se preferir um caimento mais solto.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-[#E5E5E5] rounded-xl overflow-hidden">
                    <thead className="bg-[#0A0A0A] text-white font-bold">
                      <tr>
                        <th className="p-2.5">Tamanho</th>
                        <th className="p-2.5">Largura</th>
                        <th className="p-2.5">Comprimento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5] font-semibold text-[#333333]">
                      <tr className="bg-white"><td className="p-2.5 font-bold">P</td><td className="p-2.5">48 - 50 cm</td><td className="p-2.5">68 - 70 cm</td></tr>
                      <tr className="bg-[#F9F9F9]"><td className="p-2.5 font-bold">M</td><td className="p-2.5">51 - 53 cm</td><td className="p-2.5">70 - 72 cm</td></tr>
                      <tr className="bg-white"><td className="p-2.5 font-bold">G</td><td className="p-2.5">54 - 56 cm</td><td className="p-2.5">72 - 74 cm</td></tr>
                      <tr className="bg-[#F9F9F9]"><td className="p-2.5 font-bold">GG</td><td className="p-2.5">57 - 59 cm</td><td className="p-2.5">74 - 76 cm</td></tr>
                      <tr className="bg-white"><td className="p-2.5 font-bold">XG</td><td className="p-2.5">60 - 62 cm</td><td className="p-2.5">76 - 78 cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAberto(false)}
              className="w-full py-2.5 bg-[#0A0A0A] hover:bg-[#222222] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Entendido, fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
