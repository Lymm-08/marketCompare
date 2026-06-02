const { pool } = require('../config/db');

let produtos = [];
let proximoId = 1;

async function listarProdutosDB() {
  const [rows] = await pool.query('SELECT id, nome FROM produtos ORDER BY nome');
  return rows;
}

async function buscarPorIdDB(id) {
  const [rows] = await pool.query('SELECT id, nome FROM produtos WHERE id = ?', [id]);
  return rows[0] || null;
}

async function buscarPorNomeDB(nome) {
  const [rows] = await pool.query('SELECT id, nome FROM produtos WHERE LOWER(nome)=LOWER(?)', [nome]);
  return rows[0] || null;
}

async function criarProdutoDB(nome) {
  const [result] = await pool.query('INSERT INTO produtos (nome) VALUES (?)', [nome]);
  return { id: result.insertId, nome };
}

async function atualizarProdutoDB(id, nome) {
  await pool.query('UPDATE produtos SET nome = ? WHERE id = ?', [nome, id]);
  return buscarPorIdDB(id);
}

async function removerProdutoDB(id) {
  const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

exports.listarProdutos = async () => {
  if (pool) return listarProdutosDB();
  return produtos;
};

exports.buscarPorId = async (id) => {
  if (pool) return buscarPorIdDB(id);
  return produtos.find((item) => item.id === id) || null;
};

exports.buscarPorNome = async (nome) => {
  if (pool) return buscarPorNomeDB(nome);
  return produtos.find((item) => item.nome.toLowerCase() === nome.toLowerCase()) || null;
};

exports.criarProduto = async (nome) => {
  if (pool) return criarProdutoDB(nome);
  const novoProduto = { id: proximoId++, nome };
  produtos.push(novoProduto);
  return novoProduto;
};

exports.atualizarProduto = async (id, nome) => {
  if (pool) return atualizarProdutoDB(id, nome);
  const produto = produtos.find((item) => item.id === id);
  if (!produto) return null;
  produto.nome = nome;
  return produto;
};

exports.removerProduto = async (id) => {
  if (pool) return removerProdutoDB(id);
  const indice = produtos.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  produtos.splice(indice, 1);
  return true;
};

// Nota: quando o MySQL estiver configurado, as operações usarão a pool.
