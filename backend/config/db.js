// Esta configuração é um placeholder para quando o MySQL for integrado.
// Depois de criar o banco de dados, defina as variáveis de ambiente:
// DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT.
// Em seguida, substitua as funções de modelo pelo uso de pool.query.

const mysql = require('mysql2/promise');

let pool = null;

if (process.env.DB_HOST) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

module.exports = { pool };
