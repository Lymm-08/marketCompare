// ========================================
// IMPORTAÇÃO DA CONEXÃO COM O BANCO
// ========================================

// Importa a conexão com o banco de dados
const db = require("../config/db");


// ========================================
// MODELO PREÇO
// ========================================

// Responsável pelas operações da tabela precos
const Preco = {

  // ========================================
  // LISTAR TODOS OS PREÇOS
  // ========================================

  async listarTodos() {

    // Busca todos os preços cadastrados juntamente
    // com as informações do produto e supermercado
    const [rows] = await db.query(
`SELECT pr.id, p.id AS produto_id, p.nome AS produto,
        s.id AS supermercado_id, s.nome AS supermercado, s.endereco,
        pr.valor, pr.data_registro
 FROM precos pr
 JOIN produtos p ON p.id = pr.produto_id
 JOIN supermercados s ON s.id = pr.supermercado_id
 ORDER BY pr.data_registro DESC`
    );

    return rows;
  },


  // ========================================
  // LISTAR PREÇOS DE UM PRODUTO
  // ========================================

  async listarPorProduto(produtoId) {

    // Busca todos os preços cadastrados para um produto específico
    const [rows] = await db.query(
`SELECT pr.id, s.nome AS supermercado, s.endereco, pr.valor, pr.data_registro
 FROM precos pr
 JOIN supermercados s ON s.id = pr.supermercado_id
 WHERE pr.produto_id = ?
 ORDER BY pr.valor ASC, pr.data_registro DESC`,
      [produtoId]
    );

    return rows;
  },


  // ========================================
  // CADASTRAR PREÇO
  // ========================================

  async criar({ produto_id, supermercado_id, valor, data_registro }) {

    // Insere um novo preço na tabela
    const [result] = await db.query(
      "INSERT INTO precos (produto_id, supermercado_id, valor, data_registro) VALUES (?, ?, ?, ?)",
      [produto_id, supermercado_id, valor, data_registro]
    );

    // Retorna os dados cadastrados
    return {
      id: result.insertId,
      produto_id,
      supermercado_id,
      valor,
      data_registro
    };
  }
};


// ========================================
// EXPORTAÇÃO DO MODELO
// ========================================

// Disponibiliza o modelo para outros arquivos
module.exports = Preco;