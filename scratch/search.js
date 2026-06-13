const fs = require('fs');
const path = require('path');

const filesToSearch = [
  'teoria.js',
  'script.js',
  'index.html',
  'teoria/centro_cirurgico_paramentacao.json',
  'teoria/teoria-imagens-map.json'
];

const projectRoot = path.resolve(__dirname, '..');

filesToSearch.forEach(file => {
  const fullPath = path.join(projectRoot, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Arquivo não existe: ${file}`);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Buscar por "ambiente_vs_sala"
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('ambiente_vs_sala') || line.includes('Ambiente Cirúrgico') || line.includes('Sala Cirúrgica')) {
      console.log(`Encontrado em ${file}:${idx + 1} -> ${line.trim()}`);
    }
  });
});
