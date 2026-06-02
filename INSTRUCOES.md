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

## O que é necessário para popular o banco (lista de verificação)

1. Ter o MySQL instalado e em funcionamento (local ou remoto).
2. Criar o banco de dados (por exemplo `comparador`) e executar o script `database/schema.sql`.
3. Criar o arquivo `backend/.env` com as credenciais de conexão (este arquivo NÃO deve ser commitado). Use `backend/.env.example` como modelo.
4. (Opcional) Ajustar permissões do usuário do MySQL para permitir `INSERT/UPDATE/DELETE` nas tabelas.
5. Popular com dados iniciais — duas opções abaixo:
    - Executar o arquivo `database/sample_data.sql` (exemplo adicionado neste repositório).
    - Usar a API HTTP para criar registros via `POST /api/precos` (exemplos de curl abaixo).

## Exemplos: executar script SQL

No terminal MySQL:
```sql
SOURCE C:/caminho/para/seu/projeto/database/schema.sql;
SOURCE C:/caminho/para/seu/projeto/database/sample_data.sql;
```

## Exemplos: chamadas HTTP para adicionar preços

1) Adicionar um preço via curl (cria produto/loja automaticamente se não existirem):
```bash
curl -X POST http://localhost:3000/api/precos \
   -H "Content-Type: application/json" \
   -d '{"produto":"Arroz","loja":"Mercado A","valor":19.90}'
```

2) Editar um preço existente (substitua :id pelo id do registro):
```bash
curl -X PUT http://localhost:3000/api/precos/:id \
   -H "Content-Type: application/json" \
   -d '{"produto":"Arroz","loja":"Mercado B","valor":18.50}'
```

3) Excluir um preço:
```bash
curl -X DELETE http://localhost:3000/api/precos/:id
```

## O que eu preciso de você para eu popular o banco por você

- Credenciais de acesso ao MySQL (host, usuário, senha, nome do banco, porta). Se não quiser passar credenciais aqui, eu posso gerar um arquivo `database/sample_data.sql` e instruções para você executar localmente.
- Decidir se deseja que eu execute os inserts automaticamente (preciso de acesso ao banco), ou se prefere executar os comandos manualmente seguindo as instruções.

## Como abrir o projeto no navegador (passo a passo rápido)

1. Instale dependências (uma vez):
```bash
cd C:\Users\Aluno\TCC-comparador-de-precos
npm install
```
2. Inicie o servidor (dev):
```bash
npm run dev
```
3. Abra no navegador:
```
http://localhost:3000
```

OBS: Sem `backend/.env` o sistema usa armazenamento em memória (boa opção para testar visualmente). Recarregue a página após enviar/editar dados via formulário.
