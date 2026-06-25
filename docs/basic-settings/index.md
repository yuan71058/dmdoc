# 基本设置

## 概述

基本设置模块提供插件的基础配置功能，包括路径设置、注册授权、版本查询等。

## API 列表

| API 名称 | 说明 |
|---------|------|
| SetPath | 设置路径 |
| GetPath | 获取路径 |
| GetBasePath | 获取基路径 |
| Ver | 获取版本号 |
| GetID | 获取实例 ID |
| GetDmCount | 获取实例数量 |
| Reg | 注册 VIP |
| GetLastError | 获取最后错误 |
| EnablePicCache | 启用图片缓存 |
| SetShowErrorMsg | 设置显示错误 |

## 使用示例

```vbscript
' 设置路径
dm.SetPath "C:\Game\"

' 获取路径
path = dm.GetPath()

' 获取版本
version = dm.Ver()

' 获取实例 ID
id = dm.GetID()

' 注册
ret = dm.Reg("机器码", "注册码")

' 获取错误
err = dm.GetLastError()

' 启用缓存
dm.EnablePicCache 1
```

## 下一章

[路径设置](/basic-settings/path-setting)
