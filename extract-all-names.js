const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const functionDescriptions = {};

// 加载现有的映射
try {
  const existingPath = path.join(__dirname, 'function-descriptions.json');
  if (fs.existsSync(existingPath)) {
    const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    Object.assign(functionDescriptions, existing);
  }
} catch (e) {
  console.log('Warning: Could not load existing mappings');
}

// 从 HTML 文件提取函数简介
function extractDescription(content) {
  // 查找 "函数简介" 后面的段落
  const match = content.match(/函数简介[\s\S]*?<\/span>\s*<\/p>\s*<p[^>]*><span[^>]*>([^<]+)<\/span>/);
  
  if (match && match[1]) {
    let desc = match[1]
      .replace(/\s+/g, ' ')
      .trim();
    
    // 如果描述有效（不太短，不包含特殊标记）
    if (desc.length >= 3 && !desc.includes('.') && !desc.endsWith(',')) {
      return desc.substring(0, 40);
    }
  }
  
  return null;
}

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
      
      // 如果还没有映射，尝试从文件提取
      if (!functionDescriptions[fileName]) {
        const desc = extractDescription(content);
        if (desc) {
          functionDescriptions[fileName] = desc;
        }
      }
    }
  }
}

console.log('正在扫描所有文档，提取中文描述...\n');
walk(docsDir);

console.log(`总共处理了 ${Object.keys(functionDescriptions).length} 个函数\n`);

// 统计
let withDesc = 0;
let withoutDesc = 0;
const allFiles = [];

function countFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.endsWith('.files')) {
      countFiles(fullPath);
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      const fileName = entry.name.replace(/\.htm$/i, '');
      allFiles.push(fileName);
      if (functionDescriptions[fileName]) {
        withDesc++;
      } else {
        withoutDesc++;
      }
    }
  }
}

countFiles(docsDir);

console.log(`有中文描述的函数：${withDesc}`);
console.log(`没有中文描述的函数：${withoutDesc}`);

if (withoutDesc > 0) {
  console.log('\n未匹配的函数列表:');
  const unmatched = allFiles.filter(f => !functionDescriptions[f]);
  console.log(unmatched.join(', '));
}

// 保存映射到 JSON 文件
const outputPath = path.join(__dirname, 'function-descriptions.json');
fs.writeFileSync(outputPath, JSON.stringify(functionDescriptions, null, 2));
console.log(`\n已保存到 ${outputPath}`);
