const express = require('express');
const router = express.Router();
const lojasControlador = require('../controllers/lojasControlador');

router.get('/', lojasControlador.listarLojas);
router.post('/', lojasControlador.criarLoja);
router.put('/:id', lojasControlador.atualizarLoja);
router.delete('/:id', lojasControlador.removerLoja);

module.exports = router;
