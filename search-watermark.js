const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let foundFiles = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!entry.name.endsWith('.files')) {
        walk(fullPath);
      }
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 搜索各种可能的水印关键词
      if (content.includes('ChmDecompiler') || 
          content.includes('zipghost') ||
          content.includes('The CHM file was converted to HTM')) {
        
        foundFiles.push({
          path: fullPath,
          relPath: path.relative(__dirname, fullPath)
        });
      }
    }
  }
}

console.log('正在搜索 ChmDecompiler 水印...\n');
walk(docsDir);

if (foundFiles.length > 0) {
  console.log(`找到 ${foundFiles.length} 个包含水印的文件:\n`);
  foundFiles.forEach((file, i) => {
    console.log(`${i + 1}. ${file.relPath}`);
    
    // 显示包含水印的行
    const content = fs.readFileSync(file.path, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('ChmDecompiler') || line.includes('zipghost')) {
        console.log(`   第${idx + 1}行：${line.substring(0, 200)}...`);
      }
    });
  });
} else {
  console.log('✓ 未找到任何 ChmDecompiler 水印！');
  console.log('所有文件都已经清理完成。');
}
