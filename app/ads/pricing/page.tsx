import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Users, Target, Clock, Shield } from 'lucide-react'

const pricingPlans = [
  {
    duration: 6,
    price: 20,
    description: "适合短期活动推广",
    features: [
      "绮课首页轮播展示",
      "精准校园用户触达",
      "基础数据分析",
      "微信/QQ技术支持"
    ],
    popular: true
  },
  {
    duration: 12,
    price: 35,
    description: "适合长期品牌建设",
    features: [
      "绮课首页轮播展示",
      "精准校园用户触达",
      "详细数据分析报告",
      "优先技术支持",
      "自定义展示样式",
      "到期提醒服务"
    ],
    popular: false
  }
]

const benefits = [
  {
    icon: Users,
    title: "精准校园用户",
    description: "覆盖全校师生，日均活跃用户1000+"
  },
  {
    icon: Target,
    title: "高转化率",
    description: "校园场景天然适合推广学习、生活类产品"
  },
  {
    icon: Clock,
    title: "即时生效",
    description: "审核通过后立即展示，无需等待"
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "学生团队运营，无中间商赚差价"
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-purple bg-clip-text text-transparent mb-4">
            🚀 绮课校园推广计划
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            用最极客的方式，让你的创意在校园里闪闪发光。我们不玩虚的，
            直接给你最真实的数据和最酷的用户体验。
          </p>
        </div>

        {/* 定价卡片 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <Card key={plan.duration} className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.popular ? 'border-chart-3 shadow-lg shadow-chart-3/20' : 'border-border hover:border-chart-3/40'
            }`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chart-3 text-primary-foreground">
                  最受欢迎
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">
                  {plan.duration}个月套餐
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-purple bg-clip-text text-transparent">¥{plan.price}</span>
                  <span className="text-muted-foreground"> / {plan.duration}个月</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-chart-4 mr-2" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular ? 'gradient-purple' : 'border-chart-3 text-chart-3 hover:bg-chart-3/10'
                  }`} 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="mailto:contact@qike.app?subject=绮课推广合作咨询">
                    立即咨询
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 为什么选择我们 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-purple bg-clip-text text-transparent">
            为什么选择绮课？
n          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-border hover:border-chart-3/40 transition-colors">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-chart-4 mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 流程说明 */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              超简单合作流程
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-1">联系我们</h3>
                <p className="text-sm text-gray-600">发送邮件描述需求</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-1">内容确认</h3>
                <p className="text-sm text-gray-600">24小时内回复确认</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-1">支付费用</h3>
                <p className="text-sm text-gray-600">支持微信/支付宝</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-1">立即上线</h3>
                <p className="text-sm text-gray-600">审核通过后展示</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系方式 */}
        <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4">
              准备开始了吗？
            </h2>
            <p className="text-gray-600 mb-6">
              发送邮件到 contact@qike.app，我们会在24小时内回复你！
              <br />
              记得附上你的推广内容和期望的展示时间哦～
            </p>
            <Button size="lg" asChild>
              <Link href="mailto:contact@qike.app?subject=绮课推广合作咨询&body=你好，我对绮课的校园推广服务很感兴趣。%0D%0A%0D%0A推广内容：%0D%0A期望时间：%0D%0A联系方式：">
                📧 立即发送邮件
              </Link>
            </Button>
          </div>
      </div>
    </div>
  )
}