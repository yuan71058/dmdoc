# 算法工具

## 概述

算法工具模块提供位置处理相关的算法功能。

## API 列表

| API 名称 | 说明 |
|---------|------|
| ExcludePos | 排除位置 |
| FindNearestPos | 查找最近位置 |
| SortPosDistance | 按距离排序位置 |

## 使用示例

```vbscript
' 排除位置
dm.ExcludePos x1, y1, x2, y2, posArray, count

' 查找最近位置
retX = 0
retY = 0
dm.FindNearestPos targetX, targetY, posArray, count, retX, retY

' 按距离排序
dm.SortPosDistance posArray, count
```

## 下一章

[位置过滤](/algorithm/position-filter)
