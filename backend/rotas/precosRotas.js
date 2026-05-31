const express = require("express");
const { listar, criar } = require("../controladores/precosControlador");
const router = express.Router();
router.get("/", listar);
router.post("/", criar);
module.exports = router;
