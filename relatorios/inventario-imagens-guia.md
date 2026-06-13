# Inventário de Imagens - Pasta "Imagens guia"

Este relatório apresenta o inventário detalhado das imagens fornecidas manualmente na pasta `Imagens guia/` para correção conceitual e visual da aba **Teoria Cirúrgica**.

**Data de Inventário**: 13 de junho de 2026

---

## 1. Imagens Encontradas e Mapeadas

Abaixo estão listados todos os 8 arquivos encontrados fisicamente na pasta `Imagens guia/`, com suas respectivas extensões, dimensões físicas (em pixels), tamanhos de arquivo e tópicos correspondentes no arquivo `teoria/instrumental_cirurgico.json`.

| Nome Original | Extensão | Dimensões | Tamanho (Bytes) | Tamanho Formatado | Tópico/Card Correspondente | Status |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| `Bisturi.png` | `.png` | 874 x 1693 | 2.263.979 | 2,21 MB | `bisturi` (Bisturi) | **Identificado** |
| `FOERSTER.jpg` | `.jpg` | 1000 x 1000 | 80.115 | 78,24 KB | `pinca_foerster` (Pinça Foerster) | **Identificado** |
| `Hegar.jpg` | `.jpg` | 225 x 225 | 3.026 | 2,96 KB | `porta_agulha_hegar` (Porta-Agulhas Hegar) | **Identificado** |
| `mathieu.jpg` | `.jpg` | 225 x 225 | 2.623 | 2,56 KB | `porta_agulha_mathieu` (Porta-Agulhas Mathieu) | **Identificado** |
| `mixter.jpg` | `.jpg` | 3456 x 2304 | 277.900 | 271,39 KB | `pinca_mixter` (Pinça Mixter) | **Identificado** |
| `Rochester.jpg` | `.jpg` | 900 x 674 | 55.956 | 54,64 KB | `pinca_rochester` (Pinça Rochester) | **Identificado** |
| `Tesoura mayo.jpg` | `.jpg` | 4000 x 3000 | 4.061.130 | 3,97 MB | `tesoura_mayo` (Tesoura Mayo) | **Identificado** |
| `Tesoura metzembaum.png`| `.png` | 225 x 225 | 2.887 | 2,82 KB | `tesoura_metzenbaum` (Tesoura Metzenbaum) | **Identificado** |

---

## 2. Imagens Solicitadas mas Não Fornecidas (Mantêm Fallback)

As imagens a seguir foram especificadas no escopo do preparo do paciente e de nós e síntese cirúrgica, porém **não foram localizadas** na pasta `Imagens guia/`. Para garantir a integridade técnica do site e evitar o uso de imagens de IA ou de fontes externas, esses tópicos continuarão utilizando o fallback visual padrão ("Imagem em revisão").

| Tópico / Card Solicitado | Arquivo Esperado | Módulo Relacionado | Status Atual |
| :--- | :--- | :--- | :---: |
| **Banho e Tricotomia Pré-Operatória** | `tricotomia_cirurgica.png` | Preparo do Paciente | **Não fornecido** |
| **Fatores de Contaminação** | `fatores_contaminacao_cirurgica.png` | Preparo do Paciente | **Não fornecido** |
| **Retirada de Pontos** | `retirada_de_pontos.png` | Nós e Síntese Cirúrgica | **Não fornecido** |

---

## 3. Observações de Inspeção Visual e Resolução de Ambiguidades

- **Tesouras Mayo e Metzenbaum**: O usuário disponibilizou imagens individuais para cada uma das tesouras (`Tesoura mayo.jpg` e `Tesoura metzembaum.png`). Portanto, não há necessidade de usar imagem comparativa compartilhada nos dois cards. Cada card receberá sua respectiva imagem correta.
- **Porta-Agulhas Hegar e Mathieu**: Foram fornecidas imagens individuais e perfeitamente distintas para cada um. O `mathieu.jpg` apresenta hastes livres sem argolas para dedos, e o `Hegar.jpg` apresenta as tradicionais argolas de dedo com cremalheira. A Backhaus e o Hegar não serão mais usados incorretamente como Mathieu.
- **Pinça Mixter**: A imagem `mixter.jpg` mostra claramente um instrumental de preensão longa com ponta curvada em ângulo reto (90°), correspondendo perfeitamente ao instrumental real. Ela substituirá a imagem de clamps intestinais e sairá do status de fallback.
- **Pinça Foerster**: A imagem `FOERSTER.jpg` retrata perfeitamente a pinça de antissepsia de anel oval fenestrado, saindo do status de fallback.
- **Bisturi & Pinça Rochester**: As duas imagens constam na pasta `Imagens guia/`. Embora os mapeamentos delas já estivessem apontando para arquivos válidos em `assets/teoria/`, substituiremos seus caminhos pelas cópias da pasta `Imagens guia/` para unificar a origem das imagens da teoria na nova pasta `assets/teoria/imagens_guia/`, garantindo máxima fidelidade.
