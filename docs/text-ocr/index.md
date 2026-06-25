# 文字识别

## 概述

文字识别模块提供 OCR 功能和字符串查找功能，支持高精度文字识别。

## 主要功能

- **OCR 识别**：将图像中的文字转换为文本
- **字符串查找**：在屏幕上查找指定文字
- **字典管理**：管理字库和识别字典
- **高级 OCR**：支持多种识别模式和参数设置

## API 列表

### OCR 识别

| API 名称 | 说明 |
|---------|------|
| Ocr | OCR 识别 |
| OcrEx | OCR 识别扩展 |
| OcrInFile | OCR 识别 bmp |
| OcrExOne | OCR 识别单字 |

### 字符串查找

| API 名称 | 说明 |
|---------|------|
| FindStr | 找字串 |
| FindStrEx | 找字串扩展 |
| FindStrFast | 找字串快速 |
| FindStrS | 找字串 S |
| FindStrWithFont | 找字串系统字体 |

### 字典管理

| API 名称 | 说明 |
|---------|------|
| SetDict | 设字库 |
| AddDict | 添加字库 |
| UseDict | 用字库 |
| ClearDict | 清空字库 |
| SaveDict | 保存字库 |
| GetResultCount | 取结果数量 |
| GetResultPos | 取指定结果 |

## 使用示例

```vbscript
' 设置字库
dm.SetDict "dict.txt"

' 查找文字
result = dm.FindStr(0, 0, 1920, 1080, "确定", "9f2e3f-000000", 1.0, posX, posY)

' 快速查找文字
result = dm.FindStrFast(0, 0, 1920, 1080, "确定", "9f2e3f-000000", 1.0, posX, posY)

' OCR 识别
result = dm.Ocr(0, 0, 1920, 1080, "9f2e3f-000000", 1.0)

' 获取结果
count = dm.GetResultCount()
For i = 0 To count - 1
    str = dm.GetWordResultStr(i)
    x = dm.GetWordResultPos(i, 0)
    y = dm.GetWordResultPos(i, 1)
Next

' 清空字库
dm.ClearDict
```

## 注意事项

1. 使用前需要先设置字库
2. 字库文件需要正确配置
3. 识别结果可能有误差
4. 及时释放字典资源

## 下一章

[OCR 识别](/text-ocr/ocr-basic)
