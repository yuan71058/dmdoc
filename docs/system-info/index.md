# 系统信息

## 概述

系统信息模块提供系统查询、硬件信息、网络时间等功能。

## 主要功能

- **系统查询**：操作系统类型、CPU、内存等信息
- **硬件信息**：显示器、硬盘、显卡等
- **网络时间**：获取网络标准时间
- **电源管理**：禁用屏保、睡眠等

## API 列表

### 系统查询

| API 名称 | 说明 |
|---------|------|
| GetOsType | 获取操作系统类型 |
| GetCpuType | 获取 CPU 类型 |
| GetCpuUsage | 获取 CPU 使用率 |
| GetMemoryUsage | 获取内存使用率 |
| GetMachineCode | 获取机器码 |
| GetScreenDepth | 获取色深 |

### 屏幕信息

| API 名称 | 说明 |
|---------|------|
| GetScreenWidth | 获取屏幕宽度 |
| GetScreenHeight | 获取屏幕高度 |
| GetDisplayInfo | 获取显示器信息 |
| GetDPI | 获取 DPI |

### 硬盘信息

| API 名称 | 说明 |
|---------|------|
| GetDiskSerial | 获取硬盘序列号 |
| GetDiskModel | 获取硬盘型号 |

### 网络时间

| API 名称 | 说明 |
|---------|------|
| GetNetTime | 获取网络时间 |
| GetNetTimeSafe | 安全获取网络时间 |

### 剪贴板

| API 名称 | 说明 |
|---------|------|
| GetClipboard | 获取剪贴板 |
| SetClipboard | 设置剪贴板 |

### 延时和电源

| API 名称 | 说明 |
|---------|------|
| Delay | 延时 |
| DisableScreenSave | 禁用屏保 |
| DisablePowerSave | 禁用省电 |

## 使用示例

```vbscript
' 获取系统信息
osType = dm.GetOsType()
cpuType = dm.GetCpuType()
cpuUsage = dm.GetCpuUsage()
memUsage = dm.GetMemoryUsage()

' 获取屏幕信息
screenWidth = dm.GetScreenWidth()
screenHeight = dm.GetScreenHeight()
depth = dm.GetScreenDepth()

' 获取机器码
machineCode = dm.GetMachineCode()

' 获取网络时间
netTime = dm.GetNetTime()

' 获取剪贴板
clipboard = dm.GetClipboard()

' 延时
dm.Delay 1000

' 禁用屏保
dm.DisableScreenSave 1
```

## 注意事项

1. 部分信息需要管理员权限
2. 网络时间需要联网
3. 注意权限要求

## 下一章

[系统查询](/system-info/query-system)
