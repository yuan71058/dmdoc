# 安装注册

## 插件安装

### 方法一：自动注册（推荐）

将 `dm.dll` 和 `RegDll.dll` 放在同一目录，运行以下命令：

```vbscript
' 使用 RegDll.dll 注册（推荐）
Plugin.RegDll.Reg("dm.dll")
```

### 方法二：手动注册

以管理员身份运行 CMD，执行：

```cmd
regsvr32 dm.dll
```

### 方法三：不注册直接使用

```vbscript
' 设置插件路径
dm.SetPath "C:\Plugins\"
```

## 版本验证

```vbscript
Set dm = CreateObject("dm.dmsoft")
version = dm.Ver()
MsgBox "当前版本：" & version
```

## 注册授权

### VIP 注册

```vbscript
' 获取机器码
machineCode = dm.GetMachineCode()
MsgBox "机器码：" & machineCode

' 注册 VIP
ret = dm.Reg(machineCode, "注册码")
If ret = 1 Then
    MsgBox "注册成功！"
Else
    MsgBox "注册失败，错误码：" & ret
End If
```

### 注册信息

- 注册码有效期：永久
- 支持功能：后台绑定、OCR 识别等
- 注册后不可转移

## 常见问题

### 注册失败怎么办？

1. 检查网络连接
2. 确认机器码正确
3. 联系技术支持获取注册码

### 64 位系统问题

64 位系统需要注册 64 位版本的 dm.dll。
