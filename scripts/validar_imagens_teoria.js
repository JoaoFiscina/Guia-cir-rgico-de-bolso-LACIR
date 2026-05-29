const fs = require('fs');
const path = require('path');

// Caminho raiz do projeto (diretório atual)
const projectRoot = path.resolve(__dirname, '..');

// Função auxiliar para resolver caminhos relativos ao projeto
function resolvePath(relPath) {
  if (!relPath) return '';
  // Se começar com barra, remove para não ir para a raiz do disco
  const cleanPath = relPath.startsWith('/') ? relPath.substring(1) : relPath;
  return path.join(projectRoot, cleanPath.replace(/\//g, path.sep));
}

function runValidation() {
  console.log('Iniciando validação de imagens da Teoria Cirúrgica...');
  
  const manifestPath = path.join(projectRoot, 'teoria', 'teoria-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('Erro: Manifesto de teoria não encontrado em: ' + manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const modules = manifest.modulos || [];

  const allImages = []; // { module: string, type: string, id: string, name: string, path: string, exists: boolean, size: number }
  const itemsWithoutImage = []; // { module: string, type: string, id: string, name: string }
  const imageToItemsMap = {}; // path -> array of { module, type, id, name }

  modules.forEach(mod => {
    const modJsonPath = path.join(projectRoot, mod.arquivo);
    if (!fs.existsSync(modJsonPath)) {
      console.warn(`Aviso: Módulo ${mod.id} em arquivo ${mod.arquivo} não existe no disco.`);
      return;
    }

    const modData = JSON.parse(fs.readFileSync(modJsonPath, 'utf8'));

    // Processar topicos_gerais
    if (modData.topicos_gerais) {
      modData.topicos_gerais.forEach(item => processItem(mod.titulo, 'Tópico Geral', item));
    }

    // Processar topicos
    if (modData.topicos) {
      modData.topicos.forEach(item => processItem(mod.titulo, 'Tópico', item));
    }

    // Processar instrumentos
    if (modData.instrumentos) {
      modData.instrumentos.forEach(item => processItem(mod.titulo, 'Instrumento', item));
    }
  });

  function processItem(moduleName, type, item) {
    const id = item.id;
    const name = item.nome || item.titulo || id;
    
    // Coleta caminhos de imagem
    const paths = [];

    if (item.imagem && typeof item.imagem === 'string' && item.imagem.trim() !== '') {
      paths.push(item.imagem.trim());
    }

    if (item.imagens && Array.isArray(item.imagens)) {
      item.imagens.forEach(img => {
        if (typeof img === 'string' && img.trim() !== '') {
          paths.push(img.trim());
        } else if (img && typeof img === 'object' && img.src && typeof img.src === 'string' && img.src.trim() !== '') {
          paths.push(img.src.trim());
        }
      });
    }

    if (paths.length === 0) {
      itemsWithoutImage.push({ module: moduleName, type, id, name });
      return;
    }

    const uniquePaths = Array.from(new Set(paths));

    uniquePaths.forEach(p => {
      const fullPath = resolvePath(p);
      let exists = false;
      let size = -1;

      if (fullPath && fs.existsSync(fullPath)) {
        exists = true;
        const stats = fs.statSync(fullPath);
        size = stats.size;
      }

      const imgInfo = {
        module: moduleName,
        type,
        id,
        name,
        path: p,
        exists,
        size
      };

      allImages.push(imgInfo);

      if (!imageToItemsMap[p]) {
        imageToItemsMap[p] = [];
      }
      imageToItemsMap[p].push({ module: moduleName, type, id, name });
    });
  }

  // Identificar imagens duplicadas
  const duplicates = [];
  for (const [p, items] of Object.entries(imageToItemsMap)) {
    if (items.length > 1) {
      duplicates.push({ path: p, items });
    }
  }

  // Identificar imagens < 2KB
  const smallImages = allImages.filter(img => img.exists && img.size < 2048);

  // Identificar imagens com caminho quebrado
  const brokenImages = allImages.filter(img => !img.exists);

  // Escrever relatório em markdown
  let report = `# Validação de Imagens da Teoria Cirúrgica - Pós-Correção

Este relatório apresenta o resultado da validação automática executada sobre os mapeamentos de imagem da aba **Teoria Cirúrgica** (Módulos de Instrumental, Centro Cirúrgico, Preparo do Paciente, Nós e Síntese).

Data de geração: ${new Date().toISOString().split('T')[0]}

---

## 1. Estatísticas Gerais
- **Total de referências de imagem validadas**: ${allImages.length}
- **Imagens ausentes / caminhos quebrados**: ${brokenImages.length}
- **Imagens suspeitas (< 2KB)**: ${smallImages.length}
- **Itens sem imagem (Placeholder / Em revisão)**: ${itemsWithoutImage.length}
- **Imagens compartilhadas / duplicadas**: ${duplicates.length}

---

## 2. Imagens com Caminho Quebrado (404 no disco)
${brokenImages.length === 0 ? '*Nenhuma imagem com caminho quebrado encontrada.*' : brokenImages.map(img => {
  return `- **[${img.module}]** ${img.type} "${img.name}" (ID: \`${img.id}\`) -> Caminho referenciado não existe: \`${img.path}\``;
}).join('\n')}

---

## 3. Imagens Suspeitas (Tamanho menor que 2KB)
*Estes arquivos existem física no disco, mas seu tamanho sugere que são imagens vazias, transparentes ou linhas horizontais decorativas do PDF original.*

${smallImages.length === 0 ? '*Nenhum arquivo suspeito < 2KB está sendo usado.*' : smallImages.map(img => {
  const sizeKB = (img.size / 1024).toFixed(2);
  return `- **[${img.module}]** ${img.type} "${img.name}" (ID: \`${img.id}\`) -> Arquivo: \`${img.path}\` (${sizeKB} KB)`;
}).join('\n')}

---

## 4. Itens sem Imagem (Mapeamento Vazio / Em revisão)
*Estes cards/tópicos estão usando fallback visual elegante ("Imagem em revisão") na interface.*

${itemsWithoutImage.length === 0 ? '*Todos os tópicos possuem imagem associada.*' : itemsWithoutImage.map(item => {
  return `- **[${item.module}]** ${item.type}: "${item.name}" (ID: \`${item.id}\`)`;
}).join('\n')}

---

## 5. Imagens Compartilhadas (Duplicadas)
*Imagens vinculadas a múltiplos cards. Útil para verificar se instrumentos diferentes estão usando a mesma representação visual (ex: Kelly e Crile).*

${duplicates.length === 0 ? '*Nenhuma imagem compartilhada entre diferentes itens.*' : duplicates.map(dup => {
  const itemsList = dup.items.map(i => `"${i.name}" (ID: \`${i.id}\` no módulo *${i.module}*)`).join(', ');
  return `- \`${dup.path}\` é compartilhada por: ${itemsList}`;
}).join('\n')}

---

*Relatório gerado automaticamente por \`scripts/validar_imagens_teoria.js\`.*
`;

  const reportDir = path.join(projectRoot, 'relatorios');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, 'validacao-imagens-teoria-pos-correcao.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`Relatório salvo com sucesso em: ${reportPath}`);
}

runValidation();
