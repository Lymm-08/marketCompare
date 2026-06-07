-- Schema for ContaCerta
CREATE DATABASE IF NOT EXISTS contacerta_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE contacerta_db;

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_produto VARCHAR(255) NOT NULL,
  nome_mercado VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
