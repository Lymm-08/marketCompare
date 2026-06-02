const express = require('express');
const router = express.Router();
const produtoControlador = require('../controllers/produtoControlador');

router.get('/', produtoControlador.listarProdutos);
router.post('/', produtoControlador.criarProduto);
router.put('/:id', produtoControlador.atualizarProduto);
router.delete('/:id', produtoControlador.removerProduto);

module.exports = router;
