# 内存操作

## 概述

内存操作模块提供进程内存的读取、写入和搜索功能，支持复杂的内存数据处理。

## 主要功能

- **内存读取**：读取进程的整数、浮点数、字符串等数据
- **内存写入**：向进程写入各种类型的数据
- **内存搜索**：在进程内存中搜索指定值
- **虚拟内存**：分配、释放、查询虚拟内存

## API 列表

### 内存读取

| API 名称 | 说明 |
|---------|------|
| ReadInt | 读取整数 |
| ReadDouble | 读取双精度 |
| ReadFloat | 读取浮点数 |
| ReadString | 读取字符串 |
| ReadData | 读取数据 |

### 内存写入

| API 名称 | 说明 |
|---------|------|
| WriteInt | 写入整数 |
| WriteDouble | 写入双精度 |
| WriteFloat | 写入浮点数 |
| WriteString | 写入字符串 |
| WriteData | 写入数据 |

### 内存搜索

| API 名称 | 说明 |
|---------|------|
| FindInt | 查找整数 |
| FindDouble | 查找双精度 |
| FindFloat | 查找浮点数 |
| FindString | 查找字符串 |
| FindData | 查找二进制数据 |

### 进程管理

| API 名称 | 说明 |
|---------|------|
| OpenProcess | 打开进程 |
| TerminateProcess | 终止进程 |
| GetModuleBaseAddr | 获取模块基址 |
| GetCommandLine | 获取命令行 |

## 使用示例

```vbscript
' 打开进程
hProc = dm.OpenProcess(进程ID, 1)

' 读取整数
value = dm.ReadInt(hProc, "地址")

' 读取带偏移的地址
value = dm.ReadInt(hProc, "<360SE.exe>+DA678")

' 多层指针
value = dm.ReadInt(hProc, "[[<exe>+A]+B]+C")

' 写入整数
dm.WriteInt hProc, "地址", 100

' 搜索整数
ret = dm.FindInt(hProc, "起始地址", "结束地址", "100", 1, count)

' 关闭进程句柄
' (插件自动管理)
```

## 地址格式

```
"4DA678"                    ; 直接地址
"<360SE.exe>+DA678"         ; 模块 + 偏移
"[4DA678]+3A"               ; 指针解引用
"[[<exe>+A]+B]+C"           ; 多层指针
```

## 注意事项

1. 需要管理员权限
2. 注意进程保护机制
3. 及时释放资源
4. 地址格式要正确

## 下一章

[内存读取](/memory/read-memory)
