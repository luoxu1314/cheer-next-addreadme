'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, RefreshCcw, User } from 'lucide-react'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaSvg, setCaptchaSvg] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // 初始化时加载验证码
  useEffect(() => {
    loadCaptcha()
  }, [])

  // 加载验证码
  const loadCaptcha = async () => {
    try {
      const response = await fetch('/api/captcha')
      const data = await response.json()
      
      setCaptchaToken(data.token)
      setCaptchaSvg(data.pngBase64)
      setCaptchaInput('')
    } catch (error) {
      console.error('加载验证码失败:', error)
      setError('加载验证码失败，请稍后重试')
    }
  }

  // 刷新验证码
  const handleRefreshCaptcha = async () => {
    setError('')
    await loadCaptcha()
  }

  // 验证验证码
  const validateCaptcha = async () => {
    try {
      const response = await fetch('/api/captcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: captchaToken, code: captchaInput }),
      })
      
      const data = await response.json()
      
      if (!data.valid) {
        // 验证码验证失败，重新加载验证码
        await loadCaptcha()
        throw new Error('验证码错误或已过期')
      }
      
      return true
    } catch (error) {
      console.error('验证验证码失败:', error)
      setError(error instanceof Error ? error.message : '验证码验证失败')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 验证验证码
      const isCaptchaValid = await validateCaptcha()
      if (!isCaptchaValid) {
        return
      }

      // 提交登录请求
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
      } else {
        // 登录失败，重新加载验证码
        await loadCaptcha()
        setError(data.error || '登录失败')
      }
    } catch (error) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">管理员登录</CardTitle>
          <CardDescription className="text-center">
            请输入您的凭据以访问管理后台
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha">验证码</Label>
              <div className="flex gap-2">
                <Input
                  id="captcha"
                  type="text"
                  placeholder="请输入验证码"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1"
                  required
                />
                <div className="relative h-10 flex items-center justify-center">
                  <img 
                    src={captchaSvg} 
                    alt="验证码" 
                    className="h-full rounded border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={handleRefreshCaptcha}
                  />
                  <button 
                    type="button"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={handleRefreshCaptcha}
                    aria-label="刷新验证码"
                  >
                    <RefreshCcw className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}