import { NextRequest, NextResponse } from 'next/server'
import { getConfigsByGroup, batchSetConfigs } from '@/lib/server/config-service'
import { authAdmin } from '@/lib/server/auth'

/**
 * 获取配置项列表或按分组获取配置项
 * GET /api/config?group=groupName
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const group = url.searchParams.get('group')
    
    // 检查是否需要管理员权限
    const needAuth = checkIfConfigGroupNeedsAuth(group || '')
    if (needAuth) {
      const admin = await authAdmin(request)
      if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
    
    // 如果指定了分组，则获取该分组下的所有配置项
    if (group) {
      const configs = await getConfigsByGroup(group)
      return NextResponse.json(configs)
    }
    
    // 如果没有指定分组，这里可以返回公开的配置项或要求指定分组
    // 为了安全起见，默认不返回所有配置项
    return NextResponse.json({ error: 'Group parameter is required' }, { status: 400 })
  } catch (error) {
    console.error('Error fetching configs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * 批量更新配置项
 * POST /api/config
 */
export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const admin = await authAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const configs = await request.json()
    
    // 验证请求数据
    if (!Array.isArray(configs)) {
      return NextResponse.json({ error: 'Request body must be an array' }, { status: 400 })
    }
    
    // 验证每个配置项
    for (const config of configs) {
      if (!config.key || config.value === undefined || config.value === null || !config.type || !config.group) {
        return NextResponse.json({ error: 'Missing required fields in config items' }, { status: 400 })
      }
    }
    
    const result = await batchSetConfigs(configs)
    
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('Error batch updating configs:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 400 })
  }
}

/**
 * 检查配置项分组是否需要管理员权限
 * 这里可以根据实际需求定义哪些配置分组需要权限
 */
function checkIfConfigGroupNeedsAuth(group: string): boolean {
  // 示例：除了公开配置分组外，其他都需要权限
  const publicGroups = ['public', 'home'] // 可根据实际情况扩展
  return !publicGroups.includes(group)
}