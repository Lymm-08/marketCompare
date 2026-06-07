const db = require('../config/database');

const Produto = {
  async create(data){
    const sql = `INSERT INTO produtos (nome_produto,nome_mercado,endereco,preco) VALUES (?,?,?,?)`;
    const [res] = await db.execute(sql,[data.nome_produto,data.nome_mercado,data.endereco,data.preco]);
    return {id: res.insertId, ...data};
  },
  async findAll(){
    const [rows] = await db.execute(`SELECT * FROM produtos ORDER BY id DESC`);
    return rows;
  },
  async findById(id){
    const [rows] = await db.execute(`SELECT * FROM produtos WHERE id = ?`,[id]);
    return rows[0];
  },
  async update(id, data){
    const fields = [];
    const values = [];
    for(const k of ['nome_produto','nome_mercado','endereco','preco']){
      if(data[k] !== undefined){fields.push(`${k} = ?`);values.push(data[k]);}
    }
    if(fields.length===0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE produtos SET ${fields.join(', ')} WHERE id = ?`;
    await db.execute(sql, values);
    return this.findById(id);
  },
  async remove(id){
    await db.execute(`DELETE FROM produtos WHERE id = ?`,[id]);
    return true;
  },
  async searchByName(nome){
    // Search by nome_produto (case-insensitive) and return 3 lowest prices
    const like = `%${nome}%`;
    const [rows] = await db.execute(`SELECT nome_mercado, endereco, preco, nome_produto FROM produtos WHERE nome_produto LIKE ? ORDER BY preco ASC LIMIT 3`,[like]);
    return rows;
  }
}

module.exports = Produto;
