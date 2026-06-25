# VBS 使用规范

## 对象创建

每个线程必须创建独立的 dm 对象：

```vbscript
' 正确做法
Sub ThreadFunction()
    Dim dm
    Set dm = CreateObject("dm.dmsoft")
    ' 执行任务
    ' ...
    Set dm = Nothing
End Sub
```

## 异常处理

```vbscript
On Error Resume Next
ret = dm.FindPic(...)
If Err.Number <> 0 Then
    ' 处理错误
    Err.Clear
End If
On Error GoTo 0
```

## 资源清理

### 脚本退出时清理

```vbscript
Sub OnScriptExit()
    If Not dm Is Nothing Then
        dm.UnBindWindow
        Set dm = Nothing
    End If
End Sub
```

### 线程退出时清理

```vbscript
Sub OnThreadExit()
    dm.UnBindWindow
    Set dm = Nothing
End Sub
```

## 性能优化

```vbscript
' 设置显示刷新延迟
dm.SetDisplayRefreshDelay(100)

' 启用图片缓存
dm.EnablePicCache 1

' 降低 CPU 占用
dm.DownCpu 1
```

## 调试技巧

```vbscript
' 开启调试输出
dm.EnableDisplayDebug 1

' 显示错误提示
dm.SetShowErrorMsg 1

' 记录日志
TracePrint "当前坐标：" & posX & "," & posY
```

## 注意事项

1. 不要重复创建 dm 对象
2. 及时释放图片资源
3. 正确使用 UnBindWindow
4. 多线程环境下每个线程独立对象
5. 脚本退出前必须清理资源
