# AI 功能

## 概述

大漠插件集成了 YOLO 等 AI 模型，支持智能物体检测和 AI 图像识别。

## 主要功能

- **YOLO 目标检测**：使用 YOLO 模型进行物体检测
- **模型管理**：加载、卸载、配置 AI 模型
- **AI 找图**：结合传统图像识别和 AI 检测

## API 列表

| API 名称 | 说明 |
|---------|------|
| LoadAi | 加载 AI 引擎 |
| LoadAiMemory | 从内存加载 AI |
| AiYoloSetModel | 设置 YOLO 模型 |
| AiYoloUseModel | 使用模型检测 |
| AiYoloDetectObjects | 检测目标 |
| AiYoloFreeModel | 释放模型 |
| AiFindPic | AI 找图 |
| AiFindPicEx | AI 找图扩展 |

## 使用示例

```vbscript
' 加载 AI 引擎
dm.LoadAi "model.onnx"

' 设置 YOLO 模型
dm.AiYoloSetModel "yolov5.onnx"

' 使用模型检测
dm.AiYoloUseModel

' 检测目标
ret = dm.AiYoloDetectObjects(imageData)

' 释放模型
dm.AiYoloFreeModel

' 清理
dm.UnLoadAi
```

## 注意事项

1. AI 模型需要单独下载
2. 建议使用 GPU 加速
3. 及时释放模型资源
4. 注意内存占用

## 下一章

[模型管理](/ai/model-manage)
