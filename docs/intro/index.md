# 入门指南

## 概述

欢迎来到大漠插件 API 文档！本教程将帮助您快速了解并使用大漠插件的各项功能。

## 大漠插件简介

大漠插件是一个功能强大的 Windows 自动化控制工具库，提供：

- **窗口管理**：窗口枚举、查找、控制
- **图像识别**：截图、颜色查询、图片查找
- **文字识别**：OCR 识别、字符串查找
- **内存操作**：进程内存读写、搜索
- **键鼠模拟**：鼠标键盘事件模拟
- **AI 功能**：YOLO 目标检测

## 快速开始

1. 创建插件对象
2. 验证版本
3. 设置路径
4. 注册授权
5. 绑定窗口
6. 开始使用

## 示例代码

```vbscript
' 创建插件对象
Set dm = CreateObject("dm.dmsoft")

' 验证版本
If Len(dm.Ver()) = 0 Then
    MsgBox "插件加载失败"
    WScript.Quit 1
End If

' 设置路径
dm.SetPath "C:\Game\"

' 注册
dm.Reg "机器码", "注册码"

' 查找窗口
hwnd = dm.FindWindow(0, 0, 1920, 1080, "游戏窗口", "", 0, 0, 0)

' 绑定窗口
dm.BindWindow hwnd, "dx", "dx", "dx", 0

' 截图
dm.CapturePng 0, 0, 1920, 1080, "screenshot.png", 0

' 清理
dm.UnBindWindow
Set dm = Nothing
```

## 支持的编程语言

- VBS (VBScript)
- VB6
- Delphi
- C++
- C#
- Python (通过 COM)

## 系统要求

- Windows XP 及以上
- 32 位或 64 位系统
- 管理员权限（部分功能需要）

## 下一步

继续阅读后续章节了解更详细的使用方法。
