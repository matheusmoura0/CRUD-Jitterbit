# API de Gerenciamento de Pedidos (Teste Técnico)

Esta é uma API RESTful desenvolvida em Node.js para o gerenciamento de pedidos, com uma funcionalidade crítica de transformação de dados de Português para Inglês antes do salvamento no banco de dados.

## 🚀 Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: MongoDB (Mongoose)
- **Segurança**: JSON Web Token (JWT)
- **Documentação**: Swagger (OpenAPI 3.0)

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js (v18+)
- MongoDB rodando localmente (porta 27017) ou uma URI do MongoDB Atlas.

### Passo a Passo

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   O arquivo `.env` já vem pré-configurado com valores padrão. Caso seu MongoDB use uma URL diferente, altere no arquivo `.env`:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/order_db
   JWT_SECRET=sua_chave_secreta_aqui
   ```

3. **Rodar o projeto**:
   ```bash
   # Modo de desenvolvimento (com auto-reload)
   npm run dev

   # Modo de produção
   npm start
   ```

---

## 📖 Documentação da API (Swagger)

A API possui documentação interativa completa. Com o servidor rodando, acesse:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Como Testar

### 1. Autenticação (JWT)
Todas as rotas de pedidos são protegidas. Primeiro, obtenha um token:
- **POST** `http://localhost:3000/login`
- Copie o `token` da resposta.

### 2. Criar Pedido (Transformação de Dados)
A API recebe os dados em **Português** e os mapeia automaticamente para o **Inglês**.
- **POST** `/order`
- **Header**: `Authorization: Bearer <SEU_TOKEN>`
- **Body (Exemplo)**:
```json
{
  "numeroPedido": "PEDIDO-001",
  "valorTotal": 150.50,
  "dataCriacao": "2023-07-19T12:00:00Z",
  "items": [
    {
      "idItem": "101",
      "quantidadeItem": 2,
      "valorItem": 75.25
    }
  ]
}
```

### 3. Outras Rotas
- **GET** `/order/list` - Lista todos os pedidos.
- **GET** `/order/:orderId` - Obtém detalhes de um pedido.
- **PUT** `/order/:orderId` - Atualiza campos do pedido.
- **DELETE** `/order/:orderId` - Remove um pedido.

---

## ⚙️ Funcionalidades de Destaque
- **Mapping Layer**: Camada de utilitário que isola a lógica de transformação de campos (`Portuguese -> English`).
- **Middleware de Auth**: Validação centralizada de tokens JWT.
- **Tratamento de Erros**: Global error handling para garantir respostas JSON consistentes (400, 404, 500).
- **Validação**: Verificação de campos obrigatórios e tipos de dados.
