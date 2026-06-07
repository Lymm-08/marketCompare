const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run(){
  const schemaPath = path.join(__dirname,'..','..','database','schema.sql');
  const seedPath = path.join(__dirname,'..','..','database','seed.sql');
  const schema = fs.readFileSync(schemaPath,'utf8');
  const seed = fs.readFileSync(seedPath,'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try{
    console.log('Executando schema...');
    await connection.query(schema);
    console.log('Schema executado. Inserindo dados de exemplo...');
    await connection.query(seed);
    console.log('Dados inseridos com sucesso.');
  }catch(err){
    console.error('Erro ao inicializar banco:', err.message);
  }finally{
    await connection.end();
  }
}

run();
