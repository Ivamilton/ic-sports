export type Produto = {
  nome: string;
  time: string;
  liga: string;
  tipo: "Torcedor" | "Jogador";
  preco: number;
  estoque: number;
  foto: string;
};

// Gerador de placeholder SVG embutido limpo para exibição imediata
export function getPlaceholderImage(time: string, tipo: string, cor1 = "#1E293B", cor2 = "#0F172A"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none">
    <rect width="600" height="600" fill="${cor2}"/>
    <circle cx="300" cy="300" r="220" fill="${cor1}" stroke="#D4AF37" stroke-width="3" stroke-dasharray="6 6"/>
    <!-- Silhueta da camisa de time -->
    <path d="M210 180 L250 140 C280 160 320 160 350 140 L390 180 L440 210 L400 270 L370 250 L370 450 L230 450 L230 250 L200 270 L160 210 Z" fill="#D4AF37" fill-opacity="0.18" stroke="#D4AF37" stroke-width="4" stroke-linejoin="round"/>
    <text x="300" y="320" font-family="system-ui, sans-serif" font-size="28" font-weight="800" text-anchor="middle" fill="#F8FAFC" letter-spacing="1">${time.toUpperCase()}</text>
    <text x="300" y="355" font-family="system-ui, sans-serif" font-size="16" font-weight="600" text-anchor="middle" fill="#D4AF37" letter-spacing="3">${tipo.toUpperCase()}</text>
    <text x="300" y="490" font-family="system-ui, sans-serif" font-size="13" font-weight="500" text-anchor="middle" fill="#64748B">IC SPORTS · OFICIAL</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const produtosExemplo: Produto[] = [
  {
    nome: "Camisa Flamengo I 24/25",
    time: "Flamengo",
    liga: "Brasileirão",
    tipo: "Torcedor",
    preco: 199.90,
    estoque: 6,
    foto: getPlaceholderImage("Flamengo", "Torcedor", "#B91C1C", "#1E1E1E"),
  },
  {
    nome: "Camisa Real Madrid I 24/25",
    time: "Real Madrid",
    liga: "La Liga",
    tipo: "Jogador",
    preco: 299.90,
    estoque: 2, // Últimas 2 unidades
    foto: getPlaceholderImage("Real Madrid", "Jogador", "#2563EB", "#0F172A"),
  },
  {
    nome: "Camisa Manchester City Home 24/25",
    time: "Manchester City",
    liga: "Premier League",
    tipo: "Torcedor",
    preco: 219.90,
    estoque: 1, // Última 1 unidade
    foto: getPlaceholderImage("Man City", "Torcedor", "#0284C7", "#0C4A6E"),
  },
  {
    nome: "Camisa Brasil Amarela 2024",
    time: "Brasil",
    liga: "Seleções",
    tipo: "Torcedor",
    preco: 229.90,
    estoque: 8,
    foto: getPlaceholderImage("Brasil", "Torcedor", "#EAB308", "#15803D"),
  },
  {
    nome: "Camisa Palmeiras I 2024",
    time: "Palmeiras",
    liga: "Brasileirão",
    tipo: "Jogador",
    preco: 289.90,
    estoque: 3, // Últimas 3 unidades
    foto: getPlaceholderImage("Palmeiras", "Jogador", "#047857", "#064E3B"),
  },
  {
    nome: "Camisa Barcelona I 24/25",
    time: "Barcelona",
    liga: "La Liga",
    tipo: "Torcedor",
    preco: 219.90,
    estoque: 4,
    foto: getPlaceholderImage("Barcelona", "Torcedor", "#831843", "#1E3A8A"),
  },
  {
    nome: "Camisa PSG Home 24/25",
    time: "PSG",
    liga: "Ligue 1",
    tipo: "Jogador",
    preco: 319.90,
    estoque: 0, // Esgotado
    foto: getPlaceholderImage("PSG", "Jogador", "#1E3A8A", "#881337"),
  },
  {
    nome: "Camisa Argentina Três Estrelas",
    time: "Argentina",
    liga: "Seleções",
    tipo: "Torcedor",
    preco: 229.90,
    estoque: 0, // Esgotado
    foto: getPlaceholderImage("Argentina", "Torcedor", "#38BDF8", "#0369A1"),
  },
  {
    nome: "Camisa Vasco da Gama I 2024",
    time: "Vasco",
    liga: "Brasileirão",
    tipo: "Torcedor",
    preco: 189.90,
    estoque: 5,
    foto: getPlaceholderImage("Vasco", "Torcedor", "#27272A", "#18181B"),
  },
  {
    nome: "Camisa Liverpool Home 24/25",
    time: "Liverpool",
    liga: "Premier League",
    tipo: "Jogador",
    preco: 329.90,
    estoque: 2, // Últimas 2 unidades
    foto: getPlaceholderImage("Liverpool", "Jogador", "#991B1B", "#450A0A"),
  },
];
