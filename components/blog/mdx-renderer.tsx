'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState, useRef } from 'react'
import { createHighlighter } from 'shiki'

interface MDXRendererProps {
  content: string
}

// 代码块组件
function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [highlightedCode, setHighlightedCode] = useState('')
  const [copied, setCopied] = useState(false)
  
  const language = className?.replace('language-', '') || 'text'
  
  useEffect(() => {
    async function highlightCode() {
      try {
        const highlighter = await createHighlighter({
          themes: ['github-dark'],
          langs: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'json', 'bash', 'python', 'java', 'csharp', 'php', 'go', 'rust', 'sql', 'markdown', 'yaml', 'html']
        })
        
        const html = highlighter.codeToHtml(children, {
          lang: language === 'text' ? 'plaintext' : language,
          theme: 'github-dark'
        })
        
        setHighlightedCode(html)
      } catch (error) {
        console.warn('Shiki highlighting failed:', error)
        // 回退到纯文本
        setHighlightedCode(`<pre><code>${children}</code></pre>`)
      }
    }
    
    highlightCode()
  }, [children, language])
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative my-6">
      <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
        <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2 py-1 rounded transition-colors"
        >
          {copied ? '已复制!' : '复制'}
        </button>
      </div>
      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-border"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  )
}

// 内联代码组件
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-sm rounded px-1.5 py-0.5 font-mono text-accent border border-border">
      {children}
    </code>
  )
}

// MDX 组件映射
const components = {
  pre: (props: any) => <div {...props} />,
  code: CodeBlock,
  inlineCode: InlineCode,
  h1: (props: any) => <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-6 border-b border-border pb-3" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4 border-b border-border pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold tracking-tight text-foreground mt-8 mb-3 border-b border-border pb-2" {...props} />,
  p: (props: any) => <p className="text-muted-foreground leading-relaxed mb-4 text-base" {...props} />,
  a: (props: any) => <a className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary transition-all duration-200" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-muted-foreground" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6 bg-muted/50 p-4 rounded-r-lg" {...props} />,
  img: (props: any) => <img className="rounded-xl shadow-lg my-8 max-w-full h-auto mx-auto border border-border" {...props} />,
  table: (props: any) => <table className="min-w-full divide-y divide-border border border-border rounded-lg overflow-hidden shadow-sm my-8" {...props} />,
  th: (props: any) => <th className="px-4 py-3 bg-muted text-left text-sm font-semibold text-foreground border-b border-border" {...props} />,
  td: (props: any) => <td className="px-4 py-3 text-sm text-foreground border-b border-border" {...props} />,
  hr: (props: any) => <hr className="my-8 border-border" {...props} />,
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function compileMDX() {
      try {
        setIsLoading(true)
        const serialized = await serialize(content, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        })
        setMdxSource(serialized)
        setError(null)
      } catch (err) {
        console.error('Error compiling MDX:', err)
        setError('内容渲染出错，请稍后重试')
      } finally {
        setIsLoading(false)
      }
    }

    if (content) {
      compileMDX()
    }
  }, [content])

  if (isLoading) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (!mdxSource) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground">暂无内容</p>
      </div>
    )
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}