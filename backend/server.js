const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const produtosRoute = require('./routes/produtos');
app.use('/produtos', produtosRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`ContaCerta API rodando na porta ${PORT}`));
