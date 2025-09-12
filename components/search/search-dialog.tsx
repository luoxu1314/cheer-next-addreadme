"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2, User, Users, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { searchAction, type SearchResult } from "@/lib/actions/search";

interface SearchDialogProps {
  // 可选的初始查询参数
  initialQuery?: string;
}

export function SearchDialog({ initialQuery }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 当对话框打开时，自动聚焦到搜索输入框
  useEffect(() => {
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      // 获取所有类型的搜索结果
      const results = await searchAction(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("搜索失败:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // 导航到对应的课程表页面
    window.location.href = `/table/${result.type}/${result.id}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 根据类型获取对应的图标
  const getIconForType = (resultType: string) => {
    switch (resultType) {
      case 'student':
        return <User className="h-4 w-4 mr-2" />;
      case 'teacher':
        return <Users className="h-4 w-4 mr-2" />;
      case 'location':
        return <Building2 className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  // 根据类型获取对应的中文名称
  const getTypeLabel = (resultType: string) => {
    switch (resultType) {
      case 'student':
        return "学生";
      case 'teacher':
        return "教师";
      case 'location':
        return "教室";
      default:
        return "未知";
    }
  };

  // 清除搜索结果
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">搜索</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent dark:from-primary dark:to-accent bg-clip-text text-transparent">
            快速搜索
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            输入学号、姓名或教室名称查找相关信息
          </p>
        </DialogHeader>
        
        {/* 搜索输入框 */}
        <div className="p-6">
          <div className="relative flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground absolute left-3" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="请输入搜索关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-12 py-6 text-lg"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">清除</span>
              </Button>
            )}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="min-w-[120px] bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  搜索中...
                </>
              ) : (
                "立即搜索"
              )}
            </Button>
          </div>
        </div>
        
        {/* 搜索结果区域 */}
        <div className="mt-2 border-t">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              <Loader2 className="inline h-5 w-5 animate-spin mr-2" />
              正在搜索，请稍候...
            </div>
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="px-6 py-4 hover:bg-accent/30 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center">
                      {getIconForType(result.type)}
                      <div>
                        <div className="font-medium text-foreground">{result.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.label || ""} • {getTypeLabel(result.type)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm px-2 py-1 rounded-full bg-secondary">
                      {getTypeLabel(result.type)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-lg font-medium">未找到相关结果</p>
                <p className="mt-2 text-sm">请尝试其他关键词或检查拼写</p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>请输入关键词并点击搜索按钮</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}