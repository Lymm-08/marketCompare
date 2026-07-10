# MarketCompare

🌎 Language: English | 🇧🇷 [Português](README.pt-BR.md)

This project uses a manually populated database to demonstrate how the system works. In a future version, prices may be updated automatically through integrations with supermarkets.

## Demo Video

See how the website works below:

![MarketCompare demo](media/demo.gif)

## Tech Stack

- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-Login
- MySQL
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

### 3) Configure the environment

Create a .env file in the project root and define the DATABASE_URL variable.

Set the MySQL connection URL as follows:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/marketcompare
```

## How to create the database in MySQL

1. Open MySQL Workbench, phpMyAdmin, or the MySQL terminal.
2. Create the database:

```sql
CREATE DATABASE marketcompare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Run the project's SQL script:

```bash
mysql -u root -p < database/marketcompare_mysql.sql
```

You can also open [database/marketcompare_mysql.sql](database/marketcompare_mysql.sql) in your MySQL client and execute its contents.

## Database configuration

The application reads the connection URL from the DATABASE_URL variable defined in the project environment file.

- Main configuration file: [backend/app/config.py](backend/app/config.py)
- Environment file: [.env](.env)

## Run the application

```bash
python app.py
```

Open the following address in your browser:

```text
http://localhost:5000
```
