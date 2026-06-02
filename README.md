# Comparador de Preços

Aplicação para comparar preços de produtos entre diferentes lojas. O usuário pode adicionar produtos, lojas e preços manualmente, além de editar e excluir registros.

## Como usar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```
3. Abra `http://localhost:3000` no navegador.

## Estrutura do projeto

- `backend/` - API Node.js com rotas e controladores.
- `frontend/` - interface web moderna e responsiva.
- `database/schema.sql` - esquema MySQL para criar tabelas.
- `backend/config/db.js` - arquivo de configuração com comentário para ativar a conexão MySQL.

## Observações

- O backend atual usa armazenamento em memória para facilitar o desenvolvimento inicial.
- Quando o MySQL estiver disponível, configure as credenciais em `backend/config/db.js` e atualize os modelos em `backend/modelos/*.js` para usar consultas reais.
