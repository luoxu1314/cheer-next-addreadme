"use client";

import { useState } from "react";
import { Settings, X, Calendar, Clock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SettingsSidebarProps {
  showWeekend: boolean;
  onShowWeekendChange: (show: boolean) => void;
  firstColumnMode: "time" | "index";
  onFirstColumnModeChange: (mode: "time" | "index") => void;
}

export function SettingsSidebar({
  showWeekend,
  onShowWeekendChange,
  firstColumnMode,
  onFirstColumnModeChange,
}: SettingsSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-20 right-4 z-40 bg-white/80 backdrop-blur-md border-white/50 shadow-lg rounded-full hover:bg-white/90 transition-all duration-200"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 bg-white/95 backdrop-blur-md border-l border-white/20">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>显示设置</span>
          </SheetTitle>
          <SheetDescription>
            自定义课表的显示方式
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* 显示天数设置 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">显示天数</h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-slate-600" />
                <div>
                  <Label htmlFor="weekend-mode" className="text-sm font-medium">
                    显示周末
                  </Label>
                  <p className="text-xs text-slate-500">
                    在课表中显示周六和周日
                  </p>
                </div>
              </div>
              <Switch
                id="weekend-mode"
                checked={showWeekend}
                onCheckedChange={onShowWeekendChange}
              />
            </div>
          </div>

          <Separator />

          {/* 第一列显示模式 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">第一列显示</h3>
            <RadioGroup
              value={firstColumnMode}
              onValueChange={(value) => onFirstColumnModeChange(value as "time" | "index")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value="time" id="time-mode" />
                <div className="flex items-center space-x-2 flex-1">
                  <Clock className="h-4 w-4 text-slate-600" />
                  <Label htmlFor="time-mode" className="cursor-pointer">
                    <div className="text-sm font-medium">时间显示</div>
                    <p className="text-xs text-slate-500">显示具体时间范围</p>
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value="index" id="index-mode" />
                <div className="flex items-center space-x-2 flex-1">
                  <Eye className="h-4 w-4 text-slate-600" />
                  <Label htmlFor="index-mode" className="cursor-pointer">
                    <div className="text-sm font-medium">序号显示</div>
                    <p className="text-xs text-slate-500">显示节次数（1-12节）</p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* 主题设置 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">主题设置</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                🌅 浅色主题
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                🌙 深色主题
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                size="sm"
              >
                🔄 跟随系统
              </Button>
            </div>
          </div>

          <Separator />

          {/* 关于信息 */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              绮课 v1.0.0
              <br />
              中南大学课程表查询平台
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
