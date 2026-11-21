# ⚽ IC Sports — Catálogo & E-commerce de Camisas de Futebol

Catálogo profissional de camisas de time para a loja **IC Sports** (Ítalo Cauan), com pedidos e conversão direta via WhatsApp, suporte a planilha Google Sheets ou arquivo local `products.json`, banners promocionais e cálculo de horário de atendimento em tempo real.

---

## 🚀 Como Rodar o Projeto Localmente

1. Abra o terminal na pasta do projeto:
```bash
cd catalogo-camisas
```

2. Instale as dependências (caso seja a primeira vez):
```bash
npm install
```

3. Inicie o servidor local:
```bash
npm run dev
```

4. Acesse no navegador:
👉 **http://localhost:3000**

---

## 📱 1. Como Trocar o Número do WhatsApp e Dados da Loja

Abra o arquivo [`src/config/loja.ts`](src/config/loja.ts) e edite os campos:

```typescript
export const lojaConfig = {
  nomeLoja: "IC Sports",
  responsavel: "Ítalo Cauan",
  whatsapp: "5581999999999", // Coloque o número com DDI e DDD (apenas números)
  instagram: "@icsports.oficial", // Seu @ no Instagram
  fusoHorario: "America/Fortaleza",
  ...
};
```

* O botão **"Comprar no WhatsApp"** em cada produto gera automaticamente a mensagem:
  > *"Olá! Quero a camisa [Nome], versão [Torcedor/Jogador], tamanho [M] por R$ [Preço]. Ela está disponível?"*

---

## 📊 2. Como Usar e Publicar a Planilha do Google Sheets (CSV)

Você pode gerenciar todos os produtos e estoques diretamente pelo Google Sheets, sem precisar tocar no código!

### Estrutura das Colunas da Planilha (exatamente nesta ordem):
1. `id` (ex: 1, 2, 3...)
2. `nome` (ex: Camisa Real Madrid Home 24/25)
3. `time` (ex: Real Madrid)
4. `liga` (ex: La Liga)
5. `categoria` (torcedor, jogador, retro, infantil)
6. `temporada` (ex: 2024/25)
7. `preco` (ex: 329.90 ou 329,90)
8. `preco_promocional` (ex: 289.90 ou deixe em branco se não houver promoção)
9. `tamanhos_disponiveis` (ex: P,M,G,GG,XG)
10. `quantidade_em_estoque_por_tamanho` (ex: P:2,M:4,G:3,GG:1,XG:0)
11. `imagens` (links diretos das fotos separados por vírgula)
12. `destaque` (sim ou nao)
13. `ativo` (sim ou nao — se colocar "nao", a camisa não aparece no site)

### Passo a passo para publicar a planilha:
1. Crie ou importe a planilha no Google Sheets (use o arquivo de modelo `planilha-exemplo.csv` na raiz do projeto como base).
2. No menu do Google Sheets, clique em:
   * **Arquivo** → **Compartilhar** → **Publicar na Web**.
3. Na janela que abrir:
   * Em vez de *"Página da Web"*, selecione **"Valores separados por vírgula (.csv)"**.
4. Clique em **Publicar** e copie o link gerado.
5. Cole o link no arquivo [`src/config/loja.ts`](src/config/loja.ts):
```typescript
planilhaCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-SEU-LINK/pub?output=csv",
```
* O catálogo atualizará automaticamente a cada 5 minutos (300 segundos de cache no servidor). Se o link estiver vazio ou offline, o site usa o arquivo [`src/data/products.json`](src/data/products.json).

---

## 🖼️ 3. Como Trocar a Logo e as Imagens

* **Logo**: Salve a sua logo oficial como arquivo PNG de fundo transparente com o nome `logo.png` na pasta [`public/logo.png`](public/).
* Se não houver arquivo `logo.png`, o site exibe o logotipo estilizado em tipografia bold e itálica nas cores da marca.

---

## 🏷️ 4. Como Alterar os Banners de Promoção ("Pague 3 Leve 5")

Os banners rotativos da página inicial podem ser modificados a qualquer momento no arquivo [`src/data/promos.json`](src/data/promos.json):

```json
[
  {
    "id": 1,
    "titulo": "SUPER PROMOÇÃO DE MANTO",
    "subtitulo": "PAGUE 3, LEVE 5 CAMISAS",
    "descricao": "Válido para camisas modelo Torcedor e Jogador de qualquer liga.",
    "tag": "OFERTA POR TEMPO LIMITADO",
    "ctaTexto": "Aproveitar no WhatsApp",
    "ctaLink": "#mais-vendidos",
    "corFundo": "from-[#D10000] via-[#900000] to-[#0A0A0A]"
  }
]
```

---

## 🎨 5. Paleta de Cores e Tipografia

* **Vermelho de destaque**: `#D10000`
* **Preto**: `#0A0A0A`
* **Branco**: `#FFFFFF`
* **Cinza claro de fundo**: `#F4F4F4`
* Para alterar as cores globais, edite as variáveis no início de [`src/app/globals.css`](src/app/globals.css).

---

## 🚢 6. Como Publicar na Vercel (Deploy)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Suba o projeto para um repositório no seu GitHub.
3. Na Vercel, clique em **"Add New"** → **"Project"** e selecione o repositório.
4. A Vercel detectará automaticamente que é um projeto **Next.js**.
5. Clique em **"Deploy"**. Em menos de 2 minutos seu catálogo estará no ar com HTTPS gratuito e domínio próprio!
