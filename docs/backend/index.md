# 后台设置

## 概述

后台设置模块提供了窗口绑定和后台模式配置功能，支持真正的后台自动化操作。

## 主要功能

- **窗口绑定**：将插件绑定到指定窗口
- **绑定模式**：支持多种显示、鼠标、键盘模式
- **输入模拟**：后台鼠标键盘操作
- **性能优化**：降低 CPU 占用，提高识别速度

## API 列表

| API 名称 | 说明 |
|---------|------|
| BindWindow | 绑定窗口 |
| BindWindowEx | 绑定窗口扩展 |
| UnBindWindow | 解绑窗口 |
| EnableFakeActive | 启用虚假激活 |
| EnableKeypadMsg | 启用键盘消息 |
| EnableMouseMsg | 启用鼠标消息 |
| DownCpu | 降低 CPU 占用 |
| HackSpeed | 加速 hack |
| SetDisplayRefreshDelay | 设置刷新延迟 |

## 绑定模式详解

### Display 模式

| 模式 | 说明 |
|------|------|
| normal | 前台模式 |
| gdi | GDI 模式（兼容性好，CPU 占用高） |
| gdi2 | GDI2 模式（速度更快） |
| dx | DX 模式（DirectX） |
| dx2 | DX2 模式 |
| dx3 | DX3 模式（最新，推荐） |

### Mouse 模式

| 模式 | 说明 |
|------|------|
| normal | 前台鼠标 |
| windows | Windows 消息模式 |
| dx | DX 后台鼠标模式 |

### Keypad 模式

| 模式 | 说明 |
|------|------|
| normal | 前台按键 |
| windows | Windows 消息按键 |
| dx | DX 后台按键模式 |

### Mode 参数

| 值 | 说明 |
|----|------|
| 0 | 推荐模式（通用） |
| 2 | 同 0，增加兼容性 |
| 101 | 隐藏模式（需要 dx.public.hide.dll） |
| 11/13 | 特殊需求模式 |

## 使用示例

```vbscript
' 绑定窗口
dm.BindWindow hwnd, "dx3", "dx", "dx", 0

' 启用虚假激活
dm.EnableFakeActive 1

' 降低 CPU 占用
dm.DownCpu 1

' 设置刷新延迟
dm.SetDisplayRefreshDelay(100)

' 解绑窗口
dm.UnBindWindow
```

## 注意事项

1. 后台模式需要管理员权限
2. 部分游戏或程序可能禁止后台模式
3. 注意选择合适的绑定模式
4. 及时清理绑定的窗口

## 下一章

[窗口绑定](/backend/bind-window)
