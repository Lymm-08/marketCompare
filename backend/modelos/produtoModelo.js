let produtos = [];
let proximoId = 1;

exports.listarProdutos = () => produtos;

exports.buscarPorId = (id) => produtos.find((item) => item.id === id) || null;

exports.buscarPorNome = (nome) => produtos.find((item) => item.nome.toLowerCase() === nome.toLowerCase()) || null;

exports.criarProduto = (nome) => {
  const novoProduto = { id: proximoId++, nome };
  produtos.push(novoProduto);
  return novoProduto;
};

exports.atualizarProduto = (id, nome) => {
  const produto = exports.buscarPorId(id);
  if (!produto) return null;
  produto.nome = nome;
  return produto;
};

exports.removerProduto = (id) => {
  const indice = produtos.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  produtos.splice(indice, 1);
  return true;
};

// TODO: Substituir por queries MySQL usando backend/config/db.js quando for integrar o banco.
