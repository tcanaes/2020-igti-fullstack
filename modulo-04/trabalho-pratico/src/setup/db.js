import mongoose from 'mongoose';

// Monta o endereço de acesso ao banco de dados
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
const DB = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Conecta ao banco de dados
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    authSource: 'admin',
  })
  .then(() => {
    console.log('Sucesso ao se conectar ao DB! :)');
  })
  .catch((err) => {
    console.log('Erro ao se conectar ao servidor!');
    process.exit();
  });
