# 代码示例集

## 完整示例：窗口查找和图片识别

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
dm.BindWindow hwnd, "dx3", "dx", "dx", 0

' 截图
dm.CapturePng 0, 0, 1920, 1080, "screenshot.png", 0

' 查找图片
Dim posX, posY
posX = 0
posY = 0
Dim ret
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

## 内存操作示例

```vbscript
' 打开进程
hProc = dm.OpenProcess(1234, 1)

' 读取整数
value = dm.ReadInt(hProc, "0x12345678")

' 读取带偏移
value = dm.ReadInt(hProc, "<game.exe>+0x100")

' 写入整数
dm.WriteInt hProc, "0x12345678", 100

' 搜索整数
ret = dm.FindInt(hProc, "0x00000000", "0xFFFFFFFF", "100", 1, count)
```

## 后台模式示例

```vbscript
' 绑定窗口
dm.BindWindow hwnd, "gdi", "normal", "normal", 0

' 降低 CPU 占用
dm.DownCpu 1

' 设置刷新延迟
dm.SetDisplayRefreshDelay(100)

' 截图
dm.Capture 0, 0, 1920, 1080, "screen.bmp"

' 查找颜色
ret = dm.FindColor(0, 0, 1920, 1080, "FF0000-000000", posX, posY)
```

## 多线程示例

```vbscript
' 线程 1
Dim dm1
Set dm1 = CreateObject("dm.dmsoft")
dm1.SetPath "C:\Game1\"
' 执行任务...
dm1.UnBindWindow
Set dm1 = Nothing

' 线程 2
Dim dm2
Set dm2 = CreateObject("dm.dmsoft")
dm2.SetPath "C:\Game2\"
' 执行任务...
dm2.UnBindWindow
Set dm2 = Nothing
```

## 错误处理示例

```vbscript
On Error Resume Next

ret = dm.FindPic(0, 0, 1920, 1080, "button.bmp", "000000", 0.9, 0, posX, posY)

If Err.Number <> 0 Then
    errCode = dm.GetLastError()
    MsgBox "错误：" & errCode
    Err.Clear
End If

On Error GoTo 0
```
