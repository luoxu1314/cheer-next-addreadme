#!/bin/bash

# Docker 部署脚本
set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始部署 绮课 应用...${NC}"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}错误: Docker 未安装${NC}"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}错误: Docker Compose 未安装${NC}"
    exit 1
fi

# 检查 .env 文件是否存在
if [ ! -f .env ]; then
    echo -e "${YELLOW}警告: .env 文件不存在，使用 .env.example 作为模板${NC}"
    cp .env.example .env
    echo -e "${YELLOW}请编辑 .env 文件配置必要的环境变量${NC}"
    exit 1
fi

# 拉取最新镜像
echo -e "${GREEN}拉取最新 Docker 镜像...${NC}"
docker-compose pull

# 构建应用镜像
echo -e "${GREEN}构建应用镜像...${NC}"
docker-compose build --no-cache

# 启动服务
echo -e "${GREEN}启动服务...${NC}"
docker-compose up -d

# 等待服务启动
echo -e "${GREEN}等待服务启动...${NC}"
sleep 10

# 检查服务状态
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}服务启动成功！${NC}"
    echo -e "${GREEN}应用访问地址: http://localhost:3000${NC}"
else
    echo -e "${RED}服务启动失败，请检查日志${NC}"
    docker-compose logs
    exit 1
fi

# 运行数据库迁移
echo -e "${GREEN}运行数据库迁移...${NC}"
docker-compose exec app npx prisma migrate deploy

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}管理员登录: http://localhost:3000/admin${NC}"