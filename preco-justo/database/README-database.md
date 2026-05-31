Instruções para criar o banco MySQL localmente:

1. Abra MySQL Workbench, phpMyAdmin ou o terminal do MySQL.
2. Execute o arquivo schema.sql:
   -- Exemplo no terminal MySQL:
   SOURCE C:/caminho/para/preco-justo/database/schema.sql;

3. Copie backend\.env.example para backend\.env e ajuste as credenciais:
   DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT
