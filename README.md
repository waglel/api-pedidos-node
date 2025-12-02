📘 API de Pedidos – Node.js + Express + MongoDB

Esta API permite gerenciar pedidos, oferecendo operações de criação, consulta, listagem, atualização e exclusão.
Ela realiza mapeamento dos dados recebidos para o formato exigido antes de salvar no banco de dados MongoDB.

🚀 Tecnologias Utilizadas

Node.js

Express.js

MongoDB

Mongoose

Postman (coleção + ambiente incluídos)

🏗️ Estrutura do Projeto
project/
 ├─ src/
 │   ├─ config/
 │   │   └─ database.js
 │   ├─ controllers/
 │   │   └─ orderController.js
 │   ├─ models/
 │   │   └─ Order.js
 │   ├─ routes/
 │   │   └─ orderRoutes.js
 │   └─ app.js
 └─ server.js

⚙️ Como Executar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/SEU-USUARIO/api-pedidos.git
cd api-pedidos

2️⃣ Instale as dependências
npm install

3️⃣ Inicie o MongoDB local
mongod

4️⃣ Inicie o servidor
node server.js


A API estará disponível em:

👉 http://localhost:3000

📄 Modelo de Dados
📥 JSON recebido no POST /order
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}

🔄 JSON salvo no banco (mapping realizado)
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": "2434",
      "quantity": 1,
      "price": 1000
    }
  ]
}

🔥 Endpoints da API
➕ Criar pedido

POST /order

🔍 Obter pedido por ID

GET /order/:id

📋 Listar todos os pedidos

GET /order/list

✏️ Atualizar pedido

PUT /order/:id

❌ Deletar pedido

DELETE /order/:id

🧪 Coleção Postman

O repositório inclui:

✔ Coleção Postman com todos os endpoints
✔ Ambiente com variáveis (baseUrl, orderId)

Para importar:

Abra o Postman

Clique em Import

Selecione os arquivos .json incluídos

🛡️ Tratamento de Erros

Body inválido → 400 Bad Request

Pedido não encontrado → 404 Not Found

Pedido duplicado → 409 Conflict

Erro interno → 500 Internal Server Error

✨ Boas Práticas Aplicadas

Organização em MVC

Código modular

Async/Await

Validações básicas

Respostas padronizadas

Mapeamento correto de dados