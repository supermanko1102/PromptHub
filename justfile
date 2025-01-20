# 顯示所有可用的命令
default:
    @just --list

# 啟動開發環境
dev:
    docker-compose up

# 在背景啟動開發環境
dev-d:
    docker-compose up -d

# 停止所有容器
down:
    docker-compose down

# 重建並啟動容器
build:
    docker-compose up --build

# 清理 Docker 資源
clean:
    docker-compose down --rmi all --volumes --remove-orphans

# 查看容器日誌
logs:
    docker-compose logs -f

# 進入容器 shell
shell:
    docker-compose exec web sh

# 運行 npm 命令
npm *args:
    docker-compose exec web npm {{args}}

# 重新安裝 node_modules
install:
    docker-compose exec web npm install

# 更新套件
update:
    docker-compose exec web npm update 