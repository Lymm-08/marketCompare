const express = require("express");
const { listar, criar } = require("../controladores/mercadosControlador");
const router = express.Router();
router.get("/", listar);
router.post("/", criar);
module.exports = router;
