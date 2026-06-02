const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const lojasRotas = require('./rotas/lojasRotas');
const produtoRotas = require('./rotas/produtoRotas');
const precosRotas = require('./rotas/precosRotas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/lojas', lojasRotas);
app.use('/api/produtos', produtoRotas);
app.use('/api/precos', precosRotas);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
