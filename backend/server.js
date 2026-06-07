/* server.js
	Sessões:
	1) Imports
	2) Config / Middlewares
	3) Routes
	4) Start server

	Responsabilidade: ponto de entrada do backend Express.
*/

// 1) Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 2) Config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 3) Routes
const produtosRoute = require('./routes/produtos');
app.use('/produtos', produtosRoute);

// 4) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`ContaCerta API rodando na porta ${PORT}`));
