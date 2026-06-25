# 汇编功能

## 概述

汇编功能模块允许注入和执行汇编代码到目标进程。

## API 列表

| API 名称 | 说明 |
|---------|------|
| AsmAdd | 添加汇编代码 |
| AsmCall | 调用汇编代码 |
| AsmCallEx | 调用汇编代码扩展 |
| AsmClear | 清除汇编代码 |
| AsmSetTimeout | 设置汇编超时 |
| Assemble | 汇编指令转机器码 |
| DisAssemble | 机器码转汇编指令 |

## 使用示例

```vbscript
' 添加汇编代码
dm.AsmAdd "mov eax, 1"
dm.AsmAdd "ret"

' 调用汇编代码
ret = dm.AsmCall()

' 设置超时
dm.AsmSetTimeout 5000

' 清除汇编代码
dm.AsmClear
```

## 下一章

[汇编代码](/assembly/asm-code)
