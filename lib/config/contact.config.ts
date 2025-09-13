export interface ContactConfig {
  email: string;
  github: string;
  qqGroups: {
    name: string;
    number: string;
    link?: string;
  }[];
}

export const contactConfig: ContactConfig = {
  email: 'huayemao4o@outlook.com',
  github: 'https://github.com/huayemao/cheer-next',
  qqGroups: [
    {
      name: '绮课用户QQ群',
      number: '1157682866',
      link: 'https://qm.qq.com/q/Z8tLiFJzCk'
    },
    {
      name: '绮课用户QQ群2',
      number: '892360730',
      link: 'https://qm.qq.com/q/dSso71mByM'
    },
    // {
    //   name: '技术讨论QQ群',
    //   number: '987654321',
    //   link: 'https://qm.qq.com/cgi-bin/qm/qr?k=example2'
    // },
  ]
};