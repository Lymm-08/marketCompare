// ========================================
// IMPORTAÇÃO DO MODELO
// ========================================

// Importa o modelo Mercado, responsável pelas operações no banco de dados
const Mercado = require("../modelos/mercadoModelo");


// ========================================
// LISTAR SUPERMERCADOS
// ========================================

exports.listar = async (req, res) => {
  try {

    // Busca todos os supermercados cadastrados
    const mercados = await Mercado.listarTodos();

    // Retorna a lista em formato JSON
    res.json(mercados);

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro ao listar supermercados:", error);

    // Retorna erro para o cliente
    res.status(500).json({ error: "Erro ao listar supermercados." });
  }
};


// ========================================
// CRIAR SUPERMERCADO
// ========================================

exports.criar = async (req, res) => {
  try {

    // Recebe os dados enviados pelo front-end
    const { nome, endereco } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !endereco)
      return res.status(400).json({
        error: "Nome e endereço obrigatórios."
      });

    // Cria um novo supermercado no banco de dados
    const mercado = await Mercado.criar({
      nome,
      endereco
    });

    // Retorna o supermercado criado
    res.status(201).json(mercado);

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro ao criar supermercado:", error);

    // Retorna erro para o cliente
    res.status(500).json({
      error: "Erro ao criar supermercado."
    });
  }
};