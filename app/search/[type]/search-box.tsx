'use client'

import { SearchComponent } from '@/components/shared/search/search-component';
import { SearchUI } from '@/components/shared/search/search-ui';

interface TypeSpecificSearchBoxProps {
  type: string;
  initialQuery?: string;
}

// 类型特定的搜索组件
export function TypeSpecificSearchBox({ type, initialQuery }: TypeSpecificSearchBoxProps) {
  const searchData = SearchComponent({
    type,
    initialQuery,
    showTabs: false,
  });

  return (
    <SearchUI
      {...searchData}
      compact={true}
    />
  );
}