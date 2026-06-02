const lojaModelo = require('../modelos/lojaModelo');

exports.listarLojas = async (req, res) => {
  try {
    const lojas = await lojaModelo.listarLojas();
    res.json(lojas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar lojas.' });
  }
};

exports.criarLoja = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: 'O nome da loja é obrigatório.' });
    }

    const loja = await lojaModelo.buscarPorNome(nome.trim());
    if (loja) {
      return res.status(409).json({ erro: 'Já existe uma loja com esse nome.' });
    }

    const novaLoja = await lojaModelo.criarLoja(nome.trim());
    res.status(201).json(novaLoja);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar loja.' });
  }
};

exports.atualizarLoja = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: 'O nome da loja é obrigatório.' });
    }

    const loja = await lojaModelo.atualizarLoja(id, nome.trim());
    if (!loja) {
      return res.status(404).json({ erro: 'Loja não encontrada.' });
    }

    res.json(loja);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar loja.' });
  }
};

exports.removerLoja = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const sucesso = await lojaModelo.removerLoja(id);

    if (!sucesso) {
      return res.status(404).json({ erro: 'Loja não encontrada.' });
    }

    res.json({ mensagem: 'Loja removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover loja.' });
  }
};
