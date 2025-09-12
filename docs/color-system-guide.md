# Cheer Next 颜色系统指南

## 概述

本文档详细介绍了Cheer Next项目中预定义的颜色系统，旨在帮助开发人员在实现UI时统一使用预定义的颜色token，确保整个应用的视觉一致性。

## 颜色系统基础

项目使用了OKLCH颜色格式定义所有颜色，这种格式在不同设备和光照条件下提供了更好的色彩一致性。颜色系统分为浅色模式（:root）和深色模式（.dark）两种配置。

## 核心颜色Token

### 基础颜色

| Token | 描述 | 用途 |
|-------|------|------|
| `--background` | 背景色 | 页面主背景 |
| `--foreground` | 前景色 | 主要文本颜色 |
| `--card` | 卡片背景色 | 卡片、面板等容器背景 |
| `--card-foreground` | 卡片前景色 | 卡片内文本颜色 |
| `--popover` | 弹出层背景色 | 下拉菜单、弹出窗口等背景 |
| `--popover-foreground` | 弹出层前景色 | 弹出层内文本颜色 |
| `--border` | 边框颜色 | 元素边框、分割线 |
| `--input` | 输入框背景色 | 表单输入元素背景 |
| `--ring` | 焦点环颜色 | 元素获取焦点时的高亮环 |

### 功能颜色

| Token | 描述 | 用途 |
|-------|------|------|
| `--primary` | 主色（蓝色） | 主要操作按钮、链接、高亮显示 |
| `--primary-foreground` | 主色前景色 | 主色背景上的文本颜色 |
| `--secondary` | 辅助色（淡紫色） | 次要操作、提示信息 |
| `--secondary-foreground` | 辅助色前景色 | 辅助色背景上的文本颜色 |
| `--accent` | 强调色（紫色） | 强调元素、特殊标记 |
| `--accent-foreground` | 强调色前景色 | 强调色背景上的文本颜色 |
| `--destructive` | 警告/错误色（红色） | 错误提示、删除操作 |
| `--destructive-foreground` | 警告/错误色前景色 | 警告/错误色背景上的文本颜色 |
| `--muted` | 静音色 | 次要背景、分隔区域 |
| `--muted-foreground` | 静音色前景色 | 静音色背景上的文本颜色 |

### 图表颜色

| Token | 描述 | 用途 |
|-------|------|------|
| `--chart-1` | 图表颜色1（蓝色） | 图表数据系列1 |
| `--chart-2` | 图表颜色2（淡紫色） | 图表数据系列2 |
| `--chart-3` | 图表颜色3（紫色） | 图表数据系列3 |
| `--chart-4` | 图表颜色4（金色） | 图表数据系列4 |
| `--chart-5` | 图表颜色5（粉色） | 图表数据系列5 |

### 渐变终点颜色

| Token | 描述 | 用途 |
|-------|------|------|
| `--gradient-gold-end` | 金色渐变终点 | 金色渐变效果 |
| `--gradient-pink-end` | 粉色渐变终点 | 粉色渐变效果 |

### 侧边栏颜色

| Token | 描述 | 用途 |
|-------|------|------|
| `--sidebar` | 侧边栏背景色 | 侧边栏容器背景 |
| `--sidebar-foreground` | 侧边栏前景色 | 侧边栏文本颜色 |
| `--sidebar-primary` | 侧边栏主色 | 侧边栏激活项、主要按钮 |
| `--sidebar-primary-foreground` | 侧边栏主色前景色 | 侧边栏主色背景上的文本颜色 |
| `--sidebar-accent` | 侧边栏强调色 | 侧边栏辅助元素 |
| `--sidebar-accent-foreground` | 侧边栏强调色前景色 | 侧边栏强调色背景上的文本颜色 |
| `--sidebar-border` | 侧边栏边框色 | 侧边栏内部分割线 |
| `--sidebar-ring` | 侧边栏焦点环色 | 侧边栏元素获取焦点时的高亮环 |

## 边框圆角

| Token | 描述 | 值 |
|-------|------|-----|
| `--radius` | 基础圆角 | 0.75rem |
| `--radius-sm` | 小圆角 | calc(var(--radius) - 4px) |
| `--radius-md` | 中等圆角 | calc(var(--radius) - 2px) |
| `--radius-lg` | 大圆角 | var(--radius) |
| `--radius-xl` | 超大圆角 | calc(var(--radius) + 4px) |

## 预定义的渐变工具类

项目提供了以下预定义的渐变背景工具类：

| 类名 | 描述 | 实现 |
|------|------|------|
| `.gradient-blue` | 蓝色渐变 | `linear-gradient(135deg, var(--chart-1) 0%, var(--primary) 100%)` |
| `.gradient-lavender` | 淡紫色渐变 | `linear-gradient(135deg, var(--chart-2) 0%, var(--secondary) 100%)` |
| `.gradient-purple` | 紫色渐变 | `linear-gradient(135deg, var(--chart-3) 0%, var(--accent) 100%)` |
| `.gradient-gold` | 金色渐变 | `linear-gradient(135deg, var(--chart-4) 0%, var(--gradient-gold-end) 100%)` |
| `.gradient-pink` | 粉色渐变 | `linear-gradient(135deg, var(--chart-5) 0%, var(--gradient-pink-end) 100%)` |
| `.gradient-blue-lavender` | 蓝紫渐变 | `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)` |

## 颜色映射

如果你设计时候不知道怎么映射，参考这个表：


### 文本颜色类

| 类名 | 对应Token |
|------|-----------|
| `.text-blue-500` | `var(--chart-1)` |
| `.text-blue-600` | `var(--primary)` |
| `.text-blue-400` | `var(--primary)` |
| `.text-red-300` | `var(--destructive)` |
| `.text-red-500` | `var(--destructive)` |
| `.text-green-500` | `var(--chart-4)` |
| `.text-purple-400` | `var(--chart-3)` |
| `.text-purple-500` | `var(--chart-3)` |
| `.text-purple-600` | `var(--accent)` |
| `.text-pink-500` | `var(--chart-5)` |
| `.text-pink-600` | `var(--gradient-pink-end)` |

### 悬停状态类

| 类名 | 对应Token |
|------|-----------|
| `.hover:text-blue-600:hover` | `var(--primary)` |

### 深色模式类

| 类名 | 对应Token |
|------|-----------|
| `.dark .dark:text-blue-400` | `var(--primary)` |
| `.dark .dark:border-purple-400` | `var(--accent)` |
| `.dark .dark:text-purple-400` | `var(--accent)` |
| `.dark .dark:hover:bg-purple-950/20:hover` | `rgba(0, 0, 0, 0.2)` |

## 使用指南

### 在CSS中使用

```css
/* 直接使用CSS变量 */
.element {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

/* 使用预定义工具类 */
.gradient-button {
  @apply gradient-blue text-primary-foreground;
}
```

### 在Tailwind类中使用

```jsx
// 使用预定义的颜色映射类
<div className="text-blue-600 bg-primary-foreground border-border rounded-radius">
  示例内容
</div>

// 结合渐变工具类
<div className="gradient-purple text-white p-4 rounded-radius-lg">
  渐变背景卡片
</div>
```

## 最佳实践

1. **优先使用预定义工具类**：在HTML元素上直接使用项目提供的颜色映射工具类和渐变工具类。

2. **其次使用CSS变量**：在编写自定义CSS时，使用`var(--token-name)`的形式引用预定义的颜色token。

3. **保持一致性**：确保整个应用中相同类型的元素使用相同的颜色token，例如所有主要按钮都使用`--primary`颜色。

4. **考虑深色模式**：在实现UI时，确保考虑深色模式下的显示效果，并适当使用深色模式专属的工具类。

5. **避免硬编码颜色值**：不要在代码中直接硬编码颜色值，始终使用预定义的颜色token。

## 扩展指南

如果现有颜色token无法满足需求，可以在`globals.css`文件中添加新的颜色token和对应的工具类。添加时请注意：

1. 在`:root`和`.dark`选择器下同时定义新的颜色token，确保深色模式的支持。

2. 在`@theme inline`中添加对应的Tailwind主题映射。

3. 在`@layer utilities`中添加方便使用的工具类。

4. 更新本指南文档，保持文档与代码的一致性。

通过遵循本指南，我们可以确保整个应用的UI设计保持一致的视觉风格，同时也便于未来对颜色主题进行统一的调整和优化。