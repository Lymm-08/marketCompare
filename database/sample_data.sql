-- Dados de exemplo para popular o banco do Comparador de Preços
-- Execute após criar as tabelas com `schema.sql`.

INSERT INTO lojas (nome) VALUES
('Mercado A'),
('Mercado B'),
('Mercado C');

INSERT INTO produtos (nome) VALUES
('Arroz 5kg'),
('Feijão 1kg'),
('Açúcar 1kg');

-- Ajuste os IDs conforme o seu esquema se necessário
INSERT INTO precos (produto_id, loja_id, valor) VALUES
(1, 1, 29.90),
(1, 2, 27.50),
(1, 3, 30.00),
(2, 1, 8.90),
(2, 2, 7.99),
(3, 3, 4.50);
