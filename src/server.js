const app = require('./app');
const port = process.env.PORT || 3000;

//Inicia o servidor!
app.listen(port, () => {
    console.log(`Server executando na porta ${port}`);
});