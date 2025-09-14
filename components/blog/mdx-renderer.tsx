'use client'

import { MDXProvider } from '@mdx-js/react'
import { useMDXComponents } from '@/components/mdx-components'

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const components = useMDXComponents()

  return (
    <MDXProvider components={components}>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </MDXProvider>
  )
}