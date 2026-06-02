const express = require('express');
const router = express.Router();
const precosControlador = require('../controllers/precosControlador');

router.get('/', precosControlador.listarPrecos);
router.get('/comparar', precosControlador.compararPrecos);
router.post('/', precosControlador.criarPreco);
router.put('/:id', precosControlador.atualizarPreco);
router.delete('/:id', precosControlador.removerPreco);

module.exports = router;
