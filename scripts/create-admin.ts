#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';

const prisma = new PrismaClient();
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('🚀 创建管理员账户...\n');

    const username = await question('请输入用户名 (默认: admin): ');
    const email = await question('请输入邮箱: ');
    const password = await question('请输入密码: ');

    if (!email || !password) {
      console.error('❌ 邮箱和密码不能为空');
      process.exit(1);
    }

    // 检查是否已存在管理员
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: (username || 'admin').trim() }
        ]
      }
    });

    if (existingAdmin) {
      console.error('❌ 已存在相同邮箱或用户名的管理员');
      process.exit(1);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建管理员
    const admin = await prisma.admin.create({
      data: {
        username: (username || 'admin').trim(),
        password: hashedPassword,
      },
    });

    console.log('\n✅ 管理员账户创建成功！');
    console.log(`👤 用户名: ${admin.username}`);

    console.log(`\n🔗 访问地址: http://localhost:3000/admin/login`);

  } catch (error) {
    console.error('❌ 创建管理员失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

// 执行创建管理员
createAdmin();