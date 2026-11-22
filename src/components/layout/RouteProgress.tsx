"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progresso, setProgresso] = useState(0);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    setAtivo(true);
    setProgresso(18);

    const timer1 = window.setTimeout(() => setProgresso(72), 90);
    const timer2 = window.setTimeout(() => setProgresso(92), 220);
    const timer3 = window.setTimeout(() => {
      setProgresso(100);
      window.setTimeout(() => setAtivo(false), 160);
    }, 420);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  if (!ativo) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none"
      role="progressbar"
      aria-label="Carregando página"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progresso}
    >
      <div
        className="h-full origin-left bg-[#25D366]"
        style={{
          transform: `scaleX(${progresso / 100})`,
          transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
