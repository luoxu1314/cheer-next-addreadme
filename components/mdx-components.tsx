'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mt-8 mb-4',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-6 mb-3',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'text-gray-700 dark:text-gray-300 leading-relaxed mb-4',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2',
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'bg-gray-100 dark:bg-gray-800 text-sm rounded px-1 py-0.5 font-mono',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline',
        className
      )}
      {...props}
    />
  ),
  img: ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className={cn('rounded-lg my-4', className)}
      {...props}
      alt={props.alt || ''}
      width={800}
      height={400}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4">
      <table
        className={cn(
          'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
          className
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300',
        className
      )}
      {...props}
    />
  ),
}

export function useMDXComponents() {
  return components
}