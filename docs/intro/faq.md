# 常见问题

## 安装注册问题

### Q: 注册 DLL 失败怎么办？

A: 请以管理员身份运行 CMD，然后执行：

```cmd
regsvr32 dm.dll
```

### Q: 64 位系统如何注册？

A: 使用 64 位版本的 dm.dll，并以管理员权限注册。

## 使用规范问题

### Q: 如何在多线程中使用？

A: 每个线程需要独立的 dm 对象：

```vbscript
Sub ThreadFunction()
    Dim dm
    Set dm = CreateObject("dm.dmsoft")
    ' 执行任务
    Set dm = Nothing
End Sub
```

### Q: 如何正确清理资源？

A: 脚本退出时执行：

```vbscript
dm.UnBindWindow
Set dm = Nothing
```

## 故障排查

### Q: 绑定窗口失败？

A: 检查以下几点：
1. 是否以管理员权限运行
2. 关闭 UAC 或选择合适的绑定模式
3. 尝试不同的绑定模式（gdi/dx）
4. 检查杀毒软件拦截

### Q: 识别速度慢？

A: 优化建议：
1. 缩小搜索区域
2. 降低相似度要求
3. 使用快速模式 (FindStrFast)
4. 启用多线程

### Q: 内存占用增加？

A: 及时释放资源：
1. 调用 FreePic 释放图片
2. 调用 UnBindWindow 解绑
3. 每个线程独立创建和释放 dm 对象

## 性能优化

### 降低 CPU 占用

```vbscript
dm.DownCpu 1
dm.SetDisplayRefreshDelay(100)
```

### 提高识别速度

```vbscript
' 启用缓存
dm.EnablePicCache 1

' 使用快速模式
dm.FindStrFast(...)
```

## 更多信息

- [官方网站](http://www.dmfun.com)
- [官方论坛](http://bbs.dmfun.com)
