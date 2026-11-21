import Image from "next/image";
import Link from "next/link";
import { lojaConfig } from "@/config/loja";

export function Logo({ size = 44, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg p-1 transition-transform active:scale-95"
      aria-label={`${lojaConfig.nomeLoja} - Página inicial`}
    >
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/logo-ic-sports.svg"
          alt={`Logo da loja ${lojaConfig.nomeLoja}`}
          width={size}
          height={size}
          className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-athletic text-2xl font-black tracking-wider text-[#D4AF37] uppercase">
            IC <span className="text-[#F8FAFC]">SPORTS</span>
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-[#94A3B8] uppercase">
            Camisas Oficiais
          </span>
        </div>
      )}
    </Link>
  );
}
