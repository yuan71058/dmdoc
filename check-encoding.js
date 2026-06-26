const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let totalFiles = 0;
let garbledFiles = [];

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
      totalFiles++;
      
      // 用 GBK 编码读取，看是否能正确解码
      try {
        const gbkContent = fs.readFileSync(fullPath, 'gbk');
        
        // 如果包含常见的乱码特征（UTF-8 错误解码 GBK 后的字符）
        if (/[閸戣姤|閹叉倹|閺囧倬|閺傚倹|閸栫点|閸庡拷|闁|闁|閿|閿|閿]/.test(gbkContent)) {
          garbledFiles.push(fullPath);
        }
      } catch (e) {
        // 如果无法用 GBK 读取，可能是已经转换好的 UTF-8 文件
      }
    }
  }
}

console.log('正在扫描所有 HTML 文件...\n');
walk(docsDir);

console.log(`\n总计扫描了 ${totalFiles} 个文件`);
console.log(`发现 ${garbledFiles.length} 个需要重新转换的文件\n`);

if (garbledFiles.length > 0) {
  console.log('乱码文件列表:');
  garbledFiles.forEach((file, i) => {
    const relativePath = path.relative(__dirname, file);
    console.log(`${i + 1}. ${relativePath}`);
  });
  
  console.log('\n建议：这些文件可能已经是 UTF-8 编码，但包含特殊字符。');
  console.log('请检查原始 GBK 文件是否损坏。');
} else {
  console.log('✓ 所有文件编码正常，未发现乱码！');
}
