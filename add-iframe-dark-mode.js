const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

// 要添加到每个 HTML 文件的暗色主题 CSS
const darkModeCSS = `
<style id="dark-mode-style">
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a2e !important;
    color: #eaeaea !important;
  }
}
</style>`;

let updatedCount = 0;

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
      
      // 检查是否已经包含暗色主题样式
      if (!content.includes('id="dark-mode-style"')) {
        // 在 </head> 之前插入暗色主题 CSS
        const headEndPattern = /<\/head>/i;
        content = content.replace(headEndPattern, darkModeCSS + '\n</head>');
        
        fs.writeFileSync(fullPath, content, 'utf8');
        updatedCount++;
      }
    }
  }
}

console.log('正在为所有文档添加暗色主题支持...\n');
walk(docsDir);

console.log(`已更新 ${updatedCount} 个文件`);
