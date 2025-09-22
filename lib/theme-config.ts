export type ThemeName = 'cyan' | 'blue' | 'purple'
//  | 'green' | 'pink' | 'orange';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: Record<string, string>;
}

export const themes: Record<ThemeName, Theme> = {
  cyan: {
    name: 'cyan',
    label: '天青色',
    colors: {
      // 主要颜色
      primary: '#1496a0',
      'primary-foreground': '#ffffff',
      
      // 次要颜色
      secondary: '#43b3a8',
      'secondary-foreground': '#e8fbfc',
      
      // 强调色
      accent: '#ddeced',
      'accent-foreground': '#126361',
      
      // 背景色
      background: '#ffffff',
      foreground: '#0f172a',
      
      // 卡片颜色
      card: '#ffffff',
      'card-foreground': '#0f172a',
      
      // 弹窗颜色
      popover: '#ffffff',
      'popover-foreground': '#0f172a',
      
      // 静音/禁用色
      muted: '#f1f5f9',
      'muted-foreground': '#64748b',
      
      // 破坏性操作颜色
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      
      // 边框和输入框
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#1496a0',
      
      // 图表颜色
      chart1: '#1496a0',
      chart2: '#43b3a8',
      chart3: '#72a3c5',
      chart4: '#92d0d9',
      chart5: '#b2dde5',
      // 暗黑模式颜色
      'dark-primary': '#0fb0c9',
      'dark-primary-foreground': '#bfe6fe',
      'dark-secondary': '#44958e',
      'dark-secondary-foreground': '#0f172a',
      'dark-accent': '#94a3b8',
      'dark-accent-foreground': '#0f172a',
      'dark-background': '#0f172a',
      'dark-foreground': '#f8fafc',
      'dark-card': '#1e293b',
      'dark-card-foreground': '#f8fafc',
      'dark-popover': '#0f172a',
      'dark-popover-foreground': '#f8fafc',
      'dark-muted': '#1e293b',
      'dark-muted-foreground': '#94a3b8',
      'dark-destructive': '#f87171',
      'dark-destructive-foreground': '#0f172a',
      'dark-border': '#334155',
      'dark-input': '#1e293b',
      'dark-ring': '#22d3ee',
      'dark-chart-1': '#22d3ee',
      'dark-chart-2': '#4fd1c5',
      'dark-chart-3': '#94a3b8',
      'dark-chart-4': '#93c5fd',
      'dark-chart-5': '#bfdbfe',
    },
  },
  blue: {
    name: 'blue',
    label: '中南蓝',
    colors: {
      // 基于新色值改造的中南蓝
      primary: '#215490',
      'primary-foreground': '#ffffff',
      secondary: '#7b9dc8',
      'secondary-foreground': '#ffffff',
      accent: '#90bced',
      'accent-foreground': '#3a69a1',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      'card-foreground': '#0f172a',
      popover: '#ffffff',
      'popover-foreground': '#0f172a',
      muted: '#f1f5f9',
      'muted-foreground': '#64748b',
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#215490',
      chart1: '#215490',
      chart2: '#7b9dc8',
      chart3: '#818cf8',
      chart4: '#93c5fd',
      chart5: '#bfe6fe',
      // 暗黑模式颜色 - 基于新色值
      'dark-primary': '#5788c3',
      'dark-primary-foreground': '#ffffff',
      'dark-secondary': '#93c5fd',
      'dark-secondary-foreground': '#0f172a',
      'dark-accent': '#a5b4fc',
      'dark-accent-foreground': '#0f172a',
      'dark-background': '#0f172a',
      'dark-foreground': '#f8fafc',
      'dark-card': '#1e293b',
      'dark-card-foreground': '#f8fafc',
      'dark-popover': '#0f172a',
      'dark-popover-foreground': '#f8fafc',
      'dark-muted': '#1e293b',
      'dark-muted-foreground': '#94a3b8',
      'dark-destructive': '#f87171',
      'dark-destructive-foreground': '#ffffff',
      'dark-border': '#334155',
      'dark-input': '#1e293b',
      'dark-ring': '#60a5fa',
      'dark-chart-1': '#60a5fa',
      'dark-chart-2': '#93c5fd',
      'dark-chart-3': '#a5b4fc',
      'dark-chart-4': '#bfdbfe',
      'dark-chart-5': '#dbeafe',
    },
  },
  purple: {
    name: 'purple',
    label: '沉光紫',
    colors: {
      // 主要颜色 - 基于#977AA1稍微提高饱和度
      primary: '#8B5A9E',
      'primary-foreground': '#ffffff',
      
      // 次要颜色 - 基于#AAA1C8稍微提高饱和度
      secondary: '#9B92C7',
      'secondary-foreground': '#ffffff',
      
      // 强调色 - 基于#d6c6e0稍微提高饱和度
      accent: '#C7B3D9',
      'accent-foreground': '#1e293b',
      
      // 背景色
      background: '#ffffff',
      foreground: '#0f172a',
      
      // 卡片颜色
      card: '#ffffff',
      'card-foreground': '#0f172a',
      
      // 弹窗颜色
      popover: '#ffffff',
      'popover-foreground': '#0f172a',
      
      // 静音/禁用色
      muted: '#f1f5f9',
      'muted-foreground': '#64748b',
      
      // 破坏性操作颜色
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      
      // 边框和输入框
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#8B5A9E',
      
      // 图表颜色 - 基于提供的色值创建渐变
      chart1: '#8B5A9E',
      chart2: '#9B92C7',
      chart3: '#C7B3D9',
      chart4: '#D6C6E0',
      chart5: '#F5E7E9',
      
      // 暗黑模式颜色 - 基于原色值提高饱和度
      'dark-primary': '#A78BFA',
      'dark-primary-foreground': '#0f172a',
      'dark-secondary': '#C4B5FD',
      'dark-secondary-foreground': '#0f172a',
      'dark-accent': '#DDD6FE',
      'dark-accent-foreground': '#0f172a',
      'dark-background': '#0f172a',
      'dark-foreground': '#f8fafc',
      'dark-card': '#1e293b',
      'dark-card-foreground': '#f8fafc',
      'dark-popover': '#0f172a',
      'dark-popover-foreground': '#f8fafc',
      'dark-muted': '#1e293b',
      'dark-muted-foreground': '#94a3b8',
      'dark-destructive': '#f87171',
      'dark-destructive-foreground': '#0f172a',
      'dark-border': '#334155',
      'dark-input': '#1e293b',
      'dark-ring': '#A78BFA',
      'dark-chart-1': '#A78BFA',
      'dark-chart-2': '#C4B5FD',
      'dark-chart-3': '#DDD6FE',
      'dark-chart-4': '#EDE9FE',
      'dark-chart-5': '#F5E7E9',
    },
  }
};

export const themeList = Object.values(themes);

export const getThemeColors = (themeName: ThemeName) => {
  return themes[themeName] || themes.cyan;
};