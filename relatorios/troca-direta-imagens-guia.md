# Relatório - Troca Direta de Imagens da Pasta "Imagens guia"

Este relatório documenta a substituição direta e obrigatória das imagens da aba **Teoria Cirúrgica** usando como referência de origem os arquivos da pasta `Imagens guia/`.

**Data de Conclusão**: 13 de junho de 2026

---

## 1. Backup de Segurança
Antes de efetuar qualquer alteração no site, foi realizada uma cópia completa de segurança dos dados da teoria e estilos em:
- `backups/troca-direta-imagens-guia-20260613-1152/`

---

## 2. Arquivos de Origem Localizados ("Imagens guia")

Abaixo estão os 9 arquivos de imagem encontrados fisicamente na pasta `Imagens guia/`:
1. `Bisturi.png` (874 x 1693, 2,21 MB)
2. `FOERSTER.jpg` (1000 x 1000, 78,24 KB)
3. `Hegar.jpg` (225 x 225, 2,96 KB)
4. `mathieu.jpg` (225 x 225, 2,56 KB)
5. `mixter.jpg` (3456 x 2304, 271,39 KB)
6. `Rochester.jpg` (900 x 674, 54,64 KB)
7. `Tesoura mayo.jpg` (4000 x 3000, 3,97 MB)
8. `Tesoura metzembaum.png` (225 x 225, 2,82 KB)
9. `Tricotomia.jpg` (225 x 225, 5,65 KB)

---

## 3. Arquivos Copiados para Assets

As imagens originais da pasta `Imagens guia` foram copiadas para `assets/teoria/imagens_guia/` com nomes padronizados em minúsculas e sem acentos ou caracteres especiais, mantendo suas extensões originais:

| Nome Original (Origem) | Caminho Final no Projeto (Destino) | Extensão |
| :--- | :--- | :---: |
| `Bisturi.png` | `assets/teoria/imagens_guia/bisturi.png` | `.png` |
| `FOERSTER.jpg` | `assets/teoria/imagens_guia/pinca_foerster.jpg` | `.jpg` |
| `Hegar.jpg` | `assets/teoria/imagens_guia/porta_agulhas_hegar.jpg` | `.jpg` |
| `mathieu.jpg` | `assets/teoria/imagens_guia/porta_agulhas_mathieu.jpg` | `.jpg` |
| `mixter.jpg` | `assets/teoria/imagens_guia/pinca_mixter.jpg` | `.jpg` |
| `Rochester.jpg` | `assets/teoria/imagens_guia/pinca_rochester.jpg` | `.jpg` |
| `Tesoura mayo.jpg` | `assets/teoria/imagens_guia/tesoura_mayo.jpg` | `.jpg` |
| `Tesoura metzembaum.png` | `assets/teoria/imagens_guia/tesoura_metzenbaum.png` | `.png` |
| `Tricotomia.jpg` | `assets/teoria/imagens_guia/tricotomia_cirurgica.jpg` | `.jpg` |

---

## 4. Mapeamento de Tópicos e Substituições nos JSONs

Modificamos os arquivos [teoria/instrumental_cirurgico.json](file:///C:/GITHUB/GITS/Guia%20cir%C3%BArgico%20de%20bolso%20LACIR/teoria/instrumental_cirurgico.json) e [teoria/preparo_do_paciente.json](file:///C:/GITHUB/GITS/Guia%20cir%C3%BArgico%20de%20bolso%20LACIR/teoria/preparo_do_paciente.json) para alocar os novos caminhos relativos de imagens. 

| Tópico / Card | JSON Alterado | Imagem Anterior | Imagem Atual (Substituta) |
| :--- | :--- | :--- | :--- |
| **Bisturi** | `instrumental_cirurgico.json` | `assets/teoria/bisturi.png` | `assets/teoria/imagens_guia/bisturi.png` |
| **Pinça Foerster** | `instrumental_cirurgico.json` | `""` *(Fallback)* | `assets/teoria/imagens_guia/pinca_foerster.jpg` |
| **Porta-Agulhas Hegar** | `instrumental_cirurgico.json` | `assets/teoria/porta_agulha_hegar.png` | `assets/teoria/imagens_guia/porta_agulhas_hegar.jpg` |
| **Porta-Agulhas Mathieu**| `instrumental_cirurgico.json` | `""` *(Fallback)* | `assets/teoria/imagens_guia/porta_agulhas_mathieu.jpg` |
| **Pinça Mixter** | `instrumental_cirurgico.json` | `""` *(Fallback)* | `assets/teoria/imagens_guia/pinca_mixter.jpg` |
| **Pinça Rochester** | `instrumental_cirurgico.json` | `assets/teoria/modulo_curso_2025/img_p16_8.png` | `assets/teoria/imagens_guia/pinca_rochester.jpg` |
| **Tesoura Mayo** | `instrumental_cirurgico.json` | `assets/teoria/modulo_curso_2025/img_p14_2.png` | `assets/teoria/imagens_guia/tesoura_mayo.jpg` |
| **Tesoura Metzenbaum**| `instrumental_cirurgico.json` | `assets/teoria/modulo_curso_2025/img_p14_2.png` | `assets/teoria/imagens_guia/tesoura_metzenbaum.png` |
| **Banho e Tricotomia** | `preparo_do_paciente.json` | `""` *(Fallback)* | `assets/teoria/imagens_guia/tricotomia_cirurgica.jpg` |

---

## 5. Itens que Permanecem em Fallback
Como não foram disponibilizadas imagens correspondentes na pasta `Imagens guia`, as seguintes seções continuam com fallback "Imagem em revisão" para evitar o uso de imagens de IA ou externas:
- **Fatores de Contaminação** (Preparo do Paciente)
- **Retirada de Pontos** (Nós e Síntese)

---

## 6. Garantia de Conformidade e Regras de Escopo
- **Modificações em Procedimentos**: A pasta `/procedimentos` não sofreu qualquer alteração.
- **Roteiros Práticos**: A aba de Roteiros Práticos, Modo Estudo, Modo Sequência, Favoritos e Modo Foco estão funcionando e permanecem intactos.
- **Imagens por Inteligência Artificial / Internet**: Nenhuma imagem foi gerada artificialmente ou baixada de terceiros.
- **Git**: Nenhum commit ou push foi executado.
- **Originais Preservados**: A pasta `Imagens guia/` original e seus arquivos binários não sofreram alterações ou exclusões.

---

## 7. Resultados dos Testes Visuais e HTTP
1. **Validador de Imagens (`validar_imagens_teoria.js`)**: Reportou **0 erros de links quebrados (404)** no disco e 0 arquivos suspeitos.
2. **Carregamento via HTTP local**: O teste `scratch/test_http_resources.js` simulou a navegação do usuário através de um servidor local na porta 8123 e validou com sucesso que todos os 13 recursos (incluindo as 9 novas imagens e os JSONs de produção modificados) retornam **200 OK**.
3. **Controle de Cache**: Para evitar cache no navegador do usuário (localStorage ou caches de cache-busting agressivos de navegador), os dados são lidos sob demanda de `teoria/instrumental_cirurgico.json` e `teoria/preparo_do_paciente.json` cada vez que a aba Teoria é selecionada no site. Se necessário no ambiente de produção, limpar o cache do navegador/GitHub Pages garante o carregamento imediato das novas imagens configuradas.
