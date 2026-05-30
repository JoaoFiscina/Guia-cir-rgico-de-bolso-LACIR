# Validação de Imagens da Teoria Cirúrgica - Pós-Correção

Este relatório apresenta o resultado da validação automática executada sobre os mapeamentos de imagem da aba **Teoria Cirúrgica** (Módulos de Instrumental, Centro Cirúrgico, Preparo do Paciente, Nós e Síntese).

Data de geração: 2026-05-30

---

## 1. Estatísticas Gerais
- **Total de referências de imagem validadas**: 82
- **Imagens ausentes / caminhos quebrados**: 0
- **Imagens suspeitas (< 2KB)**: 0
- **Itens sem imagem (Placeholder / Em revisão)**: 5
- **Imagens compartilhadas / duplicadas**: 1

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
- **[Centro Cirúrgico e Paramentação]** Tópico: "Ambiente Cirúrgico vs Sala Cirúrgica" (ID: `ambiente_vs_sala`)
- **[Preparo do Paciente]** Tópico: "Fatores de Contaminação" (ID: `fatores_contaminacao`)
- **[Preparo do Paciente]** Tópico: "Banho e Tricotomia Pré-Operatória" (ID: `banho_tricotomia`)
- **[Nós e Síntese Cirúrgica]** Tópico: "Retirada de Pontos" (ID: `retirada_pontos`)

---

## 5. Imagens Compartilhadas (Duplicadas)
*Imagens vinculadas a múltiplos cards. Útil para verificar se instrumentos diferentes estão usando a mesma representação visual (ex: Kelly e Crile).*

- `assets/teoria/modulo_curso_2025/img_p14_2.png` é compartilhada por: "Tesoura Mayo" (ID: `tesoura_mayo` no módulo *Instrumental Cirúrgico*), "Tesoura Metzenbaum" (ID: `tesoura_metzenbaum` no módulo *Instrumental Cirúrgico*)

---

*Relatório gerado automaticamente por `scripts/validar_imagens_teoria.js`.*
