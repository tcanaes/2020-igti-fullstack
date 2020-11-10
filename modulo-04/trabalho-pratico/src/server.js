import './setup/envVar.js';
import express from 'express';
import cors from 'cors';
import transactionRouter from './routers/transactionRouter.js';
import './setup/db.js';

const { PORT } = process.env;

const app = express();
app.use(cors());
app.options('*', cors());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));

app.use('/api/my-bank/v1/', transactionRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Caminho inválido',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}...`);
});
