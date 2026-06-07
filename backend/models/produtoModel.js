/* produtoModel.js
   Sessões:
   1) Imports
   2) Helper: JSON persistence (local)
   3) Produto: CRUD + search

   Observação: grava tanto no MySQL quanto em `backend/data/products.json` para facilitar testes.
*/

// 1) Imports
const db = require('../config/database');
const fs = require('fs');
const path = require('path');
const jsonFile = path.join(__dirname,'..','data','products.json');

// 2) JSON helper
function writeJson(data){
  try{ fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), 'utf8'); }
  catch(e){ console.error('Erro ao escrever JSON:', e.message); }
}

// 3) Produto model
const Produto = {
  // cria um novo produto no MySQL e anexa ao arquivo JSON local
  async create(data){
    const sql = `INSERT INTO produtos (nome_produto,nome_mercado,endereco,preco) VALUES (?,?,?,?)`;
    const [res] = await db.execute(sql,[data.nome_produto,data.nome_mercado,data.endereco,data.preco]);
    const created = {id: res.insertId, ...data};
    // append to JSON file (silencioso em erro)
    try{
      const curr = JSON.parse(fs.readFileSync(jsonFile,'utf8') || '[]');
      curr.push(created);
      writeJson(curr);
    }catch(e){ console.error('Erro atualizando JSON:', e.message); }
    return created;
  },

  // retorna todos os produtos (ordem decrescente por id)
  async findAll(){
    const [rows] = await db.execute(`SELECT * FROM produtos ORDER BY id DESC`);
    return rows;
  },

  // retorna um produto por id
  async findById(id){
    const [rows] = await db.execute(`SELECT * FROM produtos WHERE id = ?`,[id]);
    return rows[0];
  },

  // atualiza campos fornecidos
  async update(id, data){
    const fields = [];
    const values = [];
    for(const k of ['nome_produto','nome_mercado','endereco','preco']){
      if(data[k] !== undefined){ fields.push(`${k} = ?`); values.push(data[k]); }
    }
    if(fields.length===0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE produtos SET ${fields.join(', ')} WHERE id = ?`;
    await db.execute(sql, values);
    return this.findById(id);
  },

  // remove um produto
  async remove(id){
    await db.execute(`DELETE FROM produtos WHERE id = ?`,[id]);
    return true;
  },

  // busca por nome (case-insensitive) e retorna até 3 registros com menor preço
  async searchByName(nome){
    const like = `%${nome}%`;
    const [rows] = await db.execute(`SELECT nome_mercado, endereco, preco, nome_produto FROM produtos WHERE LOWER(nome_produto) LIKE LOWER(?) ORDER BY preco ASC LIMIT 3`,[like]);
    return rows;
  }
}

module.exports = Produto;
