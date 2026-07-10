# MarketCompare

🌎 Language: English | 🇧🇷 [Português](README.pt-BR.md)

This project is a web-based supermarket price comparison system that allows users to find the best deals, calculate savings, and collaboratively add new products.

## Demo Video

See how the website works below:

![MarketCompare demo](media/demo.gif)

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

Or open the [database/marketcompare_mysql.sql](database/marketcompare_mysql.sql) file in your MySQL client and execute the entire contents.

## Where to edit to connect to the database

- Main configuration file: [backend/app/config.py](backend/app/config.py)
- Environment file: [.env.example](.env.example)
- Actual environment file: [.env](.env) (create this file based on the example)

The application reads the connection URL from the DATABASE_URL variable.

### Example MySQL configuration

```env
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/marketcompare
```

Replace:
- username with your MySQL username
- password with your password
- localhost with your MySQL server’s hostname, if necessary
- marketcompare with the name of your database

## Run the application

```bash
python app.py
```

Go to:

```text
http://localhost:5000
```
