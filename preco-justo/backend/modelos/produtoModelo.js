// ========================================
// IMPORTAÇÃO DA CONEXÃO COM O BANCO
// ========================================

// Importa a conexão com o banco de dados
const db = require("../config/db");


// ========================================
// MODELO PRODUTO
// ========================================

// Responsável pelas operações da tabela produtos
const Produto = {

  // ========================================
  // LISTAR TODOS OS PRODUTOS
  // ========================================

  async listarTodos() {

    // Busca todos os produtos cadastrados
    // ordenados alfabeticamente pelo nome
    const [rows] = await db.query(
      "SELECT id, nome, categoria FROM produtos ORDER BY nome"
    );

    return rows;
  },


  // ========================================
  // BUSCAR PRODUTO POR ID
  // ========================================

  async obterPorId(id) {

    // Busca um produto específico pelo ID
    const [rows] = await db.query(
      "SELECT id, nome, categoria FROM produtos WHERE id = ?",
      [id]
    );

    // Retorna o primeiro resultado encontrado
    return rows[0];
  },


  // ========================================
  // BUSCAR PRODUTO POR NOME
  // ========================================

  async buscarPorNome(nome) {

    // Adiciona curingas (%) para permitir busca parcial
    const termo = `%${nome}%`;

    // Busca produtos cujo nome contenha o texto informado
    const [rows] = await db.query(
      "SELECT id, nome, categoria FROM produtos WHERE nome LIKE ? ORDER BY nome",
      [termo]
    );

    return rows;
  },


  // ========================================
  // CADASTRAR PRODUTO
  // ========================================

  async criar({ nome, categoria }) {

    // Insere um novo produto na tabela
    const [result] = await db.query(
      "INSERT INTO produtos (nome, categoria) VALUES (?, ?)",
      [nome, categoria]
    );

    // Retorna os dados cadastrados
    return {
      id: result.insertId,
      nome,
      categoria
    };
  }
};


// ========================================
// EXPORTAÇÃO DO MODELO
// ========================================

// Disponibiliza o modelo para outros arquivos
module.exports = Produto;