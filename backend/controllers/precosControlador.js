const produtoModelo = require('../modelos/produtoModelo');
const lojaModelo = require('../modelos/lojaModelo');
const precoModelo = require('../modelos/pecoModelo');

function validarEntrada(req, res) {
  const { produto, loja, valor } = req.body;

  if (!produto || !produto.trim() || !loja || !loja.trim() || valor === undefined || valor === null || valor === '') {
    res.status(400).json({ erro: 'Produto, loja e preço são obrigatórios.' });
    return false;
  }

  if (Number.isNaN(Number(valor)) || Number(valor) < 0) {
    res.status(400).json({ erro: 'Preço inválido. Use um número positivo.' });
    return false;
  }

  return true;
}

exports.listarPrecos = (req, res) => {
  const precos = precoModelo.listarPrecos();
  res.json(precos);
};

exports.compararPrecos = (req, res) => {
  const nomeProduto = (req.query.nome || '').trim();
  if (!nomeProduto) {
    return res.status(400).json({ erro: 'Informe o nome do produto para comparar.' });
  }

  const melhores = precoModelo.compararPorProduto(nomeProduto);
  if (!melhores || melhores.length === 0) {
    return res.status(404).json({ erro: 'Nenhum preço encontrado para este produto.' });
  }

  res.json(melhores);
};

exports.criarPreco = (req, res) => {
  if (!validarEntrada(req, res)) return;

  const produtoNome = req.body.produto.trim();
  const lojaNome = req.body.loja.trim();
  const valor = Number(req.body.valor);

  let produto = produtoModelo.buscarPorNome(produtoNome);
  if (!produto) {
    produto = produtoModelo.criarProduto(produtoNome);
  }

  let loja = lojaModelo.buscarPorNome(lojaNome);
  if (!loja) {
    loja = lojaModelo.criarLoja(lojaNome);
  }

  const novoPreco = precoModelo.criarPreco(produto.id, loja.id, valor);
  res.status(201).json(novoPreco);
};

exports.atualizarPreco = (req, res) => {
  if (!validarEntrada(req, res)) return;

  const id = Number(req.params.id);
  const produtoNome = req.body.produto.trim();
  const lojaNome = req.body.loja.trim();
  const valor = Number(req.body.valor);

  const precoExistente = precoModelo.buscarPorId(id);
  if (!precoExistente) {
    return res.status(404).json({ erro: 'Preço não encontrado.' });
  }

  let produto = produtoModelo.buscarPorNome(produtoNome);
  if (!produto) {
    produto = produtoModelo.criarProduto(produtoNome);
  }

  let loja = lojaModelo.buscarPorNome(lojaNome);
  if (!loja) {
    loja = lojaModelo.criarLoja(lojaNome);
  }

  const precoAtualizado = precoModelo.atualizarPreco(id, produto.id, loja.id, valor);
  res.json(precoAtualizado);
};

exports.removerPreco = (req, res) => {
  const id = Number(req.params.id);
  const sucesso = precoModelo.removerPreco(id);

  if (!sucesso) {
    return res.status(404).json({ erro: 'Preço não encontrado.' });
  }

  res.json({ mensagem: 'Preço removido com sucesso.' });
};
