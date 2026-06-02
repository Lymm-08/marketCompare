const { pool } = require('../config/db');
const produtoModelo = require('./produtoModelo');
const lojaModelo = require('./lojaModelo');

let precos = [];
let proximoId = 1;

function montarPrecoCompleto(preco, produtoNome, lojaNome) {
  return {
    id: preco.id,
    produtoId: preco.produtoId,
    lojaId: preco.lojaId,
    produto: produtoNome || preco.produto || 'Produto removido',
    loja: lojaNome || preco.loja || 'Loja removida',
    valor: preco.valor,
  };
}

async function listarPrecosDB() {
  const [rows] = await pool.query(
    `SELECT p.id, p.produto_id AS produtoId, p.loja_id AS lojaId, pr.nome AS produto, l.nome AS loja, p.valor
     FROM precos p
     JOIN produtos pr ON pr.id = p.produto_id
     JOIN lojas l ON l.id = p.loja_id
     ORDER BY p.id DESC`
  );
  return rows.map((r) => ({ id: r.id, produtoId: r.produtoId, lojaId: r.lojaId, produto: r.produto, loja: r.loja, valor: Number(r.valor) }));
}

async function buscarPorIdDB(id) {
  const [rows] = await pool.query(
    `SELECT p.id, p.produto_id AS produtoId, p.loja_id AS lojaId, pr.nome AS produto, l.nome AS loja, p.valor
     FROM precos p
     JOIN produtos pr ON pr.id = p.produto_id
     JOIN lojas l ON l.id = p.loja_id
     WHERE p.id = ?`,
    [id]
  );
  const r = rows[0];
  if (!r) return null;
  return { id: r.id, produtoId: r.produtoId, lojaId: r.lojaId, produto: r.produto, loja: r.loja, valor: Number(r.valor) };
}

async function criarPrecoDB(produtoId, lojaId, valor) {
  const [result] = await pool.query('INSERT INTO precos (produto_id, loja_id, valor) VALUES (?,?,?)', [produtoId, lojaId, valor]);
  return buscarPorIdDB(result.insertId);
}

async function atualizarPrecoDB(id, produtoId, lojaId, valor) {
  await pool.query('UPDATE precos SET produto_id = ?, loja_id = ?, valor = ? WHERE id = ?', [produtoId, lojaId, valor, id]);
  return buscarPorIdDB(id);
}

async function removerPrecoDB(id) {
  const [result] = await pool.query('DELETE FROM precos WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

exports.listarPrecos = async () => {
  if (pool) return listarPrecosDB();
  return precos.map((p) => montarPrecoCompleto(p));
};

exports.buscarPorId = async (id) => {
  if (pool) return buscarPorIdDB(id);
  return precos.find((item) => item.id === id) || null;
};

exports.criarPreco = async (produtoId, lojaId, valor) => {
  if (pool) return criarPrecoDB(produtoId, lojaId, valor);
  const novoPreco = { id: proximoId++, produtoId, lojaId, valor };
  precos.push(novoPreco);

  const produto = await produtoModelo.buscarPorId(produtoId);
  const loja = await lojaModelo.buscarPorId(lojaId);
  return montarPrecoCompleto(novoPreco, produto && produto.nome, loja && loja.nome);
};

exports.atualizarPreco = async (id, produtoId, lojaId, valor) => {
  if (pool) return atualizarPrecoDB(id, produtoId, lojaId, valor);
  const preco = precos.find((item) => item.id === id);
  if (!preco) return null;
  preco.produtoId = produtoId;
  preco.lojaId = lojaId;
  preco.valor = valor;
  const produto = await produtoModelo.buscarPorId(produtoId);
  const loja = await lojaModelo.buscarPorId(lojaId);
  return montarPrecoCompleto(preco, produto && produto.nome, loja && loja.nome);
};

exports.removerPreco = async (id) => {
  if (pool) return removerPrecoDB(id);
  const indice = precos.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  precos.splice(indice, 1);
  return true;
};

exports.compararPorProduto = async (nomeProduto) => {
  if (pool) {
    const [rows] = await pool.query(
      `SELECT p.id, p.produto_id AS produtoId, p.loja_id AS lojaId, pr.nome AS produto, l.nome AS loja, p.valor
       FROM precos p
       JOIN produtos pr ON pr.id = p.produto_id
       JOIN lojas l ON l.id = p.loja_id
       WHERE LOWER(pr.nome) LIKE LOWER(?)
       ORDER BY p.valor ASC`,
      [`%${nomeProduto}%`]
    );
    return rows.map((r) => ({ id: r.id, produtoId: r.produtoId, lojaId: r.lojaId, produto: r.produto, loja: r.loja, valor: Number(r.valor) }));
  }

  const resultado = precos.map((p) => ({ id: p.id, produtoId: p.produtoId, lojaId: p.lojaId, valor: p.valor })).filter((preco) => {
    const produto = produtoModelo.buscarPorId(preco.produtoId); // may be sync in-memory or promise
    const nome = produto && produto.nome ? produto.nome.toLowerCase() : '';
    return nome.includes(nomeProduto.toLowerCase());
  });
  return resultado.sort((a, b) => a.valor - b.valor);
};

// Nota: quando o MySQL estiver configurado, as operações usarão a pool.
