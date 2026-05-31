// ========================================
// IMPORTAÇÃO DO MODELO
// ========================================

const Produto = require('../modelos/produtoModelo');


// ========================================
// LISTAR PRODUTOS
// ========================================

exports.listar = async (req, res) => {
  try {

    // Busca todos os produtos cadastrados
    const produtos = await Produto.listarTodos();

    // Retorna os produtos em formato JSON
    return res.json(produtos);

  } catch (error) {

    // Exibe o erro no terminal
    console.error('Erro ao listar produtos:', error);

    // Retorna erro para o cliente
    return res.status(500).json({
      error: 'Erro ao listar produtos.'
    });
  }
};


// ========================================
// CADASTRAR PRODUTO
// ========================================

exports.criar = async (req, res) => {
  try {

    // Recebe os dados enviados pelo formulário
    const { nome, categoria } = req.body;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nome || !categoria) {
      return res.status(400).json({
        error: 'Nome e categoria obrigatórios.'
      });
    }

    // Remove espaços extras antes de salvar
    const novoProduto = {
      nome: String(nome).trim(),
      categoria: String(categoria).trim()
    };

    // Cria o produto no banco de dados
    const produtoCriado = await Produto.criar(novoProduto);

    // Retorna o produto criado
    return res.status(201).json(produtoCriado);

  } catch (error) {

    // Exibe o erro no terminal
    console.error('Erro ao criar produto:', error);

    // Retorna erro para o cliente
    return res.status(500).json({
      error: 'Erro ao criar produto.'
    });
  }
};