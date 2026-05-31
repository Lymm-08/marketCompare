-- Criação do banco de dados Preço Justo
DROP DATABASE IF EXISTS preco_justo;
CREATE DATABASE preco_justo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE preco_justo;

-- Tabela produtos
CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(120) NOT NULL
);

-- Tabela supermercados
CREATE TABLE supermercados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL
);

-- Tabela precos
CREATE TABLE precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  supermercado_id INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_registro DATE NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (supermercado_id) REFERENCES supermercados(id)
);

-- Dados de exemplo
INSERT INTO produtos (nome, categoria) VALUES
  ("Arroz 5kg","Alimentos"),
  ("Feijão 1kg","Alimentos"),
  ("Leite 1L","Bebidas");

INSERT INTO supermercados (nome, endereco) VALUES
  ("Mercado A","Centro"),
  ("Mercado B","Bairro Norte"),
  ("Mercado C","Bairro Sul");

INSERT INTO precos (produto_id, supermercado_id, valor, data_registro) VALUES
  (1,1,24.99,"2026-05-28"),
  (1,2,26.50,"2026-05-28"),
  (1,3,29.90,"2026-05-28"),
  (2,1,8.90,"2026-05-29"),
  (2,2,9.25,"2026-05-29"),
  (3,1,4.50,"2026-05-30");
