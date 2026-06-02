-- Estrutura de banco de dados para o Comparador de Preços
-- Crie este schema no MySQL e depois configure as credenciais em backend/config/db.js.

CREATE TABLE IF NOT EXISTS lojas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  loja_id INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
  FOREIGN KEY (loja_id) REFERENCES lojas(id) ON DELETE CASCADE
);
