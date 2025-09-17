export interface AdsConfig {
  mainPage: {
    title: string;
    subtitle: string;
    ctaButton: string;
    emptyState: {
      emoji: string;
      title: string;
      description: string;
      buttonText: string;
    };
  };
  pricingPage: {
    header: {
      title: string;
      subtitle: string;
    };
    plans: {
      duration: number;
      price: number;
      description: string;
      features: string[];
      popular: boolean;
      buttonText: string;
    }[];
    benefits: {
      icon: string;
      title: string;
      description: string;
    }[];
    whyChoose: {
      title: string;
    };
    process: {
      title: string;
      steps: {
        number: number;
        title: string;
        description: string;
      }[];
    };
    contact: {
      emoji: string;
      title: string;
      description: string;
      buttonText: string;
      email: string;
      emailSubject: string;
      emailBody: string;
    };
  };
}

export const adsConfig: AdsConfig = {
  mainPage: {
    title: "绮课推广",
    subtitle: "发现校园里的精彩创意和优质推广内容",
    ctaButton: "投放广告",
    emptyState: {
      emoji: "🎯",
      title: "暂无推广内容",
      description: "目前还没有活跃的推广内容，敬请期待！",
      buttonText: "成为第一个推广者",
    },
  },
  pricingPage: {
    header: {
      title: "🚀 绮课校园推广计划",
      subtitle: "用最极客的方式，让你的创意在校园里闪闪发光。我们不玩虚的，直接给你最真实的数据和最酷的用户体验。",
    },
    plans: [
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
        popular: true,
        buttonText: "立即咨询",
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
        popular: false,
        buttonText: "立即咨询",
      },
    ],
    benefits: [
      {
        icon: "Users",
        title: "精准校园用户",
        description: "覆盖全校师生，日均活跃用户1000+",
      },
      {
        icon: "Target",
        title: "高转化率",
        description: "校园场景天然适合推广学习、生活类产品",
      },
      {
        icon: "Clock",
        title: "即时生效",
        description: "审核通过后立即展示，无需等待",
      },
      {
        icon: "Shield",
        title: "安全可靠",
        description: "学生团队运营，无中间商赚差价",
      },
    ],
    whyChoose: {
      title: "为什么选择绮课？",
    },
    process: {
      title: "超简单合作流程",
      steps: [
        {
          number: 1,
          title: "联系我们",
          description: "发送邮件描述需求",
        },
        {
          number: 2,
          title: "内容确认",
          description: "24小时内回复确认",
        },
        {
          number: 3,
          title: "支付费用",
          description: "支持微信/支付宝",
        },
        {
          number: 4,
          title: "立即上线",
          description: "审核通过后展示",
        },
      ],
    },
    contact: {
      emoji: "🎯",
      title: "准备开始了吗？",
      description: "发送邮件到 contact@qike.app，我们会在24小时内回复你！\n记得附上你的推广内容和期望的展示时间哦～",
      buttonText: "📧 立即发送邮件",
      email: "contact@qike.app",
      emailSubject: "绮课推广合作咨询",
      emailBody: "你好，我对绮课的校园推广服务很感兴趣。%0D%0A%0D%0A推广内容：%0D%0A期望时间：%0D%0A联系方式：",
    },
  },
};