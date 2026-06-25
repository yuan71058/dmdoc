# 绘图板

## 概述

绘图板功能提供了一个自定义的绘图表面，可以在上面绘制图形、文字和图片。

## 主要功能

- **创建绘图表面**：支持矩形、椭圆、圆角矩形等
- **绘制图形**：线条、矩形、椭圆等
- **绘制文字**：支持字体、颜色、大小设置
- **绘制图片**：在绘图板上显示图片
- **GIF 动画**：支持 GIF 动画播放

## API 列表

| API 名称 | 说明 |
|---------|------|
| CreateFoobarRect | 创建矩形绘图板 |
| CreateFoobarEllipse | 创建椭圆绘图板 |
| CreateFoobarRoundRect | 创建圆角矩形绘图板 |
| FoobarDrawLine | 绘制线条 |
| FoobarDrawText | 绘制文字 |
| FoobarDrawPic | 绘制图片 |
| FoobarFillRect | 填充矩形 |
| FoobarSetFont | 设置字体 |
| FoobarStartGif | 开始 GIF 动画 |
| FoobarStopGif | 停止 GIF 动画 |
| FoobarUpdate | 刷新绘图板 |
| FoobarClose | 关闭绘图板 |

## 使用示例

```vbscript
' 创建矩形绘图板
fb = dm.CreateFoobarRect(0, 0, 800, 600)

' 设置字体
dm.FoobarSetFont fb, "微软雅黑", 12, 0

' 绘制文字
dm.FoobarDrawText fb, 100, 100, "Hello World", -1, 0

' 绘制线条
dm.FoobarDrawLine fb, 0, 0, 800, 600, -1, 1

' 填充矩形
dm.FoobarFillRect fb, 100, 100, 200, 200, -1

' 刷新显示
dm.FoobarUpdate fb

' 关闭绘图板
dm.FoobarClose fb
```

## 注意事项

1. 绘图板需要手动释放资源
2. 绘制操作需要在 Lock 后进行
3. 支持透明背景
4. 注意性能优化

## 下一章

[绘制图形](/foobar/draw-shapes)
