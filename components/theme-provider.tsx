"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { ThemeName, themes } from "@/lib/theme-config";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  defaultTheme?: ThemeName;
}

export function ThemeProvider({
  children,
  defaultTheme = "cyan",
  ...props
}: ExtendedThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("colorTheme") as ThemeName;

    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const themeColors = themes[theme];
    const root = document.documentElement;

    // 根据暗黑模式状态选择颜色
    const getColorVar = (key: string) => {
      return themeColors.colors[key];
    };

    // 设置所有颜色变量
    const colorKeys = [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "muted",
      "muted-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ];

    let normalCss = "";
    let darkModeCSS = "";
    colorKeys.forEach((key) => {
      const value = getColorVar(key);
      const darkKey = `dark-${key}`;
      const darkValue = getColorVar(darkKey);
      // 设置亮色模式图表颜色
      if (value) {
        normalCss += `  --${key}: ${value};\n`;
      }
      // 收集暗黑模式图表颜色
      if (darkValue) {
        darkModeCSS += `  --${key}: ${darkValue};\n`;
      }
    });

    // 设置暗黑模式CSS规则
    const fullDarkRule = `:root.dark {\n${darkModeCSS}}`;
    const fullNormalRule = `:root {\n${normalCss}}`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = fullNormalRule + "\n" + fullDarkRule;
    document.head.appendChild(styleSheet);

    // 设置图表颜色
    const chartKeys = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];
    chartKeys.forEach((key, index) => {
      const value = getColorVar(`chart${index + 1}`);
      if (value) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    // 将十六进制颜色转换为RGB并设置RGB变量
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const primaryColor = getColorVar("primary");
    const secondaryColor = getColorVar("secondary");
    const accentColor = getColorVar("accent");

    const primaryRgb = hexToRgb(primaryColor);
    const secondaryRgb = hexToRgb(secondaryColor);
    const accentRgb = hexToRgb(accentColor);

    root.style.setProperty(
      "--primary-rgb",
      `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
    );
    root.style.setProperty(
      "--secondary-rgb",
      `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
    );
    root.style.setProperty(
      "--accent-rgb",
      `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`
    );

    localStorage.setItem("colorTheme", theme);
  }, [theme, mounted]);

  const handleSetTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
      }}
    >
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  );
}
