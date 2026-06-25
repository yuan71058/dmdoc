# 快速开始

## 第一步：创建插件对象

```vbscript
Set dm = CreateObject("dm.dmsoft")
```

## 第二步：验证加载

```vbscript
If Len(dm.Ver()) = 0 Then
    MsgBox "插件未注册或加载失败"
    EndScript
End If
```

## 第三步：设置路径

```vbscript
' 设置图片等资源所在目录
dm.SetPath "C:\Game\"
```

## 第四步：注册授权

```vbscript
' 注册 VIP
dm.Reg "机器码", "注册码"
```

## 第五步：查找窗口

```vbscript
' 查找指定标题的窗口
hwnd = dm.FindWindow(0, 0, 1920, 1080, "游戏窗口", "", 0, 0, 0)
```

## 第六步：绑定窗口

```vbscript
' 绑定窗口（后台模式）
dm.BindWindow hwnd, "dx", "dx", "dx", 0
```

## 第七步：开始使用

```vbscript
' 截图
dm.CapturePng 0, 0, 1920, 1080, "screenshot.png", 0

' 查找图片
posX = 0
posY = 0
ret = dm.FindPic(0, 0, 1920, 1080, "button.bmp", "000000", 0.9, 0, posX, posY)

' 点击找到的位置
If ret >= 0 Then
    dm.MoveTo posX, posY
    dm.LeftClick()
End If
```

## 第八步：清理资源

```vbscript
' 解绑窗口
dm.UnBindWindow

' 释放对象
Set dm = Nothing
```

## 完整示例

```vbscript
Option Explicit

' 创建插件对象
Dim dm
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
Dim hwnd
hwnd = dm.FindWindow(0, 0, 1920, 1080, "游戏窗口", "", 0, 0, 0)

If hwnd <= 0 Then
    MsgBox "未找到窗口"
    WScript.Quit 1
End If

' 绑定窗口
dm.BindWindow hwnd, "dx", "dx", "dx", 0

' 截图保存
dm.CapturePng 0, 0, 1920, 1080, "screenshot.png", 0

' 查找图片
Dim posX, posY
Dim ret
posX = 0
posY = 0
ret = dm.FindPic(0, 0, 1920, 1080, "button.bmp", "000000", 0.9, 0, posX, posY)

If ret >= 0 Then
    dm.MoveTo posX, posY
    dm.LeftClick()
End If

' 文字识别
dm.SetDict "dict.txt"
Dim result
result = dm.FindStr(0, 0, 1920, 1080, "确定", "9f2e3f-000000", 1.0, posX, posY)

If result <> -1 And posX >= 0 Then
    dm.MoveTo posX, posY
    dm.LeftClick()
End If

' 清理资源
dm.UnBindWindow
Set dm = Nothing

WScript.Echo "完成"
```

## 注意事项

1. 每个线程需要独立的 dm 对象
2. 脚本退出时记得清理资源
3. 后台模式需要管理员权限
4. 图片路径相对于 SetPath 设置的路径
