# MarketCompare

🌎 Language: English | 🇧🇷 [Português](README.pt-BR.md)

This project uses a manually populated database to demonstrate how the system works. In a future version, prices may be updated automatically through integrations with supermarkets.

## Tech Stack

- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-Login
- MySQL (optional; SQLite by default)
- Bootstrap

## Project Structure

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

## How to run locally

### 1) Create a virtual environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 2) Install dependencies

```bash
pip install -r requirements.txt
```

### 3) Create the .env file

Copy the example:

```bash
copy .env.example .env
```

If you want to use SQLite, you don’t need to change anything.

If you want to use MySQL, edit the .env file and change the variable to something like:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/marketcompare
```


1. Open MySQL Workbench, phpMyAdmin, or the MySQL terminal.
2. Create the b

Translated with DeepL.com (free version)
