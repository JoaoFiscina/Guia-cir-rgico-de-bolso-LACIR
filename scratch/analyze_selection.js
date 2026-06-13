const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync('script.js', 'utf8');
const teoriaContent = fs.readFileSync('teoria.js', 'utf8');

console.log('=== Busca por eventos de seleção em script.js ===');
const selectLines = scriptContent.split('\n');
selectLines.forEach((line, idx) => {
  if (line.includes('quickProcedureSelect') && line.includes('change')) {
    console.log(`script.js:${idx + 1} -> ${line.trim()}`);
  }
  if (line.includes('randomProcedureButton') && line.includes('click')) {
    console.log(`script.js:${idx + 1} -> ${line.trim()}`);
  }
});

console.log('\n=== Busca por eventos de módulos em teoria.js ===');
const teoriaLines = teoriaContent.split('\n');
teoriaLines.forEach((line, idx) => {
  if (line.includes('module-card') || line.includes('teoria-module-card') || line.includes('activeModuleId')) {
    if (line.includes('click') || line.includes('addEventListener') || line.includes('activeModuleId =')) {
      console.log(`teoria.js:${idx + 1} -> ${line.trim()}`);
    }
  }
});
