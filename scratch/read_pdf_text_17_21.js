const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const pdfjsPath = 'C:\\Users\\joaov\\AppData\\Local\\npm-cache\\_npx\\a1dd449879249470\\node_modules\\pdfjs-dist\\build\\pdf.mjs';
const pdfjsUrl = pathToFileURL(pdfjsPath).href;

import(pdfjsUrl).then(async (pdfjs) => {
  const pdfPath = 'C:\\GITHUB\\GITS\\Guia cirúrgico de bolso LACIR\\módulo curso 2025.pdf';
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  console.log(`PDF Loaded. Total pages: ${pdf.numPages}`);
  
  for (let pageNum = 17; pageNum <= 21; pageNum++) {
    console.log(`\n--- PAGE ${pageNum} ---`);
    try {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const strings = textContent.items.map(item => item.str);
      console.log(strings.join(' '));
    } catch (e) {
      console.error(`Error on page ${pageNum}:`, e);
    }
  }
}).catch(err => {
  console.error('Failed to import pdfjs:', err);
});
