# 图像颜色

## 概述

图像颜色模块是大漠插件最大的模块，包含 95 个 API，提供截图、颜色查询、图片查找等功能。

## 主要功能

- **截图功能**：支持 BMP、PNG、JPG、GIF 格式
- **颜色查询**：获取指定位置的颜色值
- **图片查找**：在屏幕上查找指定图片
- **多点色查找**：通过多个颜色点定位
- **形状识别**：查找特定形状

## API 列表

### 截图功能

| API 名称 | 说明 |
|---------|------|
| Capture | 截取 bmp 图片 |
| CapturePng | 截取 png 图片 |
| CaptureJpg | 截取 jpg 图片 |
| CaptureGif | 截取 gif 图片 |
| CapturePre | 截取当前屏幕 bmp |

### 颜色查询

| API 名称 | 说明 |
|---------|------|
| GetColor | 获取颜色 |
| GetColorBGR | 获取颜色 BGR |
| GetColorHSV | 获取颜色 HSV |
| GetAveRGB | 获取平均值 RGB |
| GetAveHSV | 获取平均值 HSV |
| CmpColor | 比较颜色 |

### 图片查找

| API 名称 | 说明 |
|---------|------|
| FindPic | 找图片 |
| FindPicEx | 找图片扩展 |
| FindPicSim | 找相似图片 |
| FindPicMem | 找图片内存版 |
| LoadPic | 加载本地图片 |
| FreePic | 释放图片 |

### 多点色查找

| API 名称 | 说明 |
|---------|------|
| FindColor | 找颜色 |
| FindColorEx | 找颜色扩展 |
| FindMultiColor | 找多点色 |
| FindMultiColorEx | 找多点色扩展 |
| FindColorBlock | 找颜色块 |

## 使用示例

```vbscript
' 截图保存
dm.CapturePng 0, 0, 1920, 1080, "screenshot.png", 0

' 获取颜色
color = dm.GetColor(100, 100)

' 查找图片
posX = 0
posY = 0
ret = dm.FindPic(0, 0, 1920, 1080, "button.bmp", "000000", 0.9, 0, posX, posY)

' 查找颜色
ret = dm.FindColor(0, 0, 1920, 1080, "FF0000-000000", posX, posY)

' 查找多点色
ret = dm.FindMultiColor(0, 0, 1920, 1080, "FF0000|00FF00|0000FF", "-FFFFFF", 0.9, posX, posY)
```

## 注意事项

1. 图片路径相对于 SetPath 设置的路径
2. 查找图片时注意相似度设置
3. 及时释放图片资源
4. 后台模式下的截图可能受限

## 下一章

[截图功能](/image-color/capture)
