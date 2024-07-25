const express = require('express');
const app = express();
const postagensRouter = require('./postagens');
const usersRouter = require('./users');
const categoriasRouter = require('./categorias');
const comentariosRouter = require('./comentarios');
const port = 3000;

app.use(express.json());

app.use('/postagens', postagensRouter);
app.use('/users', usersRouter);
app.use('/categorias', categoriasRouter);
app.use('/comentarios', comentariosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});