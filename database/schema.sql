CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mercados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(120) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(180) NOT NULL,
    brand VARCHAR(180) NOT NULL,
    category VARCHAR(120) NOT NULL,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS precos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    market_id INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    created_by_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES produtos(id),
    FOREIGN KEY (market_id) REFERENCES mercados(id),
    FOREIGN KEY (created_by_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (product_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS cadastros_usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    market_id INTEGER NOT NULL,
    price_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, price_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (product_id) REFERENCES produtos(id),
    FOREIGN KEY (market_id) REFERENCES mercados(id),
    FOREIGN KEY (price_id) REFERENCES precos(id)
);
