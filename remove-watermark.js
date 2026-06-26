// remove-watermark.js — 批量移除 ChmDecompiler 试用版水印
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
let cleaned = 0;

function stripWatermark(text) {
  // 水印固定形态：正文 </html> 之后追加 <br> + <table>...zipghost/etextwizard...</table>
  // 用字符串定位，找到水印 table 的起点 <br> 后紧跟的 <table，从该 <br> 处截断到结尾
  const markers = ['zipghost', 'ChmDecompiler'];
  let cut = -1;
  for (const m of markers) {
    const mi = text.indexOf(m);
    if (mi === -1) continue;
    // 从水印关键词往前找最近的 <table，再往前找紧邻的 <br>
    const tableStart = text.lastIndexOf('<table', mi);
    if (tableStart === -1) continue;
    let start = tableStart;
    const brMatch = text.slice(0, tableStart).match(/<br>\s*$/i);
    if (brMatch) start = tableStart - brMatch[0].length;
    if (cut === -1 || start < cut) cut = start;
  }
  if (cut !== -1) return text.slice(0, cut).replace(/\s+$/,'') + '\r\n';
  return text;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      let text = fs.readFileSync(full, 'utf8');
      if (text.indexOf('ChmDecompiler') === -1 && text.indexOf('zipghost') === -1) continue;
      const cleanedText = stripWatermark(text);
      if (cleanedText !== text) {
        fs.writeFileSync(full, cleanedText, 'utf8');
        cleaned++;
      }
    }
  }
}

walk(docsDir);
console.log('water mark cleaned files: ' + cleaned);
