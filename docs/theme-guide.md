# 主题系统使用指南

## 功能概述

绮课平台现在支持多种颜色主题切换，包括：

### 支持的主题
- **天青色** (cyan) - 默认主题，清新自然
- **中南蓝** (blue) - 中南大学官方蓝色主题
- **梦幻紫** (purple) - 优雅梦幻的紫色主题
- **清新绿** (green) - 活力清新的绿色主题
- **樱花粉** (pink) - 温柔浪漫的粉色主题
- **活力橙** (orange) - 充满活力的橙色主题

### 功能特点
- **实时切换** - 无需刷新页面即可切换主题
- **暗黑模式** - 支持亮色/暗色模式切换
- **持久化存储** - 主题选择会被保存到本地存储
- **响应式设计** - 在桌面和移动端都有良好的体验

## 使用方法

### 1. 主题选择器

在导航栏右侧点击调色板图标即可打开主题选择器：
- 点击不同的颜色块切换主题颜色
- 点击导航栏中的月亮/太阳图标，独立切换暗黑模式

### 2. 程序化使用

在你的组件中使用主题系统：

```typescript
import { useTheme } from '@/components/theme-provider';

function MyComponent() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={() => setTheme('blue')}>切换到中南蓝</button>
      <button onClick={toggleDarkMode}>切换暗黑模式</button>
    </div>
  );
}
```

### 3. 主题配置

主题配置文件位于 `lib/theme-config.ts`，可以自定义添加新主题：

```typescript
export const themes: Record<ThemeName, Theme> = {
  custom: {
    name: 'custom',
    label: '自定义主题',
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      chart1: '#your-color',
      chart2: '#your-color',
      chart3: '#your-color',
      chart4: '#your-color',
      chart5: '#your-color',
    },
  },
};
```

## 技术实现

### 文件结构
```
├── components/
│   ├── theme-provider.tsx      # 主题管理器
│   └── theme-selector.tsx      # 主题选择器组件
├── lib/
│   └── theme-config.ts         # 主题配置
└── app/
    └── globals.css             # 全局样式
```

### CSS变量系统

主题颜色通过CSS变量动态设置：
- `--primary` - 主色调
- `--secondary` - 次色调
- `--accent` - 强调色
- `--chart-1` 到 `--chart-5` - 图表颜色

### 暗黑模式

暗黑模式通过添加/移除 `.dark` 类实现，所有颜色变量都有对应的暗色版本。

## 最佳实践

1. **使用CSS变量** - 始终使用CSS变量而不是硬编码颜色
2. **响应式设计** - 确保主题切换在所有设备上都有良好体验
3. **无障碍访问** - 主题选择器支持键盘导航和屏幕阅读器
4. **性能优化** - 主题切换使用CSS变量，避免重渲染

## 示例代码

### 在组件中使用主题颜色
```css
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.dark .my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

### 创建渐变背景
```css
.gradient-bg {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}
```

## 故障排除

### 常见问题

1. **主题不生效** - 确保组件被 `ThemeProvider` 包裹
2. **颜色不更新** - 检查CSS变量是否正确使用
3. **存储问题** - 清除localStorage中的 `colorTheme` 和 `darkMode` 键值

### 调试技巧

在浏览器控制台中检查CSS变量：
```javascript
// 检查当前主题颜色
getComputedStyle(document.documentElement).getPropertyValue('--primary');

// 检查暗黑模式状态
document.documentElement.classList.contains('dark');
```