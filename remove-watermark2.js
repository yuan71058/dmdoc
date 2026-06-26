const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let removedCount = 0;

// ChmDecompiler 水印的正则表达式模式
const watermarkPattern = /<br><table[^>]*>[\s\S]*?The CHM file was converted to HTM by Trial version of ChmDecompiler[\s\S]*?<\/table>/gi;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过 .files 目录
      if (!entry.name.endsWith('.files')) {
        walk(fullPath);
      }
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 查找并删除水印
      const beforeCount = (content.match(watermarkPattern) || []).length;
      content = content.replace(watermarkPattern, '');
      const afterCount = (content.match(watermarkPattern) || []).length;
      
      if (beforeCount > 0) {
        fs.writeFileSync(fullPath, content, 'utf8');
        removedCount += beforeCount;
        console.log(`已删除水印：${path.relative(__dirname, fullPath)}`);
      }
    }
  }
}

console.log('开始删除 ChmDecompiler 水印...\n');
walk(docsDir);

console.log(`\n完成！共删除 ${removedCount} 个水印`);
