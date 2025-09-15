// 简单的定时任务检查脚本
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkExpiredAds() {
  try {
    const now = new Date()
    
    const result = await prisma.blogPost.updateMany({
      where: {
        isAd: true,
        adStatus: 'active',
        adEndDate: { lt: now }
      },
      data: {
        adStatus: 'expired',
        published: false
      }
    })

    console.log(`已更新 ${result.count} 个过期广告`)
    
    return result.count
  } catch (error) {
    console.error('检查过期广告失败:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  checkExpiredAds()
    .then(count => {
      console.log(`任务完成，处理了 ${count} 个过期广告`)
      process.exit(0)
    })
    .catch(error => {
      console.error('任务失败:', error)
      process.exit(1)
    })
}

module.exports = { checkExpiredAds }