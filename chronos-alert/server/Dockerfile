# Usando a imagem oficial do Node.js
FROM node:22

# Instalando dependências para o Puppeteer funcionar corretamente
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libdrm2 \
    libgbm1 \
    --no-install-recommends

# Definindo o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiando os arquivos package.json para o contêiner
COPY package*.json ./

# Instalando as dependências do projeto
RUN yarn install

# Copiando os arquivos para o contêiner
COPY . .

# Expondo a porta usada pelo backend
EXPOSE 5000

# Comando para iniciar scripts do servidor e do script de busca
CMD ["sh", "-c", "node ./server.js & node ./src/services/consultar.js"]

