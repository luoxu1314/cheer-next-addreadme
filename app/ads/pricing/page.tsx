import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Users, Target, Clock, Shield } from 'lucide-react'
import { adsConfig } from '@/lib/config/ads.config'

// 动态导入图标组件
const IconMap = {
  Users,
  Target,
  Clock,
  Shield
};

// 动态图标组件
const DynamicIcon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const IconComponent = IconMap[name as keyof typeof IconMap];
  if (!IconComponent) return null;
  return <IconComponent {...props}></IconComponent>
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-12 pt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-purple text-primary-foreground mb-4">
            {adsConfig.pricingPage.header.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {adsConfig.pricingPage.header.subtitle}
          </p>
        </div>

        {/* 定价卡片 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {adsConfig.pricingPage.plans.map((plan) => (
            <Card key={plan.duration} className={`relative transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-chart-3 shadow-lg shadow-chart-3/20' : 'border-border hover:border-chart-3/40'
              }`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chart-3 text-primary-foreground">
                  最受欢迎
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  {plan.duration}个月套餐
                </CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
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
                  className={`w-full ${plan.popular ? 'gradient-purple text-primary-foreground' : 'border-chart-3 text-chart-3 hover:bg-chart-3/10'}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={`mailto:${adsConfig.pricingPage.contact.email}?subject=${adsConfig.pricingPage.contact.emailSubject}`}>
                    {plan.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 为什么选择我们 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-purple bg-clip-text text-transparent">
            {adsConfig.pricingPage.whyChoose.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adsConfig.pricingPage.benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-border hover:border-chart-3/40 transition-colors">
                <CardHeader>
                  <DynamicIcon name={benefit.icon} className="h-12 w-12 text-chart-4 mx-auto mb-4" />
                  <CardTitle className="text-lg text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 流程说明 */}
        <Card className="mb-16 border-border">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center text-foreground">
              <Zap className="h-6 w-6 mr-2 text-chart-4" />
              {adsConfig.pricingPage.process.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {adsConfig.pricingPage.process.steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-accent font-bold">{step.number}</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 联系方式 */}
        <div className="text-center">
          <div className="text-6xl mb-4">{adsConfig.pricingPage.contact.emoji}</div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {adsConfig.pricingPage.contact.title}
          </h2>
          <p className="text-muted-foreground mb-6 whitespace-pre-line">
            {adsConfig.pricingPage.contact.description}
          </p>
          <Button size="lg" className="gradient-purple text-primary-foreground" asChild>
            <Link href={`mailto:${adsConfig.pricingPage.contact.email}?subject=${adsConfig.pricingPage.contact.emailSubject}&body=${adsConfig.pricingPage.contact.emailBody}`}>
              {adsConfig.pricingPage.contact.buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}