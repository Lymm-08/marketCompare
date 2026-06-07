const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtoController');

router.get('/', ctrl.list);
router.get('/busca/:nome', ctrl.search);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
