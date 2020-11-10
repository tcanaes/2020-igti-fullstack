//const fs = require('fs');
import * as fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Account from '../models/accountModel.js';
import Transaction from '../models/transactionModel.js';

// Carrega variaveis do ambiente
dotenv.config({ path: './.env' });

const startBatch = async () => {
  // 1 ) Apagar todos os registros da DB
  console.log('--------------------------------------------------------------');
  console.log('Excluindo registros...');
  try {
    await Account.deleteMany();
    await Transaction.deleteMany();
    console.log('Registros excluidos. :)');
  } catch (err) {
    console.log('Erro na exclusão dos registros!');
  }
  // 2) Ler arquivo de contas
  console.log('--------------------------------------------------------------');
  console.log('Carregando arquivo de contas...');
  let contas;
  try {
    contas = JSON.parse(
      fs.readFileSync('./src/dev-data/accounts.json', 'utf-8')
    );
  } catch (err) {
    console.log('Erro ao ler arquivo!');
    process.exit();
  }
  console.log('Arquivo carregado. :)');

  // 3) Criar contas no DB
  console.log('--------------------------------------------------------------');
  console.log('Gravando dados no DB...');

  try {
    await Account.create(contas);
  } catch (err) {
    console.log('Erro ao criar as contas: ', err);
    process.exit();
  }
  console.log('Dados gravados. :)');
  process.exit();
};

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
    console.log('Iniciando carga... :)');
    startBatch();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
