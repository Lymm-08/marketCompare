// ========================================
// IMPORTAÇÃO DA CONEXÃO COM O BANCO
// ========================================

// Importa a conexão com o banco de dados
const db = require("../config/db");


// ========================================
// MODELO MERCADO
// ========================================

// Responsável pelas operações da tabela supermercados
const Mercado = {

  // ========================================
  // LISTAR TODOS OS SUPERMERCADOS
  // ========================================

  async listarTodos() {

    // Busca todos os supermercados ordenados pelo nome
    const [rows] = await db.query(
      "SELECT id, nome, endereco FROM supermercados ORDER BY nome"
    );

    return rows;
  },


  // ========================================
  // BUSCAR SUPERMERCADO POR ID
  // ========================================

  async obterPorId(id) {

    // Busca um supermercado específico pelo ID
    const [rows] = await db.query(
      "SELECT id, nome, endereco FROM supermercados WHERE id = ?",
      [id]
    );

    // Retorna o primeiro resultado encontrado
    return rows[0];
  },


  // ========================================
  // CADASTRAR SUPERMERCADO
  // ========================================

  async criar({ nome, endereco }) {

    // Insere um novo supermercado no banco de dados
    const [result] = await db.query(
      "INSERT INTO supermercados (nome, endereco) VALUES (?, ?)",
      [nome, endereco]
    );

    // Retorna os dados do supermercado criado
    return {
      id: result.insertId,
      nome,
      endereco
    };
  }
};


// ========================================
// EXPORTAÇÃO DO MODELO
// ========================================

// Disponibiliza o modelo para outros arquivos
module.exports = Mercado;