"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// 配置项类型定义
interface ConfigItem {
  key: string;
  value: any;
  description?: string;
  type: string;
  group: string;
}

// 配置分组定义
const configGroups = {
  general: "基本配置",
  home: "首页配置",
  ads: "广告配置",
  advanced: "高级配置",
};

export function ConfigManagement() {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState("home");
  const [editingConfig, setEditingConfig] = useState<ConfigItem | null>(null);
  
  // 初始化配置项
  const defaultConfigs: ConfigItem[] = [
    {
      key: "home.showAds",
      value: true,
      description: "是否在首页显示广告轮播",
      type: "boolean",
      group: "home"
    },
    {
      key: "home.maxAdCount",
      value: 5,
      description: "首页最大显示广告数量",
      type: "number",
      group: "home"
    },
    {
      key: "ads.autoRotate",
      value: true,
      description: "是否自动轮播广告",
      type: "boolean",
      group: "ads"
    },
    {
      key: "ads.rotateInterval",
      value: 5000,
      description: "广告轮播间隔时间(毫秒)",
      type: "number",
      group: "ads"
    }
  ];

  useEffect(() => {
    fetchConfigs();
  }, [currentGroup]);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/config?group=${currentGroup}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        return;
      }

      const data = await response.json();
      
      // 如果没有配置项，使用默认配置
      if (!Array.isArray(data) || data.length === 0) {
        const groupDefaults = defaultConfigs.filter(config => config.group === currentGroup);
        setConfigs(groupDefaults);
      } else {
        setConfigs(data);
      }
    } catch (error) {
      console.error('获取配置项失败:', error);
      toast.error('获取配置项失败');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (key: string, value: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = configs.find(c => c.key === key);
      
      if (!config) return;
      
      const response = await fetch(`/api/config/${key}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...config,
          value
        })
      });

      if (response.ok) {
        const updatedConfig = await response.json();
        setConfigs(configs.map(c => c.key === key ? updatedConfig : c));
        toast.success('配置已更新');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || '更新配置失败');
      }
    } catch (error) {
      console.error('更新配置失败:', error);
      toast.error('更新配置失败');
    }
  };

  const handleConfigChange = (key: string, value: any) => {
    updateConfig(key, value);
  };

  const renderConfigInput = (config: ConfigItem) => {
    switch (config.type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={config.key}
              checked={Boolean(config.value)}
              onCheckedChange={(checked) => handleConfigChange(config.key, checked)}
            />
            <Label htmlFor={config.key} className="sr-only">
              {config.description}
            </Label>
          </div>
        );
      case 'number':
        return (
          <Input
            id={config.key}
            type="number"
            value={Number(config.value)}
            onChange={(e) => handleConfigChange(config.key, Number(e.target.value))}
            className="w-32"
          />
        );
      case 'string':
        return (
          <Input
            id={config.key}
            value={String(config.value)}
            onChange={(e) => handleConfigChange(config.key, e.target.value)}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={config.key}
            value={String(config.value)}
            onChange={(e) => handleConfigChange(config.key, e.target.value)}
            className="min-h-[100px]"
          />
        );
      default:
        return (
          <Input
            id={config.key}
            value={String(config.value)}
            onChange={(e) => handleConfigChange(config.key, e.target.value)}
          />
        );
    }
  };

  const getConfigDisplayName = (key: string): string => {
    // 从键名生成显示名称，移除前缀部分
    const parts = key.split('.');
    return parts[parts.length - 1]
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>系统配置</CardTitle>
        <CardDescription>管理系统全局配置选项</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentGroup} onValueChange={setCurrentGroup} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {Object.entries(configGroups).map(([key, label]) => (
              <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(configGroups).map((group) => (
            <TabsContent key={group} value={group}>
              {loading ? (
                <div className="py-8 text-center">加载配置中...</div>
              ) : (
                <div className="space-y-4">
                  {configs.map((config) => (
                    <div key={config.key} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 rounded-lg border bg-card">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{getConfigDisplayName(config.key)}</h4>
                        {config.description && (
                          <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderConfigInput(config)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}