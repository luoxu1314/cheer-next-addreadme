"use client";

import { useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SearchComponent } from "@/components/shared/search/search-component";
import { SearchUI } from "@/components/shared/search/search-ui";

interface SearchDialogProps {
  // 可选的初始查询参数
  initialQuery?: string;
  // 可选的自定义触发器内容
  customTrigger?: React.ReactNode;
}

export function SearchDialog({ initialQuery, customTrigger }: SearchDialogProps) {
  const searchData = SearchComponent({
    type: 'all',
    initialQuery,
    showTabs: false
  });

  // 当对话框打开时，自动聚焦到搜索输入框
  useEffect(() => {
    if (searchData.searchInputRef.current) {
      setTimeout(() => {
        searchData.searchInputRef.current?.focus();
      }, 100);
    }
  }, []);

  // 默认触发器
  const defaultTrigger = (
    <Button variant="ghost" size="icon" className="relative">
      <Search className="h-5 w-5 text-muted-foreground" />
      <span className="sr-only">搜索</span>
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {customTrigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            快速搜索
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            输入学号、姓名、教室或专业名称查找相关信息
          </p>
        </DialogHeader>
        
        {/* 搜索输入框 */}
        <div className="p-6">
            <SearchUI
              {...searchData}
              compact={true}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}