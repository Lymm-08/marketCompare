

Este projeto utiliza uma base de dados manual para demonstração do funcionamento do sistema. Em uma versão futura, os preços poderão ser atualizados automaticamente por meio de integrações com supermercados.

## Stack

- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-Login
- MySQL opcional (SQLite por padrão)
- Bootstrap

## Estrutura do projeto

```text
app.py
backend/
  app/
    __init__.py
    config.py
    models.py
    routes.py
    seed_data.py
frontend/
  static/
    css/
      base.css
      components.css
      main.css
      style.css
    js/
      app.js
  templates/
    auth/
    base.html
    index.html
    compare.html
    favorites.html
    add_product.html
    cadastros.html
    edit_cadastro.html
    etc.
database/
  marketcompare_mysql.sql
  mysql_setup.py
  schema.sql
  seed.sql
requirements.txt
.env.example
```

## Como rodar localmente

### 1) Criar ambiente virtual

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 2) Instalar dependências

```bash
pip install -r requirements.txt
```

### 3) Criar o arquivo .env

Copie o exemplo:

```bash
copy .env.example .env
```

Se quiser usar SQLite, não precisa alterar nada.

Se quiser usar MySQL, edite o arquivo .env e troque a variável para algo como:

```env
DATABASE_URL=mysql+pymysql://root:senha@localhost:3306/marketcompare
```

## Como criar o banco no MySQL

1. Abra o MySQL Workbench, phpMyAdmin ou o terminal do MySQL.
2. Crie o banco:

```sql
CREATE DATABASE marketcompare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Execute o script SQL do projeto:

```bash
mysql -u root -p < database/marketcompare_mysql.sql
```

Ou abra o arquivo [database/marketcompare_mysql.sql](database/marketcompare_mysql.sql) no seu cliente MySQL e execute todo o conteúdo.

## Onde editar para conectar ao banco

- Arquivo principal de configuração: [backend/app/config.py](backend/app/config.py)
- Arquivo de ambiente: [.env.example](.env.example)
- Arquivo real do ambiente: [.env](.env) (crie este arquivo a partir do exemplo)

A aplicação lê a URL de conexão a partir da variável DATABASE_URL.

### Exemplo de configuração MySQL

```env
DATABASE_URL=mysql+pymysql://usuario:senha@localhost:3306/marketcompare
```

Substitua:
- usuario pelo seu usuário do MySQL
- senha pela sua senha
- localhost pelo host do seu servidor MySQL, se necessário
- marketcompare pelo nome do seu banco

## Executar a aplicação

```bash
python app.py
```

Acesse:

```text
http://localhost:5000

