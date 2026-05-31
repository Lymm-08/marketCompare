const express = require("express");
const { pesquisar, comparar } = require("../controladores/pesquisaControlador");
const router = express.Router();
router.get("/", pesquisar);
router.get("/comparar/:produtoId", comparar);
module.exports = router;
