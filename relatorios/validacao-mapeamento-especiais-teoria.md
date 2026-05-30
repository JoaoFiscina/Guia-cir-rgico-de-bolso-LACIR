# Validacao do mapeamento de imagens - Instrumental Especial

Data: 2026-05-29

## Arquivos alterados

- `teoria/instrumental_cirurgico.json`
- `teoria/teoria-imagens-map.json`
- `relatorios/validacao-imagens-teoria-pos-correcao.md` (regenerado pelo script existente)

Backup criado antes das alteracoes:

- `backups/correcao-mapeamento-especiais-20260529-2105/`

## Imagens adicionadas

| Item | Imagem adicionada |
|---|---|
| Pinca Desjardins | `assets/teoria/modulo_curso_2025/img_p20_1.png` |
| Pinca Allis | `assets/teoria/modulo_curso_2025/img_p20_2.png` |
| Pinca Guyon | `assets/teoria/modulo_curso_2025/img_p20_3.png` |
| Pinca Cheron | `assets/teoria/modulo_curso_2025/img_p20_4.png` |
| Pinca Foerster | `assets/teoria/modulo_curso_2025/img_p21_1.png` |

## Imagens substituidas

| Item | Antes | Depois |
|---|---|---|
| Clamps Intestinais | `assets/teoria/modulo_curso_2025/img_p21_1.png` | `assets/teoria/modulo_curso_2025/img_p21_2.png` |
| Pinca Collin | `assets/teoria/modulo_curso_2025/img_p21_4.png` | `assets/teoria/modulo_curso_2025/img_p21_3.png` |
| Pinca Duval | `assets/teoria/modulo_curso_2025/img_p21_3.png` | `assets/teoria/modulo_curso_2025/img_p21_4.png` |
| Pinca Backhaus | `assets/teoria/modulo_curso_2025/img_p22_3.png` | `assets/teoria/modulo_curso_2025/img_p22_1.png` |
| Porta-Agulhas Mathieu | `assets/teoria/modulo_curso_2025/img_p22_2.png` | `assets/teoria/modulo_curso_2025/img_p22_4.png` |

## Imagens removidas por estarem erradas

| Item | Imagem removida | Resultado |
|---|---|---|
| Pinca Mixter | `assets/teoria/modulo_curso_2025/img_p21_2.png` | Mantido fallback "Imagem em revisao" por falta de imagem correta confiavel no acervo indicado. |

## Itens que ficaram com fallback

- Pinca Mixter (Angulo Reto)
- Ambiente Cirurgico vs Sala Cirurgica
- Fatores de Contaminacao
- Banho e Tricotomia Pre-Operatoria
- Retirada de Pontos

## Pendencias de revisao manual

- Pinca Mixter: requer imagem correta dedicada ou nova extracao pontual se houver fonte melhor.
- `teoria-imagens-map.json` continua passivo: `teoria.js` nao carrega esse arquivo. As entradas relacionadas foram alinhadas para reduzir risco de uso futuro incorreto.

## Validacoes executadas

- JSON validado para todos os arquivos de teoria.
- Todos os caminhos adicionados existem fisicamente no projeto.
- Nenhum caminho de imagem novo comeca com `C:`.
- Nenhum caminho de imagem novo comeca com `/`.
- Validacao automatica `scripts/validar_imagens_teoria.js`: 0 caminhos quebrados, 0 imagens suspeitas, 5 itens sem imagem.
- Teste local no navegador em `http://127.0.0.1:8123/`, aba Teoria Cirurgica > Instrumental Cirurgico: todos os 11 cards foram encontrados.
- Teste visual/local: Desjardins, Allis, Guyon, Cheron, Foerster, Clamps, Collin, Duval, Backhaus e Mathieu carregaram imagens; Mixter exibiu fallback.

## Confirmacoes de escopo

- A pasta `/procedimentos` nao foi alterada.
- O parser/schema dos roteiros praticos nao foi alterado.
- `teoria.js` nao foi alterado.
- `styles.css` nao foi alterado.
- Nenhuma imagem da web foi usada.
- Nenhuma imagem por IA foi criada.
- Nao houve commit.
- Nao houve push.
