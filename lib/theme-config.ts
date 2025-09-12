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
      'secondary-foreground': '#ffffff',
      
      // 强调色
      accent: '#72a3c5',
      'accent-foreground': '#ffffff',
      
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
      'dark-primary': '#22d3ee',
      'dark-primary-foreground': '#0f172a',
      'dark-secondary': '#4fd1c5',
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
      primary: '#2563eb',
      'primary-foreground': '#ffffff',
      secondary: '#3b82f6',
      'secondary-foreground': '#ffffff',
      accent: '#60a5fa',
      'accent-foreground': '#0f172a',
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
      ring: '#2563eb',
      chart1: '#2563eb',
      chart2: '#3b82f6',
      chart3: '#60a5fa',
      chart4: '#93c5fd',
      chart5: '#bfdbfe',
      // 暗黑模式颜色
      'dark-primary': '#3b82f6',
      'dark-primary-foreground': '#ffffff',
      'dark-secondary': '#60a5fa',
      'dark-secondary-foreground': '#0f172a',
      'dark-accent': '#93c5fd',
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
      'dark-ring': '#3b82f6',
      'dark-chart-1': '#3b82f6',
      'dark-chart-2': '#60a5fa',
      'dark-chart-3': '#93c5fd',
      'dark-chart-4': '#bfdbfe',
      'dark-chart-5': '#e0e7ff',
    },
  },
  purple: {
    name: 'purple',
    label: '沉光紫',
    colors: {
      // 主要颜色
      primary: '#977AA1',
      'primary-foreground': '#ffffff',
      
      // 次要颜色
      secondary: '#AAA1C8',
      'secondary-foreground': '#ffffff',
      
      // 强调色
      accent: '#d6c6e0',
      'accent-foreground': '#0f172a',
      
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
      muted: '#f5e7e9',
      'muted-foreground': '#957ba1',
      
      // 破坏性操作颜色
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      
      // 边框和输入框
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#977AA1',
      
      // 图表颜色
      chart1: '#977AA1',
      chart2: '#AAA1C8',
      chart3: '#d6c6e0',
      chart4: '#957ba1',
      chart5: '#f5e7e9',
      
      // 暗黑模式颜色
      'dark-primary': '#AAA1C8',
      'dark-primary-foreground': '#0f172a',
      'dark-secondary': '#d6c6e0',
      'dark-secondary-foreground': '#0f172a',
      'dark-accent': '#977AA1',
      'dark-accent-foreground': '#ffffff',
      'dark-background': '#0f172a',
      'dark-foreground': '#f8fafc',
      'dark-card': '#1e293b',
      'dark-card-foreground': '#f8fafc',
      'dark-popover': '#0f172a',
      'dark-popover-foreground': '#f8fafc',
      'dark-muted': '#334155',
      'dark-muted-foreground': '#AAA1C8',
      'dark-destructive': '#f87171',
      'dark-destructive-foreground': '#0f172a',
      'dark-border': '#334155',
      'dark-input': '#1e293b',
      'dark-ring': '#AAA1C8',
      'dark-chart-1': '#AAA1C8',
      'dark-chart-2': '#d6c6e0',
      'dark-chart-3': '#977AA1',
      'dark-chart-4': '#957ba1',
      'dark-chart-5': '#f5e7e9',
    },
  }
};

export const themeList = Object.values(themes);

export const getThemeColors = (themeName: ThemeName) => {
  return themes[themeName] || themes.cyan;
};