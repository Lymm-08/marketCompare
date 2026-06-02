# O que falta fazer e como fazer

Este projeto já tem a interface e a API básica funcionando em memória. Há alguns pontos que ainda precisam ser completados para a aplicação ficar pronta e integrada com MySQL.

## O que falta fazer

1. Integrar o MySQL no backend
   - Criar o banco de dados no MySQL usando `database/schema.sql`.
   - Configurar as variáveis de ambiente no arquivo `backend/.env` (ou na máquina):
     - `DB_HOST`
     - `DB_USER`
     - `DB_PASSWORD`
     - `DB_NAME`
     - `DB_PORT` (opcional)
   - Substituir o armazenamento em memória dos modelos em `backend/modelos/*.js` por consultas ao MySQL usando `backend/config/db.js`.

2. Criar o arquivo `backend/.env` com as credenciais de conexão
   - Este arquivo não deve ser enviado ao Git.
   - Exemplo de conteúdo:
     ```env
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=comparador
     DB_PORT=3306
     ```

3. Adicionar dados iniciais no banco
   - Use o formulário da interface para cadastrar produtos, lojas e preços.
   - Ou insira manualmente no banco de dados pelo MySQL Workbench / phpMyAdmin / terminal MySQL.

4. Ajustar o frontend se necessário
   - A interface atual já permite adicionar, editar e excluir preços.
   - Ela também permite comparar preços pelo nome do produto.

## Como adicionar preços

1. Abra o navegador em `http://localhost:3000`.
2. Na seção "Adicionar / Editar Produto":
   - Informe o nome do produto.
   - Informe o nome da loja.
   - Informe o preço em reais.
   - Clique em `Salvar`.
3. O sistema irá criar automaticamente o produto e a loja caso não existam.
4. O preço será listado na tabela inferior.
5. Use os botões `Editar` e `Excluir` para alterar registros existentes.

## Como comparar preços

1. Digite o nome do produto no campo de busca.
2. Clique em `Comparar Preços`.
3. A lista mostrará os preços encontrados ordenados do menor para o maior.
4. O primeiro resultado é o melhor preço.

## Observações importantes

- O sistema atual NÃO tem login.
- Todos os dados são armazenados em memória enquanto o backend estiver sendo executado.
- Ao reiniciar o servidor, os dados em memória serão perdidos.
- Para persistência real, é necessário conectar ao MySQL e ajustar os modelos.

## Próximos passos sugeridos

- Implementar buscas por produto no backend com filtros mais precisos.
- Adicionar validações adicionais no frontend para evitar entradas inválidas.
- Criar uma página de administração para visualizar produtos e lojas separadamente.
- Incluir testes automatizados para rotas e modelos.
