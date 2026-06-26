// convert-encoding.js — 批量将 docs/ 下的 .htm 从 GBK 转码为 UTF-8
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
// Node 内置的 TextDecoder 支持 'gbk'，无需额外依赖
const decoder = new TextDecoder('gbk');

let converted = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      const buf = fs.readFileSync(full);
      let text = decoder.decode(buf);
      text = text.replace(/charset=gb2312/gi, 'charset=utf-8')
                 .replace(/charset=gbk/gi, 'charset=utf-8');
      fs.writeFileSync(full, text, 'utf8');
      converted++;
    }
  }
}

walk(docsDir);
console.log(`转码完成：${converted} 个文件已从 GBK 转为 UTF-8。`);
