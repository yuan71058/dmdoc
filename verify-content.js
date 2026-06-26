const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let totalFiles = 0;
let badFiles = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!entry.name.endsWith('.files')) {
        walk(fullPath);
      }
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      totalFiles++;
      
      // 读取文件内容
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 检查是否包含明显的乱码模式（UTF-8 错误解码 GBK 后的常见字符）
      // 这些是典型的 "閸", "閹", "閺", "闁" 等乱码前缀
      if (content.includes('閸') || content.includes('閹') || 
          content.includes('閺') || content.includes('闁') ||
          content.includes('闂') || content.includes('闃') ||
          content.includes('闊') || content.includes('閿')) {
        
        // 获取相对路径
        const relPath = path.relative(__dirname, fullPath);
        badFiles.push({
          path: fullPath,
          relPath: relPath
        });
      }
    }
  }
}

console.log('=== 全面检查所有 HTML 文件内容 ===\n');
walk(docsDir);

console.log(`已检查 ${totalFiles} 个文件`);
console.log(`发现 ${badFiles.length} 个包含乱码的文件\n`);

if (badFiles.length > 0) {
  console.log('乱码文件列表:');
  badFiles.forEach((file, i) => {
    console.log(`${i + 1}. ${file.relPath}`);
  });
  
  console.log('\n=== 详细检查第一个乱码文件 ===');
  if (badFiles.length > 0) {
    const firstFile = badFiles[0];
    const content = fs.readFileSync(firstFile.path, 'utf8');
    const lines = content.split('\n');
    
    console.log(`文件：${firstFile.relPath}`);
    console.log('\n前 50 行内容:');
    for (let i = 0; i < Math.min(50, lines.length); i++) {
      if (lines[i].includes('閸') || lines[i].includes('閹') || 
          lines[i].includes('閺') || lines[i].includes('闁')) {
        console.log(`第 ${i + 1} 行: ${lines[i].substring(0, 200)}`);
      }
    }
  }
  
  console.log('\n建议操作:');
  console.log('1. 删除 docs 目录');
  console.log('2. 从原始 GBK 文件重新复制并转换编码');
  console.log('3. 运行 convert-encoding.js 进行转换');
} else {
  console.log('✓ 所有文件编码正确，未发现乱码！');
}
