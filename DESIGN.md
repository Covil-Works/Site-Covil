# Identidade Visual: Covil

A identidade visual da Covil é moderna, tecnológica e segue uma forte tendência de **Dark Mode**, reforçando a ideia de um "Covil" seguro, profundo e noturno.

## Tipografia
- **Família Tipográfica Principal:** `Poppins` (sans-serif)
- **Pesos Utilizados:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
A escolha da Poppins confere um tom amigável e moderno, garantindo alta legibilidade e uma estética limpa e contemporânea.

## Paleta de Cores

A paleta de cores foca em tons muito escuros para o fundo, criando profundidade, com textos claros para contraste e um tom de verde como sotaque (accent) que remete à tecnologia e crescimento.

### Cores Base (Backgrounds e Superfícies)
- **Background Principal:** `#070a0e` (Quase preto, levemente azulado/frio)
- **Preto Puro:** `#000000`
- **Superfícies (Cards, Elementos Secundários):** `#0e1518` (Tom escuro um pouco mais claro que o background para destacar elementos)
- **Superfícies Alternativas (Painéis):** `#0e1218`

### Cores de Conteúdo (Textos e Destaques)
- **Texto Principal:** `#f5f7fb` (Branco/Gelo, para contraste máximo sem ofuscar)
- **Texto Mudo/Secundário:** `#c9d0dc` (Cinza azulado para hierarquia visual menor)
- **Destaque (Accent):** `#057447` (Verde esmeralda forte, usado para ícones e ênfase)

## Elementos Estéticos e Vibe
- **Overlays e Sombras:** Uso de overlays dinâmicos (`#050709` no hero, `#020a10` na floresta) com opacidades e fade-ins baseados em scroll.
- **Estrutura:** Layout focado em centralização responsiva com limite máximo de largura (`container-width: 1200px`) e gutters de `20px`.
- **Animações e Interações:** 
  - Animações imersivas de vagalumes ("fireflies") que dão um ar lúdico e vivo à página inicial.
  - Interações ricas de ponteiro (mouse hover glow) nos cards de serviços, onde a iluminação segue o mouse do usuário.
  - Opacidade de cards baseada na posição do scroll (ex: card "Por que a Covil?").


## Diretrizes refinadas
- Manter exclusivamente a paleta original da Covil: fundo #070a0e, superfícies #0e1518 e #0e1218, texto #f5f7fb, texto secundário #c9d0dc e verde #057447. Não usar laranja.
- Usar Poppins, com hero e títulos de seção em escala forte porém contida; títulos de seção têm 50px de distância do conteúdo no desktop e 40px no mobile.
- O container principal acompanha o cabeçalho recolhido: min(calc(100% - 32px), 1120px). O espaçamento vertical entre seções é 60px.
- Na seção Sobre, a logo fica à esquerda no desktop, com 30px até o texto; no mobile, fica acima do texto e tudo é centralizado.
- A seção Por que a Covil usa títulos com as mesmas propriedades de Sobre e Nossos Serviços; suas tiras de textura são finas e o título fica dentro do container da imagem, alinhado à esquerda.
- O botão do WhatsApp usa o verde de destaque #057447.
## Regras visuais implementadas na home

### Hero
- O título usa texto claro, com peso regular (`400`) no conteúdo comum.
- Os trechos destacados continuam em bold (`700`), mas herdam a cor clara do título; não recebem verde.
- O texto atual é: “Softwares robustos / focados na necessidade / do seu negócio.”
- O ponto final fica fora do trecho em bold, para não receber o mesmo peso tipográfico.

### Títulos de seção
- Os títulos gerais usam a mesma escala do título de contato: `clamp(1.8rem, 5vw, 3.4rem)`.
- O título “Vamos tirar seu projeto do papel?” e o texto de apoio ficam alinhados à esquerda, como os demais títulos de seção.
- O parágrafo de contato não possui quebra de linha forçada; a largura disponível decide a quebra naturalmente.

### Vagalumes
- Os vagalumes são elementos HTML animados e não usam imagens.
- Os núcleos variam entre `2px`, `3px` e `4px` e são desenhados por `.hero-firefly::before`, com círculo branco sobre três camadas de `box-shadow`.
- O brilho usa a linguagem verde da referência: camada interna concentrada, camada média translúcida e camada externa difusa.
- A estrutura, as posições, o deslocamento e o piscar continuam controlados por CSS e pelas animações existentes.
