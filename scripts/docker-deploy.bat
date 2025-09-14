@echo off
REM Windows Docker 部署脚本
setlocal enabledelayedexpansion

echo [INFO] 开始部署 绮课 应用...

REM 检查 Docker 是否安装
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker 未安装
    pause
    exit /b 1
)

REM 检查 Docker Compose 是否安装
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose 未安装
    pause
    exit /b 1
)

REM 检查 .env 文件是否存在
if not exist .env (
    echo [WARNING] .env 文件不存在，使用 .env.example 作为模板
    copy .env.example .env
    echo [WARNING] 请编辑 .env 文件配置必要的环境变量
    pause
    exit /b 1
)

REM 拉取最新镜像
echo [INFO] 拉取最新 Docker 镜像...
docker-compose pull

REM 构建应用镜像
echo [INFO] 构建应用镜像...
docker-compose build --no-cache

REM 启动服务
echo [INFO] 启动服务...
docker-compose up -d

REM 等待服务启动
echo [INFO] 等待服务启动...
timeout /t 10 /nobreak

REM 检查服务状态
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo [SUCCESS] 服务启动成功！
    echo [SUCCESS] 应用访问地址: http://localhost:3000
) else (
    echo [ERROR] 服务启动失败，请检查日志
    docker-compose logs
    pause
    exit /b 1
)

REM 运行数据库迁移
echo [INFO] 运行数据库迁移...
docker-compose exec app npx prisma migrate deploy

echo [SUCCESS] 部署完成！
echo [SUCCESS] 管理员登录: http://localhost:3000/admin
pause