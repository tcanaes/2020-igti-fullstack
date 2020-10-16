import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './routers/gradesRouter.js';
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));

//Middleware para permitir acessar arquivos na pasta public
app.use(express.static(path.join(__dirname, 'public')));
//Caso seja informado a RAIZ do servidor, redireciona para o INDEX.HTML
app.route('/').get(express.static(path.join(__dirname, 'public/index.html')));

app.use('/api/v1/grades', router);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} does not exists on this server`,
  });
});

export default app;
