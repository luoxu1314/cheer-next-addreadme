import { useState, useRef, useEffect } from 'react';
import { Search, X, User, Users, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchAction, type SearchResult } from '@/lib/actions/search';
import { useRouter } from 'next/navigation';

interface SearchComponentProps {
  type?: string;
  initialQuery?: string;
  showTabs?: boolean;
  onSearchComplete?: (results: SearchResult[]) => void;
  customPlaceholder?: string;
}

// 通用搜索组件
export function SearchComponent({ 
  type = 'all', 
  initialQuery = '', 
  showTabs = false, 
  onSearchComplete,
  customPlaceholder 
}: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
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
      setSearchResults(results);
      
      // 如果提供了回调函数，调用它
      if (onSearchComplete) {
        onSearchComplete(results);
      }
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
      case 'profession':
        return <Users className="h-4 w-4 mr-2" />;
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
      case 'profession':
        return '专业';
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
    if (customPlaceholder) {
      return {
        placeholder: customPlaceholder,
        description: '输入关键词查找相关信息'
      };
    }

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
      case 'profession':
        return {
          placeholder: '请输入专业名称...',
          description: '输入专业名称查找专业课程信息'
        };
      default:
        return {
          placeholder: '请输入搜索关键词...',
          description: '输入关键词查找相关信息'
        };
    }
  };

  const typeSpecificText = getTypeSpecificText();

  // 过滤搜索结果
  const filteredResults = showTabs 
    ? searchResults.filter(result => {
        if (activeTab === 'all') return true;
        return result.type === activeTab;
      })
    : type === 'all'
    ? searchResults
    : searchResults.filter(result => result.type === type);

  return {
    // 状态
    searchQuery,
    setSearchQuery,
    isLoading,
    hasSearched,
    searchResults,
    filteredResults,
    activeTab,
    setActiveTab,
    searchInputRef,
    
    // 方法
    handleSearch,
    handleKeyPress,
    handleResultSelect,
    clearSearch,
    getIconForType,
    getTypeLabel,
    
    // 辅助数据
    typeSpecificText
  };
}