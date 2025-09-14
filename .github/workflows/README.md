# GitHub Actions 配置指南

## 设置 Secrets

在 GitHub 仓库中配置以下 Secrets：

### 必需 Secrets
- `DATABASE_URL`: 外部 MySQL 数据库连接字符串

### 可选 Secrets
- `REGISTRY_USERNAME`: 容器注册表用户名（用于推送到 Docker Hub）
- `REGISTRY_PASSWORD`: 容器注册表密码

## 工作流程说明

### 触发条件
- 推送到 `main` 或 `develop` 分支
- 创建版本标签 `v*`
- 创建或更新 Pull Request

### 构建特性
- 多架构支持（amd64, arm64）
- 自动标签管理
- 构建缓存优化
- 安全检查

## 标签策略

生成的镜像标签包括：
- `main`: 最新主分支构建
- `develop`: 最新开发分支构建
- `v1.2.3`: 语义化版本标签
- `pr-123`: Pull Request 构建

## 使用示例

### 拉取镜像
```bash
# 最新稳定版
docker pull ghcr.io/your-username/premium-timetable:main

# 特定版本
docker pull ghcr.io/your-username/premium-timetable:v1.0.0
```

### 运行容器
```bash
docker run -d \
  --name timetable \
  -p 3000:3000 \
  -e DATABASE_URL="your-mysql-db-url" \
  ghcr.io/your-username/premium-timetable:main
```