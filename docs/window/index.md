# 窗口管理

## 概述

窗口管理模块提供了 Windows 窗口的枚举、查找、控制和信息查询功能。

## 主要功能

- **窗口枚举**：列出所有窗口或指定条件的窗口
- **窗口查找**：根据标题、类名等查找窗口
- **窗口控制**：移动、调整大小、改变状态
- **窗口信息**：获取窗口标题、位置、状态等

## API 列表

| API 名称 | 说明 |
|---------|------|
| EnumWindow | 枚举窗口 |
| EnumWindowSuper | 超级枚举窗口 |
| FindWindow | 查找窗口 |
| FindWindowEx | 查找子窗口 |
| FindWindowSuper | 超级查找窗口 |
| GetWindowTitle | 获取窗口标题 |
| GetWindowRect | 获取窗口矩形 |
| GetWindowState | 获取窗口状态 |
| MoveWindow | 移动窗口 |
| SetWindowSize | 设置窗口大小 |
| SetWindowState | 设置窗口状态 |
| GetWindowProcessId | 获取窗口进程 ID |
| GetWindowProcessPath | 获取窗口进程路径 |

## 使用示例

```vbscript
' 查找窗口
hwnd = dm.FindWindow(0, 0, 1920, 1080, "游戏窗口", "", 0, 0, 0)

' 获取窗口标题
title = dm.GetWindowTitle(hwnd)

' 获取窗口位置
rect = dm.GetWindowRect(hwnd)

' 移动窗口
dm.MoveWindow(hwnd, 100, 100, 800, 600, 1)

' 设置窗口大小
dm.SetWindowSize(hwnd, 1024, 768, 1)

' 获取进程信息
pid = dm.GetWindowProcessId(hwnd)
path = dm.GetWindowProcessPath(hwnd)
```

## 注意事项

1. 查找窗口时需要指定搜索区域
2. 窗口句柄在使用后不需要手动释放
3. 后台模式下部分窗口操作受限
4. 注意窗口状态的变化

## 下一章

[窗口枚举](/window/enum-window)
