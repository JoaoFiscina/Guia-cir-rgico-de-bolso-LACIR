# Auditoria da Teoria Cirurgica - imagens vs PDF

Data: 2026-05-29

Escopo: aba **Teoria Cirurgica** do site publicado em `https://joaofiscina.github.io/Guia-cir-rgico-de-bolso-LACIR/`, comparada com o PDF local `modulo curso 2025.pdf` e com as imagens extraidas em `assets/teoria/modulo_curso_2025/`.

## Resumo executivo

- O site publicado esta igual aos arquivos locais de teoria (`teoria/*.json`, `teoria.js` e `styles.css`).
- Nao encontrei imagens quebradas por caminho/404: todas as imagens referenciadas no site respondem `200`.
- A maior incongruencia esta no bloco **Instrumental Cirurgico > Especiais**: ha imagens ausentes mesmo existindo imagem correspondente extraida do PDF, e ha imagens trocadas entre instrumentos.
- Os topicos conceituais sem imagem parecem aceitaveis quando o PDF nao traz uma figura especifica: `Ambiente Cirurgico vs Sala Cirurgica`, `Fatores de Contaminacao`, `Banho e Tricotomia Pre-Operatoria` e `Retirada de Pontos`.

## Achados criticos

| Modulo | Item no site | Estado atual | Problema | Acao recomendada |
|---|---|---|---|---|
| Instrumental | Pinça Desjardins | Sem imagem | Ha imagem compativel no acervo extraido do PDF. | Mapear para `assets/teoria/modulo_curso_2025/img_p20_1.png` ou revisar visualmente no PDF antes de publicar. |
| Instrumental | Pinça Guyon | Sem imagem | Ha imagem compativel no acervo extraido do PDF. | Mapear para `assets/teoria/modulo_curso_2025/img_p20_3.png` se confirmada como Guyon. |
| Instrumental | Pinça Cheron | Sem imagem | Ha imagem compativel no acervo extraido do PDF. | Mapear para `assets/teoria/modulo_curso_2025/img_p20_4.png` se confirmada como Cheron. |
| Instrumental | Pinça Allis | Sem imagem | Ha imagem compativel no acervo extraido do PDF. | Mapear para `assets/teoria/modulo_curso_2025/img_p20_2.png` se confirmada como Allis. |
| Instrumental | Pinça Foerster | Sem imagem | Ha imagem com aneis/fenestracoes no acervo, mas o site mostra fallback. | Provavel mapeamento para `assets/teoria/modulo_curso_2025/img_p21_1.png`, com revisao final. |
| Instrumental | Clamps Intestinais | `img_p21_1.png` | A imagem atual parece pinça fenestrada/de aneis, nao clamps intestinais longos. | Provavel substituicao por `img_p21_2.png`. |
| Instrumental | Pinça Mixter | `img_p21_2.png` | A imagem atual parece clamps intestinais, nao Mixter em angulo reto. | Remover imagem atual; buscar/reextrair uma Mixter correta. |
| Instrumental | Pinça Collin | `img_p21_4.png` | A descricao fala em pontas circulares/argolas, mas a imagem atual parece ponta triangular/atraumatica. | Provavel troca com Duval: usar `img_p21_3.png`. |
| Instrumental | Pinça Duval | `img_p21_3.png` | A descricao fala em ponta triangular, mas a imagem atual parece circular/fenestrada. | Provavel troca com Collin: usar `img_p21_4.png`. |
| Instrumental | Pinça Backhaus | `img_p22_3.png` | A imagem atual parece porta-agulhas/pinça reta com cremalheira, nao pinça de campo Backhaus. | Usar `img_p22_1.png`. |
| Instrumental | Porta-Agulhas Mathieu | `img_p22_2.png` | O Mathieu deve ser sem argolas; a imagem atual tem argolas. | Usar `img_p22_4.png`. |

## Itens sem imagem que parecem aceitaveis

| Modulo | Item | Motivo |
|---|---|---|
| Centro Cirurgico e Paramentacao | Ambiente Cirurgico vs Sala Cirurgica | Topico conceitual; a imagem de capa antiga era generica e nao ensinava o conceito. |
| Preparo do Paciente | Fatores de Contaminacao | Topico conceitual/lista; sem figura dedicada clara no PDF. |
| Preparo do Paciente | Banho e Tricotomia Pre-Operatoria | Topico conceitual; sem figura dedicada clara no PDF. |
| Nos e Sintese | Retirada de Pontos | Sem figura dedicada clara no material conferido. |

## Pontos bons ja corrigidos

- Bisturi usa imagem dedicada de melhor qualidade (`assets/teoria/bisturi.png`).
- Tesouras Mayo/Metzenbaum usam a figura comparativa correta (`img_p14_2.png`), embora a mesma imagem apareca nos dois cards.
- Pinças anatomica e dente de rato estao coerentes com `img_p15_1.png` e `img_p15_2.png`.
- Hemostaticas principais estao coerentes: Halsted (`img_p16_1.png`), Kelly (`img_p16_2.png`), Crile (`img_p16_4.png`), Kocher (`img_p16_7.png`) e Rochester (`img_p16_8.png`).
- Afastadores de exposicao estao coerentes no conjunto principal: Farabeuf, valvula suprapubica, Doyen, Langenbeck, Volkmann, Harrington, Deaver, espatula maleavel, Gosset e Finochietto.
- Galerias de antissepsia alcoolica, preparo do paciente, campos cirurgicos, agulhas e suturas estao funcionando com multiplas imagens.

## Observacoes tecnicas

- O arquivo `teoria/teoria-imagens-map.json` esta desalinhado com o que o site usa atualmente. Ele nao parece ser consumido por `teoria.js`, mas pode induzir futuras correcoes erradas.
- Os relatorios antigos em `relatorios/` tambem ficaram desatualizados: a validacao anterior apontava 6 itens sem imagem, enquanto a leitura atual do JSON publicado/local aponta 9.
- Nao ha erro de publicacao dos assets; o problema e de curadoria/mapeamento visual, nao de carregamento.

## Prioridade sugerida

1. Corrigir primeiro as trocas evidentes: Backhaus, Mathieu, Collin, Duval, Clamps e Mixter.
2. Preencher as imagens ausentes dos especiais quando houver imagem clara no PDF: Desjardins, Guyon, Cheron, Allis e Foerster.
3. Manter fallback nos topicos conceituais sem figura especifica, ou criar diagramas proprios futuramente.
4. Atualizar `teoria-imagens-map.json` e regenerar a validacao para que os relatorios batam com o site real.
