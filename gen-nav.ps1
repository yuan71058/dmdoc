# 扫描 docs 目录，生成 URL 编码的完整导航树，注入 index.html
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$docsDir = Join-Path $root 'docs'

Add-Type -AssemblyName System.Web

$moduleIcons = @{
  'Ai' = 'AI'; 'Foobar' = '绘图板'; '内存' = '内存操作'; '后台设置' = '后台设置';
  '图色' = '图像颜色'; '基本设置' = '基本设置'; '文件' = '文件系统'; '文字识别' = '文字识别';
  '杂项' = '杂项/常见问题'; '汇编' = '汇编功能'; '窗口' = '窗口管理'; '答题' = '验证码';
  '算法' = '算法工具'; '系统' = '系统信息'; '键鼠' = '键鼠模拟'
}

$order = @('杂项','基本设置','后台设置','窗口','图色','文字识别','内存','键鼠','系统','文件','Ai','Foobar','汇编','答题','算法')

$sb = [System.Text.StringBuilder]::new()

function Encode-Path([string]$p) {
  $parts = $p -split '/'
  $enc = $parts | ForEach-Object { [System.Web.HttpUtility]::UrlEncode($_).Replace('+','%20') }
  return ($enc -join '/')
}

foreach ($mod in $order) {
  $modPath = Join-Path $docsDir $mod
  if (-not (Test-Path $modPath)) { continue }
  $title = $moduleIcons[$mod]
  if (-not $title) { $title = $mod }

  [void]$sb.AppendLine('                    <li class="nav-item">')
  [void]$sb.AppendLine('                        <a href="#" class="nav-link" data-section="' + $mod + '">')
  [void]$sb.AppendLine('                            <span class="nav-text">' + $title + '</span>')
  [void]$sb.AppendLine('                        </a>')
  [void]$sb.AppendLine('                        <ul class="nav-children">')

  $files = Get-ChildItem $modPath -File -Filter '*.htm' | Sort-Object Name
  foreach ($f in $files) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $rel = 'docs/' + $mod + '/' + $f.Name
    $encoded = Encode-Path $rel
    [void]$sb.AppendLine('                            <li><a href="' + $encoded + '" target="content" class="nav-link">' + $name + '</a></li>')
  }

  [void]$sb.AppendLine('                        </ul>')
  [void]$sb.AppendLine('                    </li>')
}

$navHtml = $sb.ToString()

$indexPath = Join-Path $root 'index.html'
$content = Get-Content $indexPath -Raw -Encoding UTF8

$pattern = '(?s)(<ul class="nav-list">).*?(</ul>\s*</nav>)'
$replacement = '$1' + "`r`n" + $navHtml + '                </ul>' + "`r`n" + '            </nav>'
$newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, $replacement)

Set-Content $indexPath -Value $newContent -Encoding UTF8 -NoNewline
Write-Host 'Navigation tree regenerated.'
