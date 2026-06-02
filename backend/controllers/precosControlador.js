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

exports.listarPrecos = async (req, res) => {
  try {
    const precos = await precoModelo.listarPrecos();
    res.json(precos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar preços.' });
  }
};

exports.compararPrecos = async (req, res) => {
  try {
    const nomeProduto = (req.query.nome || '').trim();
    if (!nomeProduto) {
      return res.status(400).json({ erro: 'Informe o nome do produto para comparar.' });
    }

    const melhores = await precoModelo.compararPorProduto(nomeProduto);
    if (!melhores || melhores.length === 0) {
      return res.status(404).json({ erro: 'Nenhum preço encontrado para este produto.' });
    }

    res.json(melhores);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao comparar preços.' });
  }
};

exports.criarPreco = async (req, res) => {
  try {
    if (!validarEntrada(req, res)) return;

    const produtoNome = req.body.produto.trim();
    const lojaNome = req.body.loja.trim();
    const valor = Number(req.body.valor);

    let produto = await produtoModelo.buscarPorNome(produtoNome);
    if (!produto) {
      produto = await produtoModelo.criarProduto(produtoNome);
    }

    let loja = await lojaModelo.buscarPorNome(lojaNome);
    if (!loja) {
      loja = await lojaModelo.criarLoja(lojaNome);
    }

    const novoPreco = await precoModelo.criarPreco(produto.id, loja.id, valor);
    res.status(201).json(novoPreco);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar preço.' });
  }
};

exports.atualizarPreco = async (req, res) => {
  try {
    if (!validarEntrada(req, res)) return;

    const id = Number(req.params.id);
    const produtoNome = req.body.produto.trim();
    const lojaNome = req.body.loja.trim();
    const valor = Number(req.body.valor);

    const precoExistente = await precoModelo.buscarPorId(id);
    if (!precoExistente) {
      return res.status(404).json({ erro: 'Preço não encontrado.' });
    }

    let produto = await produtoModelo.buscarPorNome(produtoNome);
    if (!produto) {
      produto = await produtoModelo.criarProduto(produtoNome);
    }

    let loja = await lojaModelo.buscarPorNome(lojaNome);
    if (!loja) {
      loja = await lojaModelo.criarLoja(lojaNome);
    }

    const precoAtualizado = await precoModelo.atualizarPreco(id, produto.id, loja.id, valor);
    res.json(precoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar preço.' });
  }
};

exports.removerPreco = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sucesso = await precoModelo.removerPreco(id);

    if (!sucesso) {
      return res.status(404).json({ erro: 'Preço não encontrado.' });
    }

    res.json({ mensagem: 'Preço removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover preço.' });
  }
};
