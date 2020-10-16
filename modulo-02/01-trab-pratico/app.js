const express = require('express');
const path = require('path');
const brasilRouter = require('./routers/brasilRouter');

const app = express();
app.use(express.json({
  limit: '10kb'
}));

//Middleware para permitir acessar arquivos na pasta public
app.use(express.static(path.join(__dirname, 'public')));
//Caso seja informado a RAIZ do servidor, redireciona para o INDEX.HTML
app.route('/').get(express.static(path.join(__dirname, 'public/index.html')));

app.use('/api/v1/brasil', brasilRouter);

//Every request previous router were unable to catch
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} does not exists on this server`
  })
});

module.exports = app;