#!/bin/bash

# Premium Timetable 一键部署脚本
# 支持多种部署模式：本地、服务器、开发环境

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 帮助信息
show_help() {
    echo -e "${BLUE}Premium Timetable 部署脚本${NC}"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help       显示帮助信息"
    echo "  -l, --local      本地部署模式"
    echo "  -p, --prod       生产环境部署"
    echo "  -d, --dev        开发环境部署"
    echo "  -u, --update     更新镜像并重启"
    echo "  -s, --stop       停止所有服务"
    echo "  -c, --clean      清理所有容器和数据"
    echo "  --logs           查看实时日志"
    echo ""
    echo "示例:"
    echo "  $0 --local      # 本地部署"
    echo "  $0 --prod       # 生产环境部署"
    echo "  $0 --dev        # 开发环境部署"
    echo "  $0 --update     # 更新并重启"
}

# 检查依赖
check_dependencies() {
    local deps=("docker" "docker-compose")
    for dep in "${deps[@]}"; do
        if ! command -v $dep &> /dev/null; then
            echo -e "${RED}错误: $dep 未安装${NC}"
            exit 1
        fi
    done
}

# 检查环境文件
check_env_file() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}警告: .env 文件不存在，创建中...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}请编辑 .env 文件配置必要的环境变量${NC}"
        echo -e "${YELLOW}至少需要配置: DATABASE_URL${NC}"
        exit 1
    fi
}

# 本地部署
local_deploy() {
    echo -e "${GREEN}开始本地部署...${NC}"
    check_dependencies
    check_env_file
    
    docker-compose up -d --build
    
    echo -e "${GREEN}等待服务启动...${NC}"
    sleep 15
    
    if docker-compose ps | grep -q "Up"; then
        echo -e "${GREEN}✅ 本地部署成功！${NC}"
        echo -e "${GREEN}🌐 应用访问: http://localhost:3000${NC}"
        echo -e "${GREEN}🔐 管理后台: http://localhost:3000/admin${NC}"
    else
        echo -e "${RED}❌ 部署失败，查看日志:${NC}"
        docker-compose logs
        exit 1
    fi
}

# 生产部署
prod_deploy() {
    echo -e "${GREEN}开始生产环境部署...${NC}"
    check_dependencies
    check_env_file
    
    # 生产环境优化设置
    export NODE_ENV=production
    
    # 拉取最新镜像
    echo -e "${BLUE}📥 拉取最新镜像...${NC}"
    docker-compose pull
    
    # 构建并启动
    echo -e "${BLUE}🔨 构建应用...${NC}"
    docker-compose up -d --build --force-recreate
    
    # 运行数据库迁移
    echo -e "${BLUE}🗄️ 运行数据库迁移...${NC}"
    docker-compose exec -T app npx prisma migrate deploy
    
    echo -e "${GREEN}✅ 生产环境部署成功！${NC}"
}

# 开发部署
dev_deploy() {
    echo -e "${GREEN}开始开发环境部署...${NC}"
    check_dependencies
    check_env_file
    
    # 开发环境使用开发配置
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    
    echo -e "${GREEN}✅ 开发环境部署成功！${NC}"
    echo -e "${GREEN}🔄 支持热重载，代码修改自动生效${NC}"
}

# 更新部署
update_deploy() {
    echo -e "${GREEN}更新应用...${NC}"
    check_dependencies
    
    # 拉取最新代码
    if [ -d .git ]; then
        echo -e "${BLUE}📥 拉取最新代码...${NC}"
        git pull origin main
    fi
    
    # 更新镜像
    docker-compose pull
    
    # 重建并重启
    docker-compose up -d --build --force-recreate
    
    # 运行迁移
    docker-compose exec -T app npx prisma migrate deploy
    
    echo -e "${GREEN}✅ 更新完成！${NC}"
}

# 停止服务
stop_services() {
    echo -e "${YELLOW}停止所有服务...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ 服务已停止${NC}"
}

# 清理环境
clean_environment() {
    echo -e "${RED}⚠️  警告：这将删除所有容器和数据！${NC}"
    read -p "确定要继续吗? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}清理环境中...${NC}"
        docker-compose down -v --remove-orphans
        docker system prune -af
        echo -e "${GREEN}✅ 环境已清理${NC}"
    else
        echo -e "${YELLOW}取消清理${NC}"
    fi
}

# 查看日志
show_logs() {
    echo -e "${GREEN}查看实时日志...${NC}"
    docker-compose logs -f
}

# 主程序
main() {
    case "${1:-}" in
        -h|--help)
            show_help
            ;;
        -l|--local)
            local_deploy
            ;;
        -p|--prod)
            prod_deploy
            ;;
        -d|--dev)
            dev_deploy
            ;;
        -u|--update)
            update_deploy
            ;;
        -s|--stop)
            stop_services
            ;;
        -c|--clean)
            clean_environment
            ;;
        --logs)
            show_logs
            ;;
        "")
            echo -e "${YELLOW}未指定模式，使用本地部署...${NC}"
            local_deploy
            ;;
        *)
            echo -e "${RED}错误: 未知选项 $1${NC}"
            show_help
            exit 1
            ;;
    esac
}

# 运行主程序
main "$@"