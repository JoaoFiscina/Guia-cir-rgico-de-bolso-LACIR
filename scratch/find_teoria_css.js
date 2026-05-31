const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('teoria') || line.toLowerCase().includes('lightbox')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
