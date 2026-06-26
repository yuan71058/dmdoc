const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

// 存储函数名和中文描述的映射
const functionDescriptions = {};

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
      const fileName = entry.name.replace(/\.htm$/i, '');
      
      // 查找 "函数简介" 后面的 <p> 标签内容
      const descMatch = content.match(/函数简介[\s\S]*?<\/span>\s*<\/p>\s*<p[^>]*><span[^>]*>([^<]+)/);
      let chineseDesc = '';
      
      if (descMatch && descMatch[1]) {
        chineseDesc = descMatch[1]
          .replace(/\s+/g, ' ')  // 压缩空格
          .trim()
          .substring(0, 35);  // 限制长度
      }
      
      if (chineseDesc) {
        functionDescriptions[fileName] = chineseDesc;
      }
    }
  }
}

console.log('正在扫描所有文档，提取中文描述...\n');
walk(docsDir);

console.log(`找到 ${Object.keys(functionDescriptions).length} 个函数的中文描述\n`);

// 显示前 20 个示例
let count = 0;
for (const [name, desc] of Object.entries(functionDescriptions)) {
  console.log(`${name}: ${desc}`);
  count++;
  if (count >= 20) break;
}

// 保存映射到 JSON 文件
const outputPath = path.join(__dirname, 'function-descriptions.json');
fs.writeFileSync(outputPath, JSON.stringify(functionDescriptions, null, 2));
console.log(`\n已保存到 ${outputPath}`);
