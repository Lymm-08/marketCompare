# MarketCompare

🌎 Idioma: Português | 🇺🇸 [English](README.md)

MarketCompare é uma aplicação web para comparar preços de produtos e gerenciar itens favoritos. O projeto utiliza um backend em Flask com uma interface simples para demonstrar o fluxo principal de cadastro, comparação e favoritos.

## Demo Video

Veja o funcionamento do site abaixo:

![MarketCompare demo](media/demo.gif)

## Stack

- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-Login
- MySQL
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
    routes/
    seed_data.py
    templates/
database/
  marketcompare_mysql.sql
  mysql_setup.py
frontend/
  static/
    css/
    js/
      image/
  templates/
    auth/
    add_product.html
    base.html
    cadastros.html
    compare.html
    edit_cadastro.html
    favorites.html
    index.html
instance/
media/
tests/
  test_auth.py
requirements.txt
.env
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

### 3) Configurar o ambiente

Crie um arquivo .env na raiz do projeto e defina a variável DATABASE_URL.

Defina a URL de conexão do MySQL da seguinte forma:

```env
DATABASE_URL=mysql+pymysql://usuario:senha@localhost:3306/marketcompare
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

Também é possível abrir [database/marketcompare_mysql.sql](database/marketcompare_mysql.sql) no seu cliente MySQL e executar o conteúdo.

## Configuração do banco

A aplicação lê a URL de conexão a partir da variável DATABASE_URL definida no arquivo de ambiente do projeto.

- Arquivo principal de configuração: [backend/app/config.py](backend/app/config.py)
- Arquivo de ambiente: [.env](.env)

## Executar a aplicação

```bash
python app.py
```

Acesse o seguinte endereço no navegador:

```text
http://localhost:5000
```
