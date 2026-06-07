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
router.get('/busca/:nome', ctrl.search);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
