# ContaCerta - Backend

API simples em Node.js + Express + MySQL para armazenar e consultar preços.

Configuração:

- Copie `.env.example` para `.env` e ajuste as credenciais do MySQL.
- Instale dependências: `npm install` dentro da pasta `backend`.
- Inicie: `npm run dev` (necessita nodemon) ou `npm start`.

Endpoints:

- `GET /produtos` - listar todos
- `GET /produtos/busca/:nome` - buscar 3 menores preços
- `POST /produtos` - criar produto
- `PUT /produtos/:id` - atualizar produto
- `DELETE /produtos/:id` - excluir produto
