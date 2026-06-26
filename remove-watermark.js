// remove-watermark.js — 批量移除 ChmDecompiler 试用版水印
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
let cleaned = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      let text = fs.readFileSync(full, 'utf8');
      if (text.indexOf('ChmDecompiler') === -1 && text.indexOf('zipghost') === -1) continue;
      // 水印是追加在正文之后的一段 <br> + <table>...水印...</table>
      // 匹配从最后一个 <br> 紧接 <table 含 zipghost 的整段直到结尾
      const idx = text.search(/<br>\s*<table[^>]*>[\s\S]*?zipghost[\s\S]*$/i);
      if (idx !== -1) {
        text = text.slice(0, idx);
      } else {
        // 兜底：直接删掉含水印的 table 块
        text = text.replace(/<table[^>]*>[\s\S]*?(?:zipghost|ChmDecompiler)[\s\S]*?<\/table>/gi, '');
      }
      fs.writeFileSync(full, text, 'utf8');
      cleaned++;
    }
  }
}

walk(docsDir);
console.log(`\u6c34\u5370\u6e05\u7406\u5b8c\u6210\uff1a${cleaned} \u4e2a\u6587\u4ef6\u5df2\u5904\u7406\u3002`);
