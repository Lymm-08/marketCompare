const produtoModelo = require('./produtoModelo');
const lojaModelo = require('./lojaModelo');

let precos = [];
let proximoId = 1;

function montarPrecoCompleto(preco) {
  const produto = produtoModelo.buscarPorId(preco.produtoId) || { nome: 'Produto removido' };
  const loja = lojaModelo.buscarPorId(preco.lojaId) || { nome: 'Loja removida' };
  return {
    id: preco.id,
    produtoId: preco.produtoId,
    lojaId: preco.lojaId,
    produto: produto.nome,
    loja: loja.nome,
    valor: preco.valor,
  };
}

exports.listarPrecos = () => precos.map(montarPrecoCompleto);

exports.buscarPorId = (id) => precos.find((item) => item.id === id) || null;

exports.criarPreco = (produtoId, lojaId, valor) => {
  const novoPreco = { id: proximoId++, produtoId, lojaId, valor };
  precos.push(novoPreco);
  return montarPrecoCompleto(novoPreco);
};

exports.atualizarPreco = (id, produtoId, lojaId, valor) => {
  const preco = exports.buscarPorId(id);
  if (!preco) return null;
  preco.produtoId = produtoId;
  preco.lojaId = lojaId;
  preco.valor = valor;
  return montarPrecoCompleto(preco);
};

exports.removerPreco = (id) => {
  const indice = precos.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  precos.splice(indice, 1);
  return true;
};

exports.compararPorProduto = (nomeProduto) => {
  const resultado = exports.listarPrecos().filter((preco) =>
    preco.produto.toLowerCase().includes(nomeProduto.toLowerCase())
  );
  return resultado.sort((a, b) => a.valor - b.valor);
};

// TODO: Substituir por queries MySQL usando backend/config/db.js quando for integrar o banco.
