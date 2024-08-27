const express = require('express');
const usersRouter = require('./routes/users');
const postagensRouter = require('./routes/postagens');
const bodyParser = require('body-parser');
const categoriasRouter = require('./routes/categorias');
const comentariosRouter = require('./routes/comentarios');
const app = express();

app.use(bodyParser.json()); //Framework para uso de middleware

//Configura as rotas RESTFul
app.use('/postagens', postagensRouter);
app.use('/users', usersRouter);
app.use('/categorias', categoriasRouter);
app.use('/comentarios', comentariosRouter);

module.exports = app; //Exporta o aplicativo contendo as rotas