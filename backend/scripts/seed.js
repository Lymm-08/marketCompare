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
    // also write JSON seed file
    try{
      const sample = [
        {nome_produto:'Arroz 5kg', nome_mercado:'Supermercado Econômico', endereco:'Rua das Flores, 123', preco:19.90},
        {nome_produto:'Arroz 5kg', nome_mercado:'Supermercado Popular', endereco:'Av. Central, 456', preco:20.90},
        {nome_produto:'Arroz 5kg', nome_mercado:'Mercado do Povo', endereco:'Praça Nova, 789', preco:21.50},
        {nome_produto:'Feijão Carioca 1kg', nome_mercado:'Mercado do Povo', endereco:'Praça Nova, 789', preco:8.50},
        {nome_produto:'Leite Integral 1L', nome_mercado:'Supermercado Popular', endereco:'Av. Central, 456', preco:4.99}
      ];
      const fs = require('fs');
      const path = require('path');
      const jsonFile = path.join(__dirname,'..','data','products.json');
      fs.writeFileSync(jsonFile, JSON.stringify(sample, null, 2), 'utf8');
      console.log('Arquivo JSON seed atualizado.');
    }catch(e){console.error('Erro ao gravar JSON seed', e.message)}
  }catch(err){
    console.error('Erro ao inicializar banco:', err.message);
  }finally{
    await connection.end();
  }
}

run();
