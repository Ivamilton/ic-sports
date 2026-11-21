"use client";

interface OrdenacaoSelectProps {
  valor: string;
  onChange: (novoValor: string) => void;
}

export function OrdenacaoSelect({ valor, onChange }: OrdenacaoSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ordenacao-produtos" className="text-xs font-bold text-[#666666] uppercase whitespace-nowrap">
        Ordenar:
      </label>
      <select
        id="ordenacao-produtos"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 bg-white border border-[#E5E5E5] rounded-xl text-xs font-semibold text-[#0A0A0A] focus:outline-none focus:border-[#D10000] focus:ring-2 focus:ring-[#D10000]/20 cursor-pointer"
      >
        <option value="mais-recentes">Mais Recentes (Lançamentos)</option>
        <option value="menor-preco">Menor Preço</option>
        <option value="maior-preco">Maior Preço</option>
        <option value="mais-vendidos">Mais Vendidos</option>
      </select>
    </div>
  );
}
