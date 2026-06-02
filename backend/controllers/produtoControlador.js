const produtoModelo = require('../modelos/produtoModelo');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await produtoModelo.listarProdutos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar produtos.' });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: 'O nome do produto é obrigatório.' });
    }

    const produto = await produtoModelo.buscarPorNome(nome.trim());
    if (produto) {
      return res.status(409).json({ erro: 'Já existe um produto com esse nome.' });
    }

    const novoProduto = await produtoModelo.criarProduto(nome.trim());
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar produto.' });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: 'O nome do produto é obrigatório.' });
    }

    const produto = await produtoModelo.atualizarProduto(id, nome.trim());
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
};

exports.removerProduto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sucesso = await produtoModelo.removerProduto(id);

    if (!sucesso) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover produto.' });
  }
};
