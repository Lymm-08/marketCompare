// ========================================
// IMPORTAÇÕES
// ========================================

// Modelo responsável pelas operações relacionadas aos preços
const Preco = require("../modelos/precoModelo");

// Modelo responsável pelas operações relacionadas aos produtos
const Produto = require("../modelos/produtoModelo");

// Modelo responsável pelas operações relacionadas aos supermercados
const Mercado = require("../modelos/mercadoModelo");


// ========================================
// LISTAR TODOS OS PREÇOS
// ========================================

exports.listar = async (req, res) => {
  try {

    // Busca todos os preços cadastrados no banco de dados
    const precos = await Preco.listarTodos();

    // Retorna a lista em formato JSON
    res.json(precos);

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro ao listar preços:", error);

    // Retorna erro para o cliente
    res.status(500).json({
      error: "Erro ao listar preços."
    });
  }
};


// ========================================
// CADASTRAR NOVO PREÇO
// ========================================

exports.criar = async (req, res) => {
  try {

    // Recebe os dados enviados pelo formulário
    const {
      produto_id,
      supermercado_id,
      valor,
      data_registro
    } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!produto_id || !supermercado_id || !valor || !data_registro)
      return res.status(400).json({
        error: "Todos os campos são obrigatórios."
      });

    // Busca o produto informado
    const produto = await Produto.obterPorId(produto_id);

    // Busca o supermercado informado
    const mercado = await Mercado.obterPorId(supermercado_id);

    // Verifica se o produto existe
    if (!produto)
      return res.status(400).json({
        error: "Produto não encontrado."
      });

    // Verifica se o supermercado existe
    if (!mercado)
      return res.status(400).json({
        error: "Supermercado não encontrado."
      });

    // Cria o novo registro de preço
    const preco = await Preco.criar({
      produto_id,
      supermercado_id,
      valor,
      data_registro
    });

    // Retorna o preço cadastrado com sucesso
    res.status(201).json(preco);

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro ao criar preço:", error);

    // Retorna erro para o cliente
    res.status(500).json({
      error: "Erro ao criar preço."
    });
  }
};