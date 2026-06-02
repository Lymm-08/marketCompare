const { pool } = require('../config/db');

let lojas = [];
let proximoId = 1;

async function listarLojasDB() {
  const [rows] = await pool.query('SELECT id, nome FROM lojas ORDER BY nome');
  return rows;
}

async function buscarPorIdDB(id) {
  const [rows] = await pool.query('SELECT id, nome FROM lojas WHERE id = ?', [id]);
  return rows[0] || null;
}

async function buscarPorNomeDB(nome) {
  const [rows] = await pool.query('SELECT id, nome FROM lojas WHERE LOWER(nome)=LOWER(?)', [nome]);
  return rows[0] || null;
}

async function criarLojaDB(nome) {
  const [result] = await pool.query('INSERT INTO lojas (nome) VALUES (?)', [nome]);
  return { id: result.insertId, nome };
}

async function atualizarLojaDB(id, nome) {
  await pool.query('UPDATE lojas SET nome = ? WHERE id = ?', [nome, id]);
  return buscarPorIdDB(id);
}

async function removerLojaDB(id) {
  const [result] = await pool.query('DELETE FROM lojas WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

exports.listarLojas = async () => {
  if (pool) return listarLojasDB();
  return lojas;
};

exports.buscarPorId = async (id) => {
  if (pool) return buscarPorIdDB(id);
  return lojas.find((item) => item.id === id) || null;
};

exports.buscarPorNome = async (nome) => {
  if (pool) return buscarPorNomeDB(nome);
  return lojas.find((item) => item.nome.toLowerCase() === nome.toLowerCase()) || null;
};

exports.criarLoja = async (nome) => {
  if (pool) return criarLojaDB(nome);
  const novaLoja = { id: proximoId++, nome };
  lojas.push(novaLoja);
  return novaLoja;
};

exports.atualizarLoja = async (id, nome) => {
  if (pool) return atualizarLojaDB(id, nome);
  const loja = lojas.find((item) => item.id === id);
  if (!loja) return null;
  loja.nome = nome;
  return loja;
};

exports.removerLoja = async (id) => {
  if (pool) return removerLojaDB(id);
  const indice = lojas.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  lojas.splice(indice, 1);
  return true;
};

// Nota: quando o MySQL estiver configurado, as operações usarão a pool.
