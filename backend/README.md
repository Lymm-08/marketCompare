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

Inicializar banco de dados (opções):

- Usando MySQL diretamente (recomendado):
	1. Crie o banco e a tabela executando `database/schema.sql` e depois `database/seed.sql`.
		 ```sql
		 mysql -u root -p < database/schema.sql
		 mysql -u root -p < database/seed.sql
		 ```

- Usando o script Node (usa suas credenciais em `.env`):
	1. Copie `backend/.env.example` para `backend/.env` e preencha `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
	2. No diretório `backend`, instale dependências `npm install`.
	3. Rode `npm run init-db` (executa schema + seed).

Executando a aplicação:

1. Start backend:
```
cd backend
npm install
npm run dev
```

2. Frontend: abra os arquivos HTML em `frontend/` no navegador ou sirva a pasta com um servidor estático.

