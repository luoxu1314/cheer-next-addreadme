export interface FooterLink {
  href: string;
  label: string;
}

export interface FriendlyLink {
  href: string;
  label: string;
}

export interface FooterConfig {
  brand: {
    name: string;
    description: string;
    slogan: string;
  };
  quickLinks: FooterLink[];
  friendlyLinks: FriendlyLink[];
  copyright: string;
  platformName: string;
}

export const footerConfig: FooterConfig = {
  brand: {
    name: '绮课',
    description: '绮课是专为中南大学师生打造的课程表查询平台，致力于提供便捷、准确、实时的课表查询服务。',
    slogan: '用心服务每一位中南人'
  },
  quickLinks: [
    {
      href: '/',
      label: '首页'
    },
    {
      href: '/search/student',
      label: '学生课表'
    },
    {
      href: '/search/teacher',
      label: '教师课表'
    },
    {
      href: '/search/classroom',
      label: '教室课表'
    },
    {
      href: '/ads/pricing',
      label: '广告合作'
    }
  ],
  friendlyLinks: [
    {
      href: 'https://huayemao.run',
      label: '花野猫的数字花园'
    },
    {
      href: 'https://www.54sher.com/',
      label: '中南大学校团委网络信息部（升华工作室）'
    },
    {
      href: 'http://csujwc.its.csu.edu.cn/',
      label: '中南大学教务系统'
    }
  ],
  copyright: '© {year} 绮课. All rights reserved.',
  platformName: '中南大学课程表查询平台'
};