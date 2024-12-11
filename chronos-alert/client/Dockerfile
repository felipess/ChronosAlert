# Usando a imagem oficial do Node.js # usar versão -alpine?
FROM node:22-alpine

# Definindo o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiando os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalando as dependências do projeto
RUN yarn install

# Copiando o restante dos arquivos necessários para o contêiner
COPY ./public ./public
COPY ./src ./src

# Expondo a porta usada pelo React
EXPOSE 3000

# Iniciando o React - modo Dev
# CMD ["yarn", "start"]

# Iniciando o React - modo Prod
COPY ./.env ./.env
RUN yarn build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
# End modo Prod