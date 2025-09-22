import { cn } from '@/lib/utils';
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/**
 * 可复用的页面标题组件
 * 用于统一网站各页面的标题区样式
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className,
  titleClassName = 'text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-primary-foreground dark:text-white',
  descriptionClassName = 'text-lg opacity-90 max-w-2xl text-primary-foreground dark:text-white/90',
}) => {
  return (
    <div className={cn('gradient-blue-lavender py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <h1 className={titleClassName}>{title}</h1>
        <p className={descriptionClassName}>
          {description}
        </p>
      </div>
    </div>
  );
};