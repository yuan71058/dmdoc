const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let cleanedCount = 0;

// 匹配 ChmDecompiler 水印的完整模式（包括<br>和<table>标签）
const watermarkPattern = /<\/html>\s*<br>\s*<table[^>]*>[\s\S]*?<\/table>/g;

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
      
      // 检查是否包含水印
      if (content.includes('ChmDecompiler') || content.includes('zipghost')) {
        const originalLength = content.length;
        
        // 删除水印
        content = content.replace(watermarkPattern, '');
        
        const newLength = content.length;
        
        if (newLength < originalLength) {
          // 写回文件
          fs.writeFileSync(fullPath, content, 'utf8');
          cleanedCount++;
          
          const relPath = path.relative(__dirname, fullPath);
          console.log(`✓ 已清理：${relPath}`);
        }
      }
    }
  }
}

console.log('=== 开始删除 ChmDecompiler 水印 ===\n');
walk(docsDir);

console.log(`\n完成！共清理了 ${cleanedCount} 个文件`);
