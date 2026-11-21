"use client";

interface SeletorTamanhoProps {
  tamanhos: string[];
  estoquePorTamanho: Record<string, number>;
  tamanhoSelecionado: string | null;
  onSelecionar: (tamanho: string) => void;
}

export function SeletorTamanho({
  tamanhos,
  estoquePorTamanho,
  tamanhoSelecionado,
  onSelecionar,
}: SeletorTamanhoProps) {
  const listaTamanhos = tamanhos.length > 0 ? tamanhos : ["P", "M", "G", "GG", "XG"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0A]">
          Selecione o Tamanho
        </span>
        {tamanhoSelecionado && (
          <span className="text-xs font-bold text-[#D10000]">
            Selecionado: {tamanhoSelecionado}
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2.5" role="group" aria-label="Seletor de tamanhos">
        {listaTamanhos.map((tam) => {
          const qtd = estoquePorTamanho[tam] !== undefined ? estoquePorTamanho[tam] : 1;
          const esgotado = qtd <= 0;
          const selecionado = tamanhoSelecionado === tam;

          return (
            <button
              key={tam}
              type="button"
              disabled={esgotado}
              onClick={() => onSelecionar(tam)}
              className={`relative py-3 rounded-xl font-athletic text-xl font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                esgotado
                  ? "bg-[#F4F4F4] text-[#AAAAAA] border border-[#E5E5E5] line-through cursor-not-allowed opacity-60"
                  : selecionado
                  ? "bg-[#D10000] text-white border-2 border-[#D10000] shadow-md scale-102"
                  : "bg-white text-[#0A0A0A] border border-[#E5E5E5] hover:border-[#0A0A0A]"
              }`}
              aria-label={`Tamanho ${tam} ${esgotado ? "- Esgotado" : `- ${qtd} disponíveis`}`}
              aria-pressed={selecionado}
            >
              <span>{tam}</span>
              {esgotado ? (
                <span className="text-[9px] font-sans font-bold uppercase tracking-tight -mt-1 text-[#999999]">
                  Esgotado
                </span>
              ) : qtd <= 2 ? (
                <span className="text-[9px] font-sans font-extrabold uppercase tracking-tight -mt-1 text-amber-500">
                  {qtd} un.
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
