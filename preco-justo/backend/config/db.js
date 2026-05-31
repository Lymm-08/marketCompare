// ========================================
// CONFIGURAÇÃO DA CONEXÃO COM O BANCO
// ========================================

// Importa a biblioteca mysql2 utilizando Promises
const mysql = require("mysql2/promise");


// ========================================
// CRIAÇÃO DO POOL DE CONEXÕES
// ========================================

// Configura a conexão com o banco de dados MySQL
const pool = mysql.createPool({

  // Endereço do servidor MySQL
  host: process.env.DB_HOST || "localhost",

  // Usuário do banco de dados
  user: process.env.DB_USER || "root",

  // Senha do banco de dados
  password: process.env.DB_PASSWORD || "",

  // Nome do banco de dados
  database: process.env.DB_NAME || "preco_justo",

  // Mantém conexões disponíveis para reutilização
  waitForConnections: true,

  // Quantidade máxima de conexões simultâneas
  connectionLimit: 10,

  // Limite da fila de espera (0 = ilimitado)
  queueLimit: 0
});


// ========================================
// EXPORTAÇÃO DA CONEXÃO
// ========================================

// Disponibiliza o pool para ser utilizado em outros arquivos
module.exports = pool;