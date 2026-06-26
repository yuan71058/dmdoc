const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

let modifiedCount = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!entry.name.endsWith('.files')) {
        walk(fullPath);
      }
    } else if (entry.name.toLowerCase().endsWith('.htm')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // 替换所有宋体为微软雅黑
      content = content.replace(/font-family:宋体/g, 'font-family:"Microsoft YaHei"');
      content = content.replace(/mso-bidi-font-family:宋体/g, 'mso-bidi-font-family:"Microsoft YaHei"');
      content = content.replace(/\\@宋体/g, '"Microsoft YaHei"');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        modifiedCount++;
      }
    }
  }
}

console.log('开始批量修改所有文档的字体...\n');
walk(docsDir);

console.log(`\n完成！共修改 ${modifiedCount} 个文件`);
