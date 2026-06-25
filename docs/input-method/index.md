# 输入法

## 概述

输入法模块提供输入法控制和命令执行功能。

## API 列表

| API 名称 | 说明 |
|---------|------|
| ActiveInputMethod | 激活输入法 |
| CheckInputMethod | 检查输入法 |
| FindInputMethod | 查找输入法 |
| ExecuteCmd | 执行命令 |

## 使用示例

```vbscript
' 检查输入法
ret = dm.CheckInputMethod()

' 激活输入法
dm.ActiveInputMethod()

' 执行命令
dm.ExecuteCmd "cmd.exe"
```

## 下一章

[激活输入法](/input-method/activate)
