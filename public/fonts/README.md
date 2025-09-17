# 验证码字体文件说明

为了让验证码能够正确显示字符，您需要在这个目录下提供一个TrueType字体文件（.ttf格式）。

## 如何操作：

1. 下载一个开源的、无版权限制的TrueType字体文件（如Arial.ttf、Times New Roman.ttf等）
2. 将字体文件重命名为 `Arial.ttf`（必须使用这个名称）
3. 将文件保存到当前目录（public/fonts/）

## 为什么需要这样做：

当前项目使用的pureimage库需要明确加载字体文件才能正确渲染文本。如果没有提供字体文件，验证码可能会显示为空白或简单的矩形。

## 字体资源推荐：

- [Google Fonts](https://fonts.google.com/) - 提供大量开源免费字体
- [Font Squirrel](https://www.fontsquirrel.com/) - 提供可商用的免费字体

## 注意事项：

- 请确保您有使用所选字体的合法权限
- 文件名必须是 `Arial.ttf`，因为验证码服务代码中引用了这个名称
- 如果更改字体文件，可能需要重启开发服务器才能生效