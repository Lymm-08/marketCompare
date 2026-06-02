const lojaModelo = require('../modelos/lojaModelo');

exports.listarLojas = (req, res) => {
  const lojas = lojaModelo.listarLojas();
  res.json(lojas);
};

exports.criarLoja = (req, res) => {
  const { nome } = req.body;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'O nome da loja é obrigatório.' });
  }

  const loja = lojaModelo.buscarPorNome(nome.trim());
  if (loja) {
    return res.status(409).json({ erro: 'Já existe uma loja com esse nome.' });
  }

  const novaLoja = lojaModelo.criarLoja(nome.trim());
  res.status(201).json(novaLoja);
};

exports.atualizarLoja = (req, res) => {
  const id = Number(req.params.id);
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'O nome da loja é obrigatório.' });
  }

  const loja = lojaModelo.atualizarLoja(id, nome.trim());
  if (!loja) {
    return res.status(404).json({ erro: 'Loja não encontrada.' });
  }

  res.json(loja);
};

exports.removerLoja = (req, res) => {
  const id = Number(req.params.id);
  const sucesso = lojaModelo.removerLoja(id);

  if (!sucesso) {
    return res.status(404).json({ erro: 'Loja não encontrada.' });
  }

  res.json({ mensagem: 'Loja removida com sucesso.' });
};
