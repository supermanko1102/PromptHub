# 顯示所有可用的命令
default:
    @just --list

# 開發相關
dev: sanity-typegen
    docker-compose up

# 在背景啟動開發環境
dev-d:
    docker-compose up -d

# 停止所有容器
down:
    docker-compose down

# 重建並啟動容器
build: sanity-typegen
    docker-compose up --build

# 清理 Docker 資源
clean:
    docker-compose down --rmi all --volumes --remove-orphans

# Sanity 相關
sanity-dev:
    npx sanity dev

sanity-deploy:
    npx sanity deploy

sanity-types:
    npm run typegen

# Next.js 相關
next-dev:
    npm run dev

next-build:
    npm run build

next-start:
    npm run start

# 依賴管理
install:
    npm install

update:
    npm update

# 測試和檢查
lint:
    npm run lint

# 容器操作
logs:
    docker-compose logs -f

shell:
    docker-compose exec web sh

# 資料庫相關
db-studio:
    npx sanity start

# 環境設置
setup:
    cp .env.example .env
    npm install
    npm run typegen

# Git 相關
prepare: sanity-typegen
    npm install

# Sanity 相關指令
sanity-typegen:
    sanity schema extract --path ./sanity/extract.json && sanity typegen generate

# 清理項目
clean-all: down
    rm -rf node_modules
    rm -rf .next
    rm -rf dist 