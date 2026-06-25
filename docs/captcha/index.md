# 验证码识别

## 概述

验证码识别模块提供验证码捕获、解答和提交功能。

## API 列表

| API 名称 | 说明 |
|---------|------|
| FaqCapture | 验证码捕获 |
| FaqCaptureFromFile | 从文件捕获验证码 |
| FaqFetch | 获取验证码答案 |
| FaqPost | 异步提交 |
| FaqSend | 同步发送 |
| FaqGetSize | 获取验证码尺寸 |

## 使用示例

```vbscript
' 捕获验证码
dm.FaqCapture x1, y1, x2, y2, "captcha.bmp"

' 获取答案
answer = dm.FaqFetch()

' 提交答案
dm.FaqSend answer
```

## 下一章

[验证码捕获](/captcha/capture)
