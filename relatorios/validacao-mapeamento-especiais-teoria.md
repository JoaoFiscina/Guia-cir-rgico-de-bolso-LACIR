# Validação do Mapeamento de Imagens e Correção Conceitual - Teoria Cirúrgica

Este documento detalha e valida as correções conceituais e os mapeamentos de imagens dos instrumentais cirúrgicos na aba **Teoria Cirúrgica**, realizadas de acordo com o feedback humano e as normas anatômico-cirúrgicas clássicas.

**Data de Atualização**: 31 de maio de 2026

---

## 1. Fontes Conceituais e Referências Consultadas

Para confirmar a correta classificação anatômico-funcional dos instrumentais e resolver as incoerências conceituais do PDF de curso, foram consultadas as seguintes fontes de referência técnica:
1. **Tratado de Técnica Cirúrgica (Goffi)**: Referência clássica para a categorização dos tempos cirúrgicos (diérese, preensão, hemostasia, exposição, especiais e síntese).
2. **Roteiro de Habilidades Cirúrgicas da Escola Bahiana de Medicina e Saúde Pública (EBMSP)**: Guia prático de reconhecimento e empunhadura de instrumentais.
3. **Manual de Instrumentação Cirúrgica**: Normas de arrumação e passagem estéreis.

---

## 2. Reclassificação de Pinças Traumáticas (Kocher & Rochester)

### Problema Identificado
As pinças **Kocher** e **Rochester** estavam classificadas originalmente no grupo de *Hemostasia*. Por possuírem ranhuras fortes associadas a garras e dentes proeminentes (no caso da Kocher) ou dimensões pesadas de esmagamento (no caso da Rochester), elas são altamente traumáticas e não devem ser apresentadas aos estudantes no mesmo grupo de hemostasia delicada (junto a Halsted/Kelly/Crile).

### Solução Aplicada
1. **Criação de Novo Grupo**: Adicionado o grupo `"preensao_traumatica"` (Preensão traumática) em `teoria/instrumental_cirurgico.json` com a cor característica de destaque laranja-escuro (`"#d35400"`).
2. **Reclassificação**:
   - **Pinça Kocher**: Movida do grupo `hemostasia` para `preensao_traumatica`.
   - **Pinça Rochester**: Movida do grupo `hemostasia` para `preensao_traumatica`.
3. **Atualização no Quiz**: As perguntas rápidas associadas a esses instrumentais (`q4` e `q10`) foram reatribuídas para o grupo `"preensao_traumatica"`.
4. **Comportamento no Frontend**: Como a arquitetura do `teoria.js` e do `styles.css` carrega os badges, cores e filtros a partir da definição dinâmica do JSON, a criação do grupo adiciona automaticamente o novo filtro "Preensão traumática" ao topo do grid e atualiza os badges dos cards/detalhes dos dois instrumentos com o fundo laranja-escuro correspondente.

---

## 3. Correção de Mapeamento de Imagens de Instrumentais

Com base no feedback e na análise anatômica dos instrumentais, foram aplicadas as seguintes correções de imagens:

| Instrumento | Imagem Anterior | Imagem Atual | Motivação Anatômica / Solução |
| :--- | :--- | :--- | :--- |
| **Pinça Collin** | `img_p21_4.png` (Duval) | `img_p21_3.png` | Inversão corrigida. No PDF original, a imagem da Duval estava com o nome de Collin. A Collin possui pontas em argolas circulares lisas/planas. |
| **Pinça Duval** | `img_p21_3.png` (Collin) | `img_p21_4.png` | Inversão corrigida. A Duval real possui garras triangulares planas vazadas. |
| **Clamps Intestinais** | `img_p21_1.png` | `img_p21_2.png` | A imagem `img_p21_2.png` (que mostra clamps intestinais longos e flexíveis para coproestase) foi atribuída corretamente aos Clamps. |
| **Pinça Mixter** | `img_p21_2.png` (Clamps) | `""` *(Fallback)* | Removida a imagem incorreta de clamps. Como não há imagem real da Mixter (dobra a 90 graus) no acervo do PDF, exibe o fallback estético "Imagem em revisão". |
| **Pinça Backhaus** | `img_p22_3.png` (Hegar) | `img_p22_2.png` | A imagem `img_p22_2.png` é a verdadeira Backhaus (pinça pequena com garras pontiagudas curvas para prender campos). Removida a imagem de Hegar (`img_p22_3.png`). |
| **Porta-Agulhas Mathieu** | `img_p22_2.png` (Backhaus) | `""` *(Fallback)* | Removida a imagem incorreta de Backhaus. O Mathieu (porta-agulhas com mola na palma da mão) não possui imagem no acervo do PDF e exibe o fallback correto. |
| **Porta-Agulhas Hegar** | `porta_agulha_hegar.png` | `porta_agulha_hegar.png` | Mantida a imagem de Hegar em alta definição no site principal e desassociada de qualquer uso incorreto como Backhaus. |

---

## 4. Sincronização do Arquivo de Metadados (`teoria-imagens-map.json`)

O mapa secundário de imagens `teoria/teoria-imagens-map.json` (usado para automações e indexação) foi sincronizado para refletir o mapeamento correto de produção:
- `img_p21_1.png` -> Removido de `pinca_foerster` e marcado como `"revisar_sem_uso"` (trata-se de imagem secundária de clamps).
- `img_p22_1.png` -> Atualizado de `pinca_backhaus` para `"porta_agulha_hegar"` (representa o Hegar extraído do PDF).
- `img_p22_2.png` -> Atualizado de `revisar_sem_uso` para `"pinca_backhaus"` (imagem verdadeira da Backhaus).
- `img_p22_4.png` -> Atualizado de `porta_agulha_mathieu` para `"revisar_sem_uso"` (imagem conceitualmente sem correspondência segura).

---

## 5. Validação Técnica Executada

1. **Validação de Sintaxe JSON**: Arquivos `teoria/instrumental_cirurgico.json` e `teoria/teoria-imagens-map.json` foram testados e são válidos.
2. **Validação Física de Caminhos (Script `validar_imagens_teoria.js`)**:
   - **Caminhos de imagem quebrados**: 0 (nenhum 404 no disco).
   - **Imagens suspeitas (< 2KB)**: 0.
   - **Itens corretos com fallback**: 7 (incluindo Foerster, Mixter e Mathieu no módulo instrumental).
   - **Imagens duplicadas**: Apenas `img_p14_2.png` (compartilhada justificadamente entre a Mayo e a Metzenbaum para diérese).

---

## 6. Conformidade com as Regras de Escopo

- A pasta `/procedimentos` não foi alterada.
- O parser e o schema dos roteiros práticos não sofreram modificações.
- As mecânicas de Favoritos, Estudo e Foco permanecem intocadas e estáveis.
- Não foi gerada nenhuma imagem por Inteligência Artificial nem efetuado download externo.
- Nenhum commit ou push foi executado.
