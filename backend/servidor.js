// ========================================
// IMPORTAÇÃO DE CONFIGURAÇÕES E BIBLIOTECAS
// ========================================

// Carrega as variáveis do arquivo .env
require("dotenv").config();

// Framework principal da aplicação
const express = require("express");

// Utilitário para manipulação de caminhos de arquivos
const path = require("path");

// Permite requisições entre diferentes origens (frontend ↔ backend)
const cors = require("cors");


// ========================================
// IMPORTAÇÃO DAS ROTAS
// ========================================

const produtosRotas = require("./rotas/produtosRotas");
const mercadosRotas = require("./rotas/mercadosRotas");
const precosRotas = require("./rotas/precosRotas");
const pesquisaRotas = require("./rotas/pesquisaRotas");


// ========================================
// CONFIGURAÇÃO INICIAL DO SERVIDOR
// ========================================

const app = express();

// Define a porta do servidor
const port = process.env.PORT || 3000;


// ========================================
// MIDDLEWARES
// ========================================

// Permite comunicação entre frontend e backend
app.use(cors());

// Permite receber JSON nas requisições
app.use(express.json());

// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));


// ========================================
// ROTAS DA API
// ========================================

// Rotas relacionadas aos produtos
app.use("/api/produtos", produtosRotas);

// Rotas relacionadas aos supermercados
app.use("/api/mercados", mercadosRotas);

// Rotas relacionadas aos preços
app.use("/api/precos", precosRotas);

// Rotas relacionadas à pesquisa e comparação
app.use("/api/pesquisa", pesquisaRotas);


// ========================================
// FRONTEND ESTÁTICO
// ========================================

// Caminho da pasta frontend
const publicPath = path.join(__dirname, "../frontend");

// Permite servir arquivos estáticos (HTML, CSS e JS)
app.use(express.static(publicPath));

// Define a página inicial
app.get("/", (req, res) =>
  res.sendFile(path.join(publicPath, "index.html"))
);


// ========================================
// TRATAMENTO GLOBAL DE ERROS
// ========================================

app.use((err, req, res, next) => {

  // Exibe o erro no terminal
  console.error("Erro interno:", err);

  // Retorna mensagem amigável ao usuário
  res.status(500).json({
    error: "Erro interno do servidor."
  });
});


// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

// Inicia o servidor na porta configurada
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);