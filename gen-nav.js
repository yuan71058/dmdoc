const fs = require('fs');
const path = require('path');

const root = __dirname;
const docsDir = path.join(root, 'docs');

const moduleTitles = {
  'Ai': 'Ai', 'Foobar': 'Foobar', '内存': '内存', '后台设置': '后台设置',
  '图色': '图色', '基本设置': '基本设置', '常见问题': '常见问题', '文件': '文件',
  '文字识别': '文字识别', '杂项': '杂项', '汇编': '汇编', '窗口': '窗口',
  '答题': '答题', '算法': '算法', '系统': '系统', '键鼠': '键鼠', '防护盾': '防护盾'
};

const order = ['Ai', 'Foobar', '内存', '后台设置', '图色', '基本设置', '常见问题', '文件', '文字识别', '杂项', '汇编', '窗口', '答题', '算法', '系统', '键鼠', '防护盾'];

function encodePath(p) {
  return p.split('/').map(encodeURIComponent).join('/');
}

let nav = '';
for (const mod of order) {
  const modPath = path.join(docsDir, mod);
  if (!fs.existsSync(modPath)) continue;
  const title = moduleTitles[mod] || mod;
  nav += '                    <li class="nav-item">\n';
  nav += '                        <a href="#" class="nav-link" data-section="' + mod + '">\n';
  nav += '                            <span class="nav-text">' + title + '</span>\n';
  nav += '                        </a>\n';
  nav += '                        <ul class="nav-children">\n';
  const files = fs.readdirSync(modPath).filter(f => f.toLowerCase().endsWith('.htm')).sort();
  for (const f of files) {
    const name = f.replace(/\.htm$/i, '');
    const rel = 'docs/' + mod + '/' + f;
    const encoded = encodePath(rel);
    nav += '                            <li><a href="' + encoded + '" target="content" class="nav-link">' + name + '</a></li>\n';
  }
  nav += '                        </ul>\n';
  nav += '                    </li>\n';
}

const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const pattern = /(<ul class="nav-list">)[\s\S]*?(<\/ul>\s*<\/nav>)/;
const replacement = '$1\n' + nav + '                </ul>\n            </nav>';
html = html.replace(pattern, replacement);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Navigation regenerated successfully.');
