# Validação de Imagens da Teoria Cirúrgica - Pós-Correção

Este relatório apresenta o resultado da validação automática executada sobre os mapeamentos de imagem da aba **Teoria Cirúrgica** (Módulos de Instrumental, Centro Cirúrgico, Preparo do Paciente, Nós e Síntese).

Data de geração: 2026-05-29

---

## 1. Estatísticas Gerais
- **Total de referências de imagem validadas**: 81
- **Imagens ausentes / caminhos quebrados**: 0
- **Imagens suspeitas (< 2KB)**: 0
- **Itens sem imagem (Placeholder / Em revisão)**: 6
- **Imagens compartilhadas / duplicadas**: 2

---

## 2. Imagens com Caminho Quebrado (404 no disco)
*Nenhuma imagem com caminho quebrado encontrada.*

---

## 3. Imagens Suspeitas (Tamanho menor que 2KB)
*Estes arquivos existem física no disco, mas seu tamanho sugere que são imagens vazias, transparentes ou linhas horizontais decorativas do PDF original.*

*Nenhum arquivo suspeito < 2KB está sendo usado.*

---

## 4. Itens sem Imagem (Mapeamento Vazio / Em revisão)
*Estes cards/tópicos estão usando fallback visual elegante ("Imagem em revisão") na interface.*

- **[Instrumental Cirúrgico]** Instrumento: "Pinça Mixter (Ângulo Reto)" (ID: `pinca_mixter`)
- **[Instrumental Cirúrgico]** Instrumento: "Pinça Backhaus (Pinça de Campo)" (ID: `pinca_backhaus`)
- **[Instrumental Cirúrgico]** Instrumento: "Porta-Agulhas Mathieu" (ID: `porta_agulha_mathieu`)
- **[Preparo do Paciente]** Tópico: "Fatores de Contaminação" (ID: `fatores_contaminacao`)
- **[Preparo do Paciente]** Tópico: "Banho e Tricotomia Pré-Operatória" (ID: `banho_tricotomia`)
- **[Nós e Síntese Cirúrgica]** Tópico: "Retirada de Pontos" (ID: `retirada_pontos`)

---

## 5. Imagens Compartilhadas (Duplicadas)
*Imagens vinculadas a múltiplos cards. Útil para verificar se instrumentos diferentes estão usando a mesma representação visual (ex: Kelly e Crile).*

- `assets/teoria/modulo_curso_2025/img_p17_2.png` é compartilhada por: "Pinça Kelly" (ID: `pinca_kelly` no módulo *Instrumental Cirúrgico*), "Pinça Crile" (ID: `pinca_crile` no módulo *Instrumental Cirúrgico*)
- `assets/teoria/modulo_curso_2025/img_p17_3.png` é compartilhada por: "Pinça Kocher" (ID: `pinca_kocher` no módulo *Instrumental Cirúrgico*), "Pinça Rochester" (ID: `pinca_rochester` no módulo *Instrumental Cirúrgico*)

---

*Relatório gerado automaticamente por `scripts/validar_imagens_teoria.js`.*
