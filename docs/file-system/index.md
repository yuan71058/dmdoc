# 文件系统

## 概述

文件系统模块提供文件操作、目录管理、INI 配置文件读写等功能。

## 主要功能

- **文件操作**：读取、写入、复制、删除文件
- **目录操作**：创建、删除、枚举目录
- **INI 配置**：读写配置文件
- **下载上传**：从网络下载文件

## API 列表

### 文件操作

| API 名称 | 说明 |
|---------|------|
| ReadFile | 读取文件 |
| WriteFile | 写入文件 |
| CopyFile | 复制文件 |
| MoveFile | 移动文件 |
| DeleteFile | 删除文件 |
| IsFileExist | 文件是否存在 |
| GetFileLength | 获取文件长度 |

### 目录操作

| API 名称 | 说明 |
|---------|------|
| CreateFolder | 创建目录 |
| DeleteFolder | 删除目录 |
| IsFolderExist | 目录是否存在 |
| GetDir | 获取目录 |

### INI 配置

| API 名称 | 说明 |
|---------|------|
| ReadIni | 读取 INI |
| WriteIni | 写入 INI |
| DeleteIni | 删除 INI 项 |
| EnumIniSection | 枚举 INI 段 |
| EnumIniKey | 枚举 INI 键 |

### 其他

| API 名称 | 说明 |
|---------|------|
| DownloadFile | 下载文件 |
| SelectFile | 选择文件 |
| SelectDirectory | 选择目录 |

## 使用示例

```vbscript
' 读取文件
content = dm.ReadFile("test.txt")

' 写入文件
dm.WriteFile "test.txt", "Hello World"

' 检查文件是否存在
If dm.IsFileExist("test.txt") Then
    ' 文件存在
End If

' 创建目录
dm.CreateFolder "C:\NewFolder"

' 读取 INI
value = dm.ReadIni("section", "key", "config.ini")

' 写入 INI
dm.WriteIni "section", "key", "value", "config.ini"

' 枚举 INI 段
sections = dm.EnumIniSection("config.ini")
```

## 注意事项

1. 注意文件路径的正确性
2. 读写文件时注意编码
3. INI 文件路径相对于 SetPath
4. 及时关闭文件句柄

## 下一章

[文件操作](/file-system/file-operation)
