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
const path = require('path');

// 2) Config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 3) Routes
const produtosRoute = require('./routes/produtos');
app.use('/produtos', produtosRoute);

// 3.1) Serve frontend static files so the app is available from a single link
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Fallback: send index.html for any non-API GET route (SPA behavior)
app.get('*', (req, res, next) => {
	if (req.path.startsWith('/produtos')) return next();
	res.sendFile(path.join(frontendPath, 'index.html'));
});

// 4) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`ContaCerta API rodando na porta ${PORT}`));
