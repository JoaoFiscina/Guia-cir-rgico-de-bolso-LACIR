const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'Imagens guia');
const files = fs.readdirSync(imgDir);

function getPngDimensions(buffer) {
  // O chunk IHDR começa no byte 12. O tamanho é 4 bytes, depois IHDR (4 bytes), depois Width (4 bytes), Height (4 bytes).
  // Portanto, Width está a partir do byte 16 e Height a partir de 20.
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function getJpgDimensions(buffer) {
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i+1] !== 0xD8) return null; // Não é JPEG válido
  i += 2;
  
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) return null; // Corrompido
    
    // Pula bytes de preenchimento 0xFF
    while (buffer[i] === 0xFF) i++;
    
    const marker = buffer[i];
    i++;
    
    if (marker === 0xD9 || marker === 0xDA) break; // Fim do stream
    
    const length = buffer.readUInt16BE(i);
    
    // SOF markers: 0xC0 (baseline), 0xC1 (extended), 0xC2 (progressive) etc.
    if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
      const height = buffer.readUInt16BE(i + 3);
      const width = buffer.readUInt16BE(i + 5);
      return { width, height };
    }
    
    i += length;
  }
  return null;
}

const report = [];

files.forEach(file => {
  const filePath = path.join(imgDir, file);
  const stat = fs.statSync(filePath);
  const ext = path.extname(file).toLowerCase();
  
  let dimensions = { width: 'N/A', height: 'N/A' };
  try {
    const fd = fs.openSync(filePath, 'r');
    // Lê os primeiros 64KB para ter certeza de achar o marcador SOF no JPEG
    const buffer = Buffer.alloc(65536);
    fs.readSync(fd, buffer, 0, buffer.length, 0);
    fs.closeSync(fd);
    
    if (ext === '.png') {
      dimensions = getPngDimensions(buffer) || dimensions;
    } else if (ext === '.jpg' || ext === '.jpeg') {
      dimensions = getJpgDimensions(buffer) || dimensions;
    }
  } catch (err) {
    console.error(`Erro ao ler dimensões de ${file}:`, err.message);
  }
  
  report.push({
    name: file,
    ext: ext,
    sizeBytes: stat.size,
    sizeKB: (stat.size / 1024).toFixed(2) + ' KB',
    width: dimensions.width,
    height: dimensions.height
  });
});

console.log(JSON.stringify(report, null, 2));
