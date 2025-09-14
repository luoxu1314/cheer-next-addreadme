# Premium Timetable Docker 部署指南

## 快速开始

### 1. 环境准备
确保已安装以下工具：
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

### 2. 获取代码
```bash
git clone <your-repository-url>
cd premium-timetable
```

### 3. 配置环境变量
复制环境变量模板：
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置必要的环境变量：
```bash
# 外部 MySQL 数据库配置
DATABASE_URL="mysql://username:password@host:3306/database_name"
```

### 4. 启动应用
#### Linux/macOS:
```bash
chmod +x scripts/docker-deploy.sh
./scripts/docker-deploy.sh
```

#### Windows:
双击运行 `scripts/docker-deploy.bat` 或在 PowerShell 中运行：
```powershell
.\scripts\docker-deploy.bat
```

### 5. 访问应用
- 应用主页：http://localhost:3000
- 管理后台：http://localhost:3000/admin

## 手动部署

### 手动部署
```bash
docker build -t premium-timetable .

# 运行容器
docker run -d \
  --name premium-timetable \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  premium-timetable
```

## Docker Compose 命令

### 常用命令
```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 更新镜像并重启
docker-compose pull && docker-compose up -d

# 进入容器
docker-compose exec app sh

# 运行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 查看数据库状态
docker-compose exec app npx prisma db seed
```

## 环境变量详解

| 变量名 | 描述 | 示例 |
|--------|------|------|
| DATABASE_URL | 外部 MySQL 数据库连接字符串 | mysql://user:pass@host:3306/database |

## 生产环境部署

### 1. 服务器准备
- 建议使用至少 2GB RAM 的服务器
- 安装 Docker 和 Docker Compose
- 配置防火墙开放 3000 端口

### 2. 反向代理配置（可选）
使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. SSL 证书（推荐）
使用 Let's Encrypt：
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 4. 使用 GitHub Actions 自动部署
1. 在 GitHub 仓库设置中配置 Secrets：
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

2. 推送代码到 main 分支将自动触发构建

## 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 检查端口使用情况
sudo lsof -i :3000
# 或
netstat -tulnp | grep 3000
```

#### 2. 数据库连接失败
- 检查外部数据库连接配置是否正确
- 确保数据库服务正在运行且可访问
- 检查网络连接和防火墙设置

#### 3. 构建失败
- 检查 Node.js 版本兼容性
- 清理缓存：
  ```bash
  docker system prune -a
  ```

#### 4. 权限问题
- Linux 用户可能需要将当前用户加入 docker 组：
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```

### 查看日志
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs app
docker-compose logs postgres

# 实时查看日志
docker-compose logs -f
```

## 备份与恢复

### 数据库管理
由于使用外部数据库，请直接通过数据库管理工具或命令行进行备份和恢复操作。

## 监控与维护

### 资源监控
```bash
# 查看容器资源使用
docker stats

# 查看系统资源
docker system df
```

### 定期维护
```bash
# 清理无用镜像
docker image prune -a

# 清理无用卷
docker volume prune

# 更新镜像
docker-compose pull && docker-compose up -d
```

## 开发环境

### 本地开发
```bash
# 使用 Docker 进行开发
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# 或直接本地运行
npm install
npm run dev
```

### 调试模式
```bash
# 以调试模式运行容器
docker-compose -f docker-compose.yml up --build
```