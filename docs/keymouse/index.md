# 键鼠模拟

## 概述

键鼠模拟模块提供鼠标和键盘的事件模拟功能，支持前台和后台操作。

## 主要功能

- **鼠标操作**：移动、点击、双击、滚轮
- **键盘操作**：按键按下、释放、击键
- **光标控制**：获取光标位置、形状
- **延迟设置**：设置操作延迟

## API 列表

### 鼠标操作

| API 名称 | 说明 |
|---------|------|
| MoveTo | 移动鼠标 |
| MoveR | 相对移动 |
| LeftClick | 左键单击 |
| LeftDoubleClick | 左键双击 |
| LeftDown | 左键按下 |
| LeftUp | 左键释放 |
| RightClick | 右键单击 |
| MiddleClick | 中键单击 |
| WheelUp | 滚轮向上 |
| WheelDown | 滚轮向下 |
| GetCursorPos | 获取光标位置 |

### 键盘操作

| API 名称 | 说明 |
|---------|------|
| KeyDown | 按键按下 |
| KeyUp | 按键释放 |
| KeyPress | 按键击键 |
| KeyPressStr | 字符串击键 |
| WaitKey | 等待按键 |

### 延迟设置

| API 名称 | 说明 |
|---------|------|
| SetMouseDelay | 设置鼠标延迟 |
| SetKeypadDelay | 设置键盘延迟 |

## 使用示例

```vbscript
' 移动鼠标
dm.MoveTo 100, 100

' 左键单击
dm.LeftClick()

' 左键双击
dm.LeftDoubleClick()

' 相对移动
dm.MoveR 10, 10

' 获取光标位置
x = 0
y = 0
dm.GetCursorPos x, y

' 按下按键
dm.KeyDown 65    ' A 键
dm.KeyUp 65       ' 释放 A 键

' 击键
dm.KeyPress 13    ' 回车键

' 输入字符串
dm.KeyPressStr "Hello World", 1

' 设置延迟
dm.SetMouseDelay "All" 100
dm.SetKeypadDelay "All" 100
```

## 注意事项

1. 后台模式下需要使用绑定窗口的模式
2. 注意操作延迟的设置
3. 避免过快操作导致程序响应不过来
4. 游戏应用中可能需要特殊处理

## 下一章

[鼠标操作](/keymouse/mouse-operation)
