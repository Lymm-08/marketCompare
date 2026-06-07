/* produtos.js (routes)
	Sessões:
	1) Imports
	2) Route definitions

	Responsabilidade: expor rotas REST para recursos `produtos`.
*/

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtoController');

// 2) Routes
router.get('/', ctrl.list);
// colocar a rota de busca antes da rota por id para evitar conflito com ':id'
router.get('/busca/:nome', ctrl.search);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
