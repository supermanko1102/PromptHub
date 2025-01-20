FROM node:18-alpine

WORKDIR /app

# 安裝依賴
COPY package*.json ./
RUN npm install

# 複製專案檔案
COPY . .

# 開放 3000 端口
EXPOSE 3000

# 啟動開發服務器
CMD ["npm", "run", "dev"]
