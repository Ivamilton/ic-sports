import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { TopTicker } from "@/components/layout/TopTicker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/carrinho/CartDrawer";
import { lojaConfig } from "@/config/loja";
import { RouteProgress } from "@/components/layout/RouteProgress";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "IF Legacy | Loja Oficial",
  description: `Catálogo de camisas de time da ${lojaConfig.nomeLoja}. Modelos Torcedor, Jogador e Retrô com pedido direto no WhatsApp com ${lojaConfig.responsavel}.`,
  keywords: ["camisas de time", "camisas de futebol", "manto", "IF Legacy", "futebol", "camisa de time whatsapp"],
  authors: [{ name: lojaConfig.responsavel }],
  icons: {
    icon: "/logo.png?v=1",
  },
  openGraph: {
    title: `${lojaConfig.nomeLoja} — Mantos e Camisas de Futebol`,
    description: `Catálogo completo de camisas nacionais, internacionais e seleções com pedido rápido no WhatsApp com ${lojaConfig.responsavel}.`,
    locale: "pt_BR",
    type: "website",
    siteName: lojaConfig.nomeLoja,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#0A0A0A] font-sans antialiased">
        <CartProvider>
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          {/* Faixa Superior Rolante de Benefícios */}
          <TopTicker />

          {/* Cabeçalho Limpo com Logo e Menu */}
          <Header />

          {/* Conteúdo Principal */}
          <main className="flex-1">{children}</main>

          {/* Gaveta Lateral do Carrinho */}
          <CartDrawer />

          {/* Botão Flutuante de WhatsApp */}
          <FloatingWhatsapp />

          {/* Rodapé Institucional */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
