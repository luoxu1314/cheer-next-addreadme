'use client'

import { useState, useRef, useEffect } from 'react';
import { Search, X, User, Users, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchAction, type SearchResult } from '@/lib/actions/search';
import { useRouter } from 'next/navigation';

interface TypeSpecificSearchBoxProps {
  type: string;
  initialQuery?: string;

}

// 类型特定的搜索组件
export function TypeSpecificSearchBox({ type, initialQuery }: TypeSpecificSearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 当组件加载时，如果有初始查询参数，自动执行搜索
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      // 获取所有类型的搜索结果
      const results = await searchAction(searchQuery);
      // 根据当前页面类型过滤结果
      const filteredResults = type === 'all'
        ? results
        : results.filter(result => result.type === type);

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    // 这里可以添加导航到结果详情页的逻辑

    router.push(`/table/${result.type}/${result.id}`);
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
        return '学生';
      case 'teacher':
        return '教师';
      case 'location':
        return '教室';
      default:
        return '未知';
    }
  };

  // 清除搜索结果
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };



  // 获取类型特定的提示文本
  const getTypeSpecificText = () => {
    switch (type) {
      case 'student':
        return {
          placeholder: '请输入学号或姓名...',
          description: '输入学号或姓名查找学生信息'
        };
      case 'teacher':
        return {
          placeholder: '请输入教师姓名...',
          description: '输入教师姓名查找教师信息'
        };
      case 'location':
        return {
          placeholder: '请输入教室名称...',
          description: '输入教室名称查找教室信息'
        };
      default:
        return {
          placeholder: '请输入搜索关键词...',
          description: '输入关键词查找相关信息'
        };
    }
  };

  const typeSpecificText = getTypeSpecificText();

  return (
    <>
      <div className="relative">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={typeSpecificText.placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pr-12 text-lg"
        />

        <Button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>

        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-10 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">清除</span>
          </Button>
        )}
      </div>

      {/* 搜索结果区域 */}
      {hasSearched && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              <Loader2 className="inline h-5 w-5 animate-spin mr-2" />
              正在搜索，请稍候...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultSelect(result)}
                  className="px-6 py-4 hover:bg-accent/30 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center">
                    {getIconForType(result.type)}
                    <div>
                      <div className="font-medium text-foreground">{result.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.label || ''} • {getTypeLabel(result.type)}
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
            <div className="p-6 text-center text-muted-foreground">
              <p className="text-lg font-medium">未找到相关结果</p>
              <p className="mt-2 text-sm">请尝试其他关键词或检查拼写</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}