// ========================================
// IMPORTAÇÕES
// ========================================

// Modelo responsável pelas operações relacionadas aos produtos
const Produto = require("../modelos/produtoModelo");

// Conexão com o banco de dados
const db = require("../config/db");


// ========================================
// PESQUISAR PRODUTOS
// ========================================

exports.pesquisar = async (req, res) => {
  try {

    // Obtém o termo digitado pelo usuário na URL
    // Exemplo: /api/produtos/pesquisar?q=arroz
    const q = String(req.query.q || "").trim();

    // Verifica se foi informado algum termo de busca
    if (!q)
      return res.status(400).json({
        error: "Informe termo de busca."
      });

    // Adiciona curingas (%) para permitir busca parcial
    const termo = `%${q}%`;

    // Consulta os produtos e retorna o menor preço encontrado
    const [rows] = await db.query(
`SELECT p.id, p.nome, p.categoria, MIN(pr.valor) AS melhor_preco
 FROM produtos p
 LEFT JOIN precos pr ON pr.produto_id = p.id
 WHERE p.nome LIKE ?
 GROUP BY p.id, p.nome, p.categoria
 ORDER BY melhor_preco IS NULL, melhor_preco ASC, p.nome ASC`,
      [termo]
    );

    // Retorna os resultados encontrados
    res.json(rows);

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro na pesquisa:", error);

    // Retorna erro para o cliente
    res.status(500).json({
      error: "Erro na pesquisa."
    });
  }
};


// ========================================
// COMPARAR PREÇOS DE UM PRODUTO
// ========================================

exports.comparar = async (req, res) => {
  try {

    // Obtém o ID do produto enviado pela URL
    const produtoId = parseInt(req.params.produtoId, 10);

    // Valida se o ID é numérico
    if (Number.isNaN(produtoId))
      return res.status(400).json({
        error: "ID inválido."
      });

    // Busca o produto pelo ID
    const produto = await Produto.obterPorId(produtoId);

    // Verifica se o produto existe
    if (!produto)
      return res.status(404).json({
        error: "Produto não encontrado."
      });

    // Busca todos os preços cadastrados para o produto
    const [precos] = await db.query(
`SELECT pr.id, s.nome AS supermercado, s.endereco, pr.valor, pr.data_registro
 FROM precos pr
 JOIN supermercados s ON s.id = pr.supermercado_id
 WHERE pr.produto_id = ?
 ORDER BY pr.valor ASC, pr.data_registro DESC`,
      [produtoId]
    );

    // Cria uma lista apenas com os valores dos preços
    const valores = precos.map(p => parseFloat(p.valor));

    // Obtém o menor preço encontrado
    const melhor = valores.length
      ? Math.min(...valores)
      : null;

    // Obtém o maior preço encontrado
    const pior = valores.length
      ? Math.max(...valores)
      : null;

    // Calcula a economia possível
    const economia =
      melhor !== null && pior !== null
        ? parseFloat((pior - melhor).toFixed(2))
        : 0;

    // Retorna todas as informações para o front-end
    res.json({
      produto,
      precos,
      melhor_preco: melhor,
      economia
    });

  } catch (error) {

    // Exibe o erro no terminal
    console.error("Erro na comparação:", error);

    // Retorna erro para o cliente
    res.status(500).json({
      error: "Erro na comparação."
    });
  }
};