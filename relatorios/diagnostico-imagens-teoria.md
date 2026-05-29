# Diagnóstico Técnico Detalhado — Imagens da Teoria Cirúrgica

Este relatório apresenta o diagnóstico técnico completo dos problemas persistentes de exibição, mapeamento e layout das imagens na aba **Teoria Cirúrgica** (com foco no módulo *Instrumental Cirúrgico*) do **Guia de Cirurgia de Bolso da LACIR**, indicando as causas prováveis e propondo um plano de correção detalhado.

---

## 1. Resumo Executivo

A aba "Teoria Cirúrgica" foi recentemente adicionada para complementar o guia prático com tópicos fundamentais baseados no PDF do *Módulo de Curso 2025*. Entretanto, usuários relataram problemas como imagens cortadas, mal dimensionadas, quase invisíveis ou substituídas por placeholders genéricos.

Após auditoria técnica detalhada do código JS (`teoria.js`), das folhas de estilo (`styles.css`), do mapeamento de dados (`teoria/*.json`) e dos arquivos físicos extraídos, identificamos quatro causas principais:
1.  **Limitação Arquitetural do JSON/JS**: O motor do site espera um único caminho de imagem em string por item (`item.imagem`), ignorando sequências de imagens de passos (como as 16 etapas da Antissepsia Alcoólica), deixando 107 das 149 imagens físicas orquestradas na pasta órfãs e inutilizadas.
2.  **Imagens Físicas Ausentes/Incorretas**: As páginas 23 e 24 do PDF original (que continham os instrumentos Mixter, Backhaus e Mathieu) estão totalmente ausentes na pasta física de extração. Além disso, 15 imagens de procedimentos (páginas 25 a 30) possuem tamanho inferior a 2KB, sendo arquivos transparentes ou fragmentos em branco inúteis.
3.  **Mapeamento Genérico/Duplicado**: Vários instrumentos diferentes (Kelly/Crile, Kocher/Rochester) compartilham exatamente a mesma imagem por falta de arquivos específicos no PDF ou no mapeamento. Imagens externas de alta qualidade que estão na raiz (como `arrumacao_mesa.png` e `bisturi.png`) foram ignoradas no JSON de instrumental.
4.  **Inconsistência no CSS**: A altura fixa de `180px` com `overflow: hidden` nos cards e a falta de padronização de aspect-ratio no modal de detalhe provocam vazios estéticos e reduzem drasticamente o tamanho visual de esquemas horizontais longos. Além disso, o fundo claro `#F6F8F5` esconde traços finos de desenhos com fundo transparente.

---

## 2. Lista dos Principais Bugs Encontrados

*   **B1 — Imagens Ausentes (Placeholders)**: Os instrumentos **Mixter**, **Backhaus** e **Porta-Agulhas Mathieu** aparecem sem imagem porque as páginas 23 e 24 não foram extraídas física e corretamente. O mesmo ocorre no tópico **Retirada de Pontos** e nos conceitos iniciais de **Preparo do Paciente**.
*   **B2 — Imagens Idênticas para Itens Diferentes**: As pinças Kelly e Crile exibem exatamente a mesma imagem (`img_p17_2.png`), impossibilitando a distinção visual do serrilhado (50% vs 100%). O mesmo ocorre com as pinças Kocher e Rochester (`img_p17_3.png`).
*   **B3 — Imagens de Baixíssimo Contraste (Invisíveis)**: Algumas imagens de traçado vetorial fino (como pinças cirúrgicas e ilustrações da paramentação) perdem legibilidade e contraste contra o fundo `#F6F8F5` das caixas.
*   **B4 — Desperdício de Imagens de Alta Qualidade**: As imagens de alta definição `arrumacao_mesa.png` (743 KB) e `bisturi.png` (78 KB) estão na pasta raiz `/assets/teoria/` mas os arquivos JSON apontam para fragmentos menores e de baixa qualidade (`img_p13_1.png` e `img_p14_1.png`).
*   **B5 — Subutilização de Galerias Passo a Passo**: Tópicos com ricas ilustrações sequenciais (como as 16 etapas da Antissepsia Alcoólica na página 11, e as etapas de colocação de campos na página 28) mostram apenas a primeira figura, pois o site não implementa galerias ou carrosséis no modal de detalhes.
*   **B6 — Layout de Detalhe Desproporcional**: O uso de `overflow: visible` e `height: auto` em `.teoria-detail-image-box` acarreta variações gritantes no tamanho dos blocos de detalhes, encolhendo figuras horizontais e esticando verticais de forma desproporcional.

---

## 3. Arquivos Analisados

*   **HTML**: `index.html` (Wrapper da seção `#theorySection`, linhas 466–500)
*   **CSS**: `styles.css` (Seletores `.teoria-*`, linhas 1993–2715)
*   **JavaScript**: `teoria.js` (Lógica de renderização modular eLightbox, linhas 1–837)
*   **JSONs de Conteúdo**:
    *   `teoria/teoria-manifest.json`
    *   `teoria/instrumental_cirurgico.json`
    *   `teoria/centro_cirurgico_paramentacao.json`
    *   `teoria/preparo_do_paciente.json`
    *   `teoria/nos_e_sintese.json`
*   **JSON de Mapeamento**: `teoria/teoria-imagens-map.json` (Passivo, não carregado pelo sistema)
*   **Imagens Físicas**: `assets/teoria/` e `assets/teoria/modulo_curso_2025/`

---

## 4. Diagnóstico CSS

As propriedades das folhas de estilo foram revisadas linha por linha. A seguir estão descritas as regras problemáticas localizadas em `styles.css`:

### 4.1. `.teoria-card-image` (Linhas 2260–2271)
*   **Regra Atual**:
    ```css
    .teoria-card-image {
      width: 100%;
      height: 180px;
      border-radius: var(--radius-md);
      background: #F6F8F5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid var(--border);
      position: relative;
    }
    ```
*   **Problema**: A altura fixa de `180px` força imagens horizontais longas ou imagens verticais de pinças a encolherem excessivamente para caber no box (via `object-fit: contain`). O fundo `#F6F8F5` diminui o contraste de traços cinzas/pretos finos e transparentes.

### 4.2. `.teoria-detail-image-box` e `img` (Linhas 2389–2410)
*   **Regras Atuais**:
    ```css
    .teoria-detail-image-box {
      width: 100%;
      height: auto;
      max-height: min(70vh, 720px);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: #F6F8F5;
      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .teoria-detail-image-box img {
      width: 100%;
      max-width: 100%;
      height: auto;
      max-height: min(70vh, 720px);
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    ```
*   **Problema**: O container com `height: auto` e `overflow: visible` não estabelece um aspect-ratio fixo. Isso causa uma quebra de layout quando há transição entre cards de formatos diferentes: imagens horizontais de mesa ficam muito achatadas, enquanto pinças muito longas criam um modal vertical gigantesco.

### 4.3. Contrastes e Temas (Geral)
*   Não há tratamento de mix-blend-mode ou filtros de inversão de cores. Com isso, diagramas do PDF com traço escuro e fundo transparente tornam-se completamente invisíveis quando renderizados sob temas escuros do site (Modo Foco ou afins), restando apenas a caixa vazia.

---

## 5. Diagnóstico de Mapeamento e Dados (JSONs)

### 5.1. JSONs Analisados e Campos de Imagem
Todos os 4 JSONs de teoria utilizam o campo `"imagem"` do tipo *string* contendo o caminho relativo do arquivo.
O arquivo `teoria-imagens-map.json` contém um mapeamento detalhado relacionando as imagens aos módulos e tópicos específicos. Entretanto:
*   **O arquivo `teoria-imagens-map.json` NÃO é importado nem usado em nenhum lugar do código de produção.**
*   A renderização depende exclusivamente do campo `"imagem"` de cada card/tópico nos JSONs individuais.

### 5.2. Análise de Inconsistências de Mapeamento
*   **Caminhos vazios ("")**: Itens mapeados no JSON sem nenhuma imagem de origem, disparando o fallback.
*   **Imagens agrupadas**: O JSON de *Nós e Síntese* agrupa todos os pontos cirúrgicos em uma única seção `suturas_descontinuas` apontando apenas para `img_p38_1.png` (Ponto Simples). As imagens dos demais pontos (Invertido, X, U, Donatti) estão no disco mas nunca são acessadas.
*   **Substituições pendentes**: A imagem de alta resolução da arrumação da mesa (`arrumacao_mesa.png` - 743 KB) e do bisturi (`bisturi.png` - 78 KB) estão na raiz do diretório `/assets/teoria/` mas continuam mapeadas para os fragmentos extraídos de baixa resolução.

---

## 6. Diagnóstico de Arquivos Físicos (Assets)

Uma auditoria nos diretórios `/assets/teoria/` e `/assets/teoria/modulo_curso_2025/` revelou o seguinte quadro:

1.  **Total de imagens físicas encontradas**: 149 PNGs na pasta `modulo_curso_2025` e 4 arquivos de alta resolução na raiz.
2.  **Imagens referenciadas nos JSONs**: Apenas 46 imagens exclusivas são apontadas pelos JSONs de teoria.
3.  **Imagens órfãs**: 107 imagens físicas encontram-se sem qualquer referência nos JSONs de teoria (a grande maioria são passos sequenciais e figuras adicionais não mapeadas).
4.  **Caminhos quebrados**: 0 (nenhuma imagem referenciada no JSON está com caminho quebrado; todas apontam para arquivos que de fato existem físico-quimicamente).
5.  **Imagens suspeitas (< 2KB)**: 15 arquivos de imagem possuem tamanhos irrisórios (de 278 a 718 bytes), caracterizando extrações vazias, brancas ou transparentes da PDF.
6.  **Lista de imagens vazias por página do PDF**:
    *   **Página 25**: `img_p25_3.png` (339 B), `img_p25_5.png` (278 B)
    *   **Página 26**: `img_p26_2.png` (290 B), `img_p26_4.png` (424 B)
    *   **Página 27**: `img_p27_2.png` (509 B), `img_p27_4.png` (544 B), `img_p27_6.png` (591 B), `img_p27_8.png` (528 B)
    *   **Página 28**: `img_p28_3.png` (379 B), `img_p28_5.png` (520 B), `img_p28_7.png` (514 B)
    *   **Página 29**: `img_p29_2.png` (563 B), `img_p29_3.png` (718 B), `img_p29_5.png` (558 B)
    *   **Página 30**: `img_p30_2.png` (580 B)

---

## 7. Diagnóstico por Card / Tópico (Tabela Auditada)

| Módulo | Tópico/Card | Imagem Atual | Arquivo Existe? | Problema Visual Observado | Causa Provável | Sugestão de Correção | Prioridade |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **Instrumental** | Bisturi | `img_p14_1.png` | Sim | Qualidade média, corte apertado | Imagem recortada direta do PDF | Substituir por `assets/teoria/bisturi.png` | **Alta** |
| **Instrumental** | Tesoura Mayo | `img_p15_1.png` | Sim | Contraste baixo, linhas finas | Desenho vetorial transparente | Aplicar filtro de contraste / fundo branco | Média |
| **Instrumental** | Tesoura Metzenbaum | `img_p15_2.png` | Sim | Contraste baixo, linhas finas | Desenho vetorial transparente | Aplicar filtro de contraste / fundo branco | Média |
| **Instrumental** | Pinça Anatômica | `img_p16_1.png` | Sim | Quase invisível, sem contraste | Linhas muito claras do PDF | Otimizar brilho/contraste no CSS | Média |
| **Instrumental** | Pinça Dente de Rato | `img_p16_5.png` | Sim | Margem branca excessiva, encolhido | Margem extraída incorreta | Recortar margem no CSS ou usar object-fit | Média |
| **Instrumental** | Pinça Halsted (Mosquito) | `img_p17_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Pinça Kelly | `img_p17_2.png` | Sim | Idêntica à pinça Crile | Duplicação de mapeamento | Buscar imagem dedicada com ranhuras em 50% | **Alta** |
| **Instrumental** | Pinça Crile | `img_p17_2.png` | Sim | Idêntica à pinça Kelly | Duplicação de mapeamento | Buscar imagem dedicada com ranhuras em 100% | **Alta** |
| **Instrumental** | Pinça Kocher | `img_p17_3.png` | Sim | Idêntica à pinça Rochester | Duplicação de mapeamento | Buscar imagem dedicada com dente na ponta | **Alta** |
| **Instrumental** | Pinça Rochester | `img_p17_3.png` | Sim | Idêntica à pinça Kocher | Duplicação de mapeamento | Buscar imagem dedicada de grande porte | **Alta** |
| **Instrumental** | Farabeuf | `img_p18_1.png` | Sim | Mostra apenas um afastador | Ignora o par da imagem `img_p18_2.png` | Mapear ambas ou criar galeria | Baixa |
| **Instrumental** | Doyen | `img_p18_4.png` | Sim | Mostra apenas uma perspectiva | Ignora `img_p18_5.png` | Exibir ambas no detalhe | Baixa |
| **Instrumental** | Langenbeck | `img_p19_1.png` | Sim | Mostra apenas uma perspectiva | Ignora `img_p19_2.png` | Exibir ambas no detalhe | Baixa |
| **Instrumental** | Volkmann | `img_p19_3.png` | Sim | Traço fino, legibilidade ruim | Fundo transparente no CSS | Forçar fundo branco opaco no box da imagem | Média |
| **Instrumental** | Harrington | `img_p19_4.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Deaver | `img_p20_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Espátula Maleável | `img_p20_2.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Gosset | `img_p20_3.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Finochietto | `img_p20_4.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Desjardins | `img_p21_1.png` | Sim | Linhas muito claras | Contraste insuficiente | Melhorar contraste | Média |
| **Instrumental** | Guyon | `img_p21_2.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Cheron | `img_p21_3.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Allis | `img_p21_4.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Foerster | `img_p22_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Collin | `img_p22_2.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Duval | `img_p22_3.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Clamps Intestinais | `img_p22_4.png` | Sim | Nenhuma | - | - | Baixa |
| **Instrumental** | Pinça Mixter | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Pág. 23/24 do PDF ausente no disco | Providenciar imagem alternativa/re-extrair | **Crítica** |
| **Instrumental** | Pinça Backhaus | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Pág. 23/24 do PDF ausente no disco | Providenciar imagem alternativa/re-extrair | **Crítica** |
| **Instrumental** | Porta-Agulhas Hegar | `porta_agulha_hegar.png`| Sim | Nenhuma (Perfeita) | Imagem dedicada externa | Nenhuma (Manter) | Nenhuma |
| **Instrumental** | Porta-Agulhas Mathieu | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Pág. 23/24 do PDF ausente no disco | Providenciar imagem alternativa/re-extrair | **Crítica** |
| **Paramentação** | Ambiente vs Sala | `img_p0_1.png` | Sim | Imagem genérica da capa | Falta de imagem específica | Substituir por imagem esquemática da sala | Média |
| **Paramentação** | Zonas do Centro | `img_p2_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Paramentação** | Padrões Técnicos | `img_p6_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Paramentação** | Equipe Cirúrgica | `img_p7_1.png` | Sim | Ignora detalhe secundário | Ignora `img_p7_2.png` | Mapear ambas ou criar galeria | Média |
| **Paramentação** | Lavagem das Mãos | `img_p8_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Paramentação** | Antissepsia Alcoólica | `img_p9_1.png` | Sim | Mostra apenas a etapa 1 de 16 | Ignora as 16 etapas sequenciais | Adicionar suporte a carrossel/galeria | **Alta** |
| **Preparo** | Fatores Contaminação | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Tópico teórico sem figura no PDF | Manter fallback/placeholder (correto) | Nenhuma |
| **Preparo** | Banho e Tricotomia | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Tópico teórico sem figura no PDF | Manter fallback/placeholder (correto) | Nenhuma |
| **Preparo** | Degermação Paciente | `img_p25_2.png` | Sim | Ignora passos 1, 3, 4 e 5 | Outros passos são < 2KB (vazios) | Redesenhar ou usar ilustrações externas | **Alta** |
| **Preparo** | Pintura/Antissepsia | `img_p27_1.png` | Sim | Ignora passos 2 a 8 | Outros passos são < 2KB (vazios) | Redesenhar ou usar ilustrações externas | **Alta** |
| **Preparo** | Campos Cirúrgicos | `img_p28_1.png` | Sim | Ignora passos 2 a 7 | Outros passos são < 2KB (vazios) | Redesenhar ou usar ilustrações externas | **Alta** |
| **Nós e Síntese** | Princípios dos Nós | `img_p32_1.png` | Sim | Nenhuma | - | - | Baixa |
| **Nós e Síntese** | Tipos de Nós | `img_p32_2.png` | Sim | Nenhuma | - | - | Baixa |
| **Nós e Síntese** | Fios de Sutura | `img_p36_1.png` | Sim | Legibilidade sofrível na derme | Desenho vetorial de traço fino | Otimizar no CSS ou converter em HTML | Média |
| **Nós e Síntese** | Agulhas Cirúrgicas | `img_p37_1.png` | Sim | Ignora detalhe da ponta | Ignora `img_p37_2.png` no JSON | Mapear ambas ou criar galeria | Média |
| **Nós e Síntese** | Suturas Descontínuas | `img_p38_1.png` | Sim | Mostra apenas o Ponto Simples | Ignora imagens físicas de outros pontos | Mapear cada tipo de ponto ou usar galeria | **Alta** |
| **Nós e Síntese** | Suturas Contínuas | `img_p43_1.png` | Sim | Mostra apenas Chuleio Simples | Ignora `img_p44_1.png` (Ancorado) | Mapear individualmente ou usar galeria | **Alta** |
| **Nós e Síntese** | Retirada de Pontos | *Nenhuma* | **Não** | Placeholder ativo (Sem Imagem) | Sem imagem no PDF de origem | Criar esquema vetorial ou manter placeholder | Média |

---

## 8. Diagnóstico do Detalhe / Modal

O painel de detalhes (`.teoria-detail-panel`, inserido no container `#teoriaDetailContainer`) apresenta problemas pontuais:
1.  **Sem Zoom Integrado**: As imagens de instrumentos longos ficam muito pequenas no modal. Para enxergar os dentes ou ranhuras (diferença Kelly vs Crile), o usuário é obrigado a clicar para abrir o Lightbox. A imagem no modal de detalhes deveria ocupar um espaço mais proeminente e com melhor definição.
2.  **Inconsistência de Dimensões**: A ausência de um aspect-ratio fixo para `.teoria-detail-image-box` (como `aspect-ratio: 4/3` ou `16/9`) faz com que a caixa cinza se contraia verticalmente até 80px para imagens horizontais largas e se estenda até 720px para imagens verticais de pinças. Isso empurra o texto do detalhe para baixo de forma caótica no mobile e cria enormes espaços vazios no desktop.
3.  **Visual Sem Moldura / Margens**: Algumas imagens encostam nas bordas da caixa cinza, pois não há um padding de segurança interna para o elemento `<img>` dentro de `.teoria-detail-image-box`.

---

## 9. Causas Prováveis (Sintetizado)

### 9.1. CSS/Layout
*   Falta de um `aspect-ratio` padronizado nos containers de exibição.
*   Hardcode do fundo do container de imagem (`#F6F8F5`), que conflita com temas escuros e apaga imagens de traço transparente.
*   Falta de um padding interno de segurança para as imagens.

### 9.2. Extração de Imagens
*   Falha na extração de páginas inteiras (pág. 23 e 24 do PDF original).
*   Falha no filtro de extração automatizada do PDF que resultou em 15 arquivos PNG vazios (< 2KB) correspondentes aos passos de Degermação, Pintura e Campos.

### 9.3. Mapeamento (JSON)
*   Atribuição de imagens duplicadas para instrumentos com diferenças anatômicas importantes (Kelly/Crile e Kocher/Rochester).
*   Ignorância da existência de imagens de alta definição na pasta raiz (como `arrumacao_mesa.png` e `bisturi.png`).
*   Agrupamento de múltiplos conceitos distintos (como 5 técnicas de sutura separadas) sob uma única chave com uma única imagem.

### 9.4. Renderização JS
*   Lógica rígida em `teoria.js` que espera apenas uma string `"imagem"`, impossibilitando a iteração de sequências e galerias.
*   Ausência total de uso do arquivo de mapeamento passivo `teoria-imagens-map.json`.

---

## 10. Plano de Correção Recomendado (Fases)

### Fase 1 — Correção de CSS (Aparência e Contraste)
*   **Contraste e Fundo**: Mudar o background de `.teoria-card-image` e `.teoria-detail-image-box` de `#F6F8F5` para um valor dinâmico baseado em variáveis CSS (ex: `var(--bg-soft)`) e aplicar `filter: contrast(1.1) multiply` ou similar se necessário. Para imagens transparentes em tema escuro, adicionar uma classe `.dark-mode img` que aplica um filtro de inversão de cores (`filter: invert(1) hue-rotate(180deg)`) ou força um fundo claro estrito para as imagens.
*   **Aspect Ratio**: Definir `aspect-ratio: 16/9` ou `4/3` com `width: 100%` e `height: auto` para `.teoria-card-image` e `.teoria-detail-image-box`, removendo alturas fixas rígidas como `180px`.
*   **Padding**: Inserir `padding: 12px;` nos containers de imagem para evitar que as garras encostem nas bordas.

### Fase 2 — Correção de Dados e Mapeamento (JSONs)
*   **Vincular Imagens Corretas**:
    *   Substituir a imagem do `bisturi` por `assets/teoria/bisturi.png`.
    *   Substituir a imagem de `regras_arrumacao` por `assets/teoria/arrumacao_mesa.png`.
*   **Desmembrar Itens Complexos**:
    *   Em `nos_e_sintese.json`, subdividir as seções de suturas para que cada técnica (Ponto Simples, Invertido, X, U, Donatti, Chuleio Simples, Chuleio Ancorado) tenha seu próprio card/bloco com seu respectivo ID e imagem correspondente (`img_p38_1.png` a `img_p44_1.png`).
*   **Mapeamento de Mathieu, Mixter e Backhaus**:
    *   Buscar imagens dedicadas na web ou re-extrair com precisão as páginas 23/24 do PDF original para cobrir esses três instrumentos críticos.

### Fase 3 — Correção da Renderização e JS (Galerias/Carrossel)
*   **Lógica de Múltiplas Imagens**: Alterar `teoria.js` para suportar tanto `"imagem": "caminho.png"` quanto `"imagens": ["caminho1.png", "caminho2.png"]`.
*   **Carrossel no Detalhe**: Se o item possuir o array `"imagens"`, renderizar um mini-carrossel de miniaturas ou botões "Anterior/Próximo" abaixo da imagem principal no modal de detalhes, permitindo ao usuário navegar pelos passos da Antissepsia Alcoólica (16 fotos) ou dos Campos (7 fotos).
*   **Integrar o Mapa**: Fazer `teoria.js` carregar `teoria-imagens-map.json` opcionalmente para resolver caminhos dinamicamente caso o campo `"imagem"` no JSON principal seja omitido ou nulo.

### Fase 4 — Revisão Manual e Qualidade Visual
*   Realizar o upscale digital das imagens de pinças que possuem baixa definição ou substituir por fotografias reais sob licença livre.
*   Criar diagramas vetoriais nativos em SVG (inseridos diretamente no HTML ou carregados como imagem) para tópicos conceituais (como Retirada de Pontos, Fatores de Contaminação) que não possuem imagens correspondentes no PDF de origem.

---

## 11. Riscos Antes de Corrigir

*   **R1 — Quebra de Performance**: O carregamento de 16 imagens simultâneas para um carrossel pode lentificar o site em redes móveis se não for feito por meio de lazy-loading inteligente (carregando as imagens subsequentes apenas ao abrir o detalhe).
*   **R2 — Quebra de Responsividade**: Modificar as dimensões de `.teoria-detail-image-box` sem testar exaustivamente em telas menores (iPhone SE, etc.) pode fazer com que o texto de detalhe desapareça sob o fold.
*   **R3 — Incompatibilidade com Tema Escuro**: Forçar filtros de inversão de cores (`invert`) em imagens coloridas (como esquemas de paramentação ou fotos reais) pode distorcer as cores reais de tecidos e aventais. O filtro deve ser aplicado apenas a imagens puramente esquemáticas preto e branco.

---

## 12. O Que NÃO Deve Ser Feito

*   **NÃO re-extrair as imagens sem alterar os scripts**: Usar as ferramentas padrões do Windows sem ajustar os parâmetros de DPI e corte resultará novamente em imagens sob/sobredimensionadas e de baixíssimo contraste.
*   **NÃO apagar o mapeamento antigo**: Manter retrocompatibilidade no JS para que cards sem o campo `"imagens"` (array) continuem funcionando normalmente com `"imagem"` (string).
*   **NÃO forçar `object-fit: cover` nas pinças**: Isso cortará as argolas ou as garras de fixação dos instrumentos, tornando impossível identificá-los. O correto é sempre usar `contain` com padding interno de segurança.

---

## 13. Checklist de Testes para a Próxima Correção

- [ ] A imagem do Bisturi é `assets/teoria/bisturi.png` de alta qualidade?
- [ ] A mesa cirúrgica exibe `assets/teoria/arrumacao_mesa.png` (alta qualidade) no card de Arrumação da Mesa?
- [ ] As pinças Mixter, Backhaus e Mathieu possuem imagens reais e não apresentam placeholder?
- [ ] As pinças Kelly e Crile exibem imagens diferentes onde os serrilhados são nítidos?
- [ ] As pinças Kocher e Rochester exibem imagens diferentes (dente vs liso)?
- [ ] O modal de detalhes de "Antissepsia Alcoólica" permite navegar por passos ilustrados?
- [ ] Os subtópicos de "Suturas Descontínuas" (Ponto Simples, Invertido, X, U, Donatti) exibem imagens exclusivas para cada técnica?
- [ ] As imagens não encostam nas bordas cinzas do box de exibição?
- [ ] A imagem não desaparece ou fica invisível sob o tema escuro (Modo Foco)?
- [ ] A transição entre cards de formatos diferentes não quebra ou deforma o layout do modal de detalhes?
- [ ] Testou a responsividade no mobile (largura de tela menor que 480px)?
