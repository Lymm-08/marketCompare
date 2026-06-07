# ContaCerta

Projeto completo (frontend estático + backend Node/Express + MySQL) para comparação de preços.

Instalação e execução (passos recomendados):

1. Instalar dependências na raiz (instala ferramentas de desenvolvimento):

```powershell
cd c:\Users\emily\Documents\TCC-comparador-de-precos
npm install
```

2. Instalar dependências do backend (opcional se já instalou):

```powershell
cd backend
npm install
```

3. Inicializar banco (opção rápida via Node script):

```powershell
cd backend
REM copie .env.example para .env e preencha as credenciais
npm run init-db
```

4. Iniciar backend + frontend juntos (a partir da raiz):

```powershell
cd c:\Users\emily\Documents\TCC-comparador-de-precos
npm run start-all
```

Isso inicia o backend (nodemon) e um servidor estático para `frontend` em `http://localhost:5500`.

Endpoints principais (backend):

- `GET /produtos`
- `GET /produtos/busca/:nome`
- `GET /produtos/:id`
- `POST /produtos`
- `PUT /produtos/:id`
- `DELETE /produtos/:id`
