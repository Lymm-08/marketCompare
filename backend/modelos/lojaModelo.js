let lojas = [];
let proximoId = 1;

exports.listarLojas = () => lojas;

exports.buscarPorId = (id) => lojas.find((item) => item.id === id) || null;

exports.buscarPorNome = (nome) => lojas.find((item) => item.nome.toLowerCase() === nome.toLowerCase()) || null;

exports.criarLoja = (nome) => {
  const novaLoja = { id: proximoId++, nome };
  lojas.push(novaLoja);
  return novaLoja;
};

exports.atualizarLoja = (id, nome) => {
  const loja = exports.buscarPorId(id);
  if (!loja) return null;
  loja.nome = nome;
  return loja;
};

exports.removerLoja = (id) => {
  const indice = lojas.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  lojas.splice(indice, 1);
  return true;
};

// TODO: Substituir por queries MySQL usando backend/config/db.js quando for integrar o banco.
