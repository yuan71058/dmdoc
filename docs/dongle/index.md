# 加密狗

## 概述

加密狗模块提供硬件加密狗验证功能。

## API 列表

| API 名称 | 说明 |
|---------|------|
| DmGuard | 加密狗验证 |
| DmGuardExtract | 提取加密狗信息 |
| DmGuardLoadCustom | 加载自定义加密狗 |
| UnLoadDriver | 卸载驱动 |

## 使用示例

```vbscript
' 验证加密狗
ret = dm.DmGuard()
```

## 下一章

[硬件验证](/dongle/verify)
