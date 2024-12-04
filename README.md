
# Chronos Alert

## 📚 Sobre o Projeto

**Chronos Alert** é um sistema de scraping de dados que combina as seguintes tecnologias para oferecer uma solução eficiente e escalável: 

- **React** no front-end
- **Node.js** no back-end
- **MongoDB** e **PostgreSQL** para armazenamento de dados
- **Keycloak** para autenticação e autorização
- **Docker** para gerenciamento de containers

Este projeto foi desenvolvido para facilitar a coleta e a organização de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://react.dev/)
- **Backend:** [Node.js](https://nodejs.org/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/) e [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [Keycloak](https://www.keycloak.org/)
- **Gerenciamento de Containers:** [Docker](https://www.docker.com/)

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **[Docker](https://www.docker.com/) e Docker Compose**
- **[Node.js](https://nodejs.org/)**
- **[Yarn](https://yarnpkg.com/) (opcional, para o desenvolvimento em React)**

---

## 🚀 Como Iniciar o Projeto

### Usando Docker

1. **Acesse o diretório raiz do projeto:**
   ```bash
   cd ./chronos-alert/
   ```

2. **Inicie o Docker com reconstrução dos containers (se houver alterações nos arquivos):**
   ```bash
   docker-compose up --build
   ```

3. **Inicie o Docker em modo estável (sem reconstrução):**
   ```bash
   docker-compose up -d
   ```

---

### Modo de Desenvolvimento

1. **Edite o arquivo `docker-compose.yml` e comente o serviço de frontend (se necessário).**

2. **Inicie o backend e os serviços auxiliares no Docker:**
   ```bash
   cd ./chronos-alert/
   docker-compose up --build
   ```

3. **Acesse o diretório do frontend e inicie o React localmente:**
   ```bash
   cd ./chronos-alert/client/
   yarn start
   ```

---

## 📂 Estrutura do Projeto

```plaintext
chronos-alert/
├── client/            # Código do Frontend em React
├── server/            # Código do Backend em Node.js
├── docker-compose.yml # Configuração do Docker
├── .env               # Variáveis de Ambiente (não incluído no repositório)
└── README.md          # Documentação do projeto
```

---

## ⚙️ Configuração de Variáveis de Ambiente

As variáveis de ambiente necessárias estão configuradas no arquivo `.env`. Certifique-se de criar este arquivo na raiz do projeto e preencher com os valores corretos.

### Exemplos de variáveis:

```env
# Frontend
REACT_APP_API_URL=https://sua-api.com
REACT_APP_KEYCLOAK_URL=https://seu-keycloak.com

# Backend
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=nome_do_banco
```

> ⚠️ **Importante:** Para React, todas as variáveis de ambiente devem começar com `REACT_APP_`.

---

## 🛡️ Autenticação com Keycloak

O projeto utiliza **Keycloak** para gerenciar autenticação e autorização. Certifique-se de configurar o Keycloak corretamente antes de iniciar o projeto. Para mais detalhes, consulte a [documentação oficial do Keycloak](https://www.keycloak.org/documentation).

---