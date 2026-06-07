/* database.js
   Sessões:
   1) Imports
   2) Pool configuration
   3) Export

   Responsabilidade: criar pool de conexões MySQL (mysql2/promise)
*/

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// 2) Pool configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'contacerta_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 3) Export
module.exports = pool;
