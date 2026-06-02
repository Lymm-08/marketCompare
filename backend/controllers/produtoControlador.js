const produtoModelo = require('../modelos/produtoModelo');

exports.listarProdutos = (req, res) => {
  const produtos = produtoModelo.listarProdutos();
  res.json(produtos);
};

exports.criarProduto = (req, res) => {
  const { nome } = req.body;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'O nome do produto é obrigatório.' });
  }

  const produto = produtoModelo.buscarPorNome(nome.trim());
  if (produto) {
    return res.status(409).json({ erro: 'Já existe um produto com esse nome.' });
  }

  const novoProduto = produtoModelo.criarProduto(nome.trim());
  res.status(201).json(novoProduto);
};

exports.atualizarProduto = (req, res) => {
  const id = Number(req.params.id);
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'O nome do produto é obrigatório.' });
  }

  const produto = produtoModelo.atualizarProduto(id, nome.trim());
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  res.json(produto);
};

exports.removerProduto = (req, res) => {
  const id = Number(req.params.id);
  const sucesso = produtoModelo.removerProduto(id);

  if (!sucesso) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  res.json({ mensagem: 'Produto removido com sucesso.' });
};
