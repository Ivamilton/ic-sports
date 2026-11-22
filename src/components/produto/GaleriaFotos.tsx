"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GaleriaFotosProps {
  imagens: string[];
  nome: string;
}

export function GaleriaFotos({ imagens, nome }: GaleriaFotosProps) {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [imagemExibida, setImagemExibida] = useState("");

  const fotos = imagens.length > 0 ? imagens : ["/placeholder-shirt.svg"];
  const imagemAtual = fotos[imagemAtiva] || fotos[0];

  useEffect(() => {
    setImagemExibida(imagemAtual);
    setImagemCarregada(false);
  }, [imagemAtual]);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#F4F4F4] border border-[#E5E5E5] overflow-hidden flex items-center justify-center p-4 shadow-xs">
        {!imagemCarregada && (
          <div className="skeleton absolute inset-4 rounded-xl" aria-hidden="true" />
        )}
        <Image
          src={imagemExibida || imagemAtual}
          alt={`${nome} - Foto ${imagemAtiva + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
          onLoad={() => setImagemCarregada(true)}
          onError={() => {
            setImagemExibida("/placeholder-shirt.svg");
            setImagemCarregada(true);
          }}
          className={`object-contain p-4 transition-all duration-300 ${
            imagemCarregada ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Miniaturas */}
      {fotos.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1" role="group" aria-label="Fotos do produto">
          {fotos.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setImagemCarregada(false);
                setImagemAtiva(idx);
              }}
              className={`relative w-20 h-20 rounded-xl bg-[#F4F4F4] border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                imagemAtiva === idx
                  ? "border-[#0A0A0A] ring-2 ring-black/10 shadow-xs"
                  : "border-[#E5E5E5] hover:border-[#CCCCCC]"
              }`}
              aria-label={`Ver foto ${idx + 1} de ${nome}`}
              aria-pressed={imagemAtiva === idx}
            >
              <Image
                src={img}
                alt={`Miniatura ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
