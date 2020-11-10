//import Account from '../models/accountModel.js';
import Transaction from '../models/transactionModel.js';
import * as Controller from './accountController.js';

/* 4) Crie um endpoint para registrar um depósito em uma conta. Este endpoint 
deverá receber como parâmetros a “agencia”, o número da conta e o valor do 
depósito. Ele deverá atualizar o “balance” da conta, incrementando-o com o valor 
recebido como parâmetro. O endpoint deverá validar se a conta informada existe, 
caso não exista, deverá retornar um erro, caso exista retornar o saldo atual da 
conta. */
const deposito = async (req, res, next) => {
  const { agencia, conta, valor } = req.body;
  const result = await Controller.depositar(agencia, conta, valor);
  if (!result) {
    res.status(400).json({ status: 'fail', message: 'Agencia/Conta inválida' });
    return;
  }
  //Registra a tansação
  const newTransaction = {
    tipo: 'D', //Deposito
    agenciaCredito: agencia,
    contaCredito: conta,
    valor: valor,
  };
  Transaction.create(newTransaction);

  res.status(200).json({ status: 'success', data: result });
};

/* 5) Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá
receber como parâmetros a “agência”, o número da conta e o valor do saque. Ele
deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com
parâmetro e cobrando uma tarifa de saque de (1). O endpoint deverá validar se a
conta informada existe, caso não exista deverá retornar um erro, caso exista retornar
o saldo atual da conta. Também deverá validar se a conta possui saldo suficiente
para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que
o saque fique negativo. */
const saque = async (req, res, next) => {
  const { agencia, conta, valor } = req.body;
  const result = await Controller.sacar(agencia, conta, valor);
  if (result === -1) {
    res.status(400).json({ status: 'fail', message: 'Saldo insuficiente' });
    return;
  }
  if (!result) {
    res.status(400).json({ status: 'fail', message: 'Agencia/Conta inválida' });
    return;
  }

  //Registra a tansação
  const newTransaction = {
    tipo: 'S', //Saque
    agenciaDebito: agencia,
    contaDebito: conta,
    valor: valor,
  };

  Transaction.create(newTransaction);
  res.status(200).json({ status: 'success', data: result });
};

/* 6) Crie um endpoint para consultar o saldo da conta. Este endpoint deverá 
receber como parâmetro a “agência” e o número da conta, e deverá retornar seu 
“balance”. Caso a conta informada não exista, retornar um erro. */
const saldo = async (req, res, next) => {
  const { conta, agencia } = req.params;
  const account = await Controller.saldo(agencia, conta);
  if (!account) {
    res.status(400).json({ status: 'fail', message: 'Conta/Agencia inválida' });
    return;
  }
  res.status(200).json({ status: 'success', data: account });
};

/* 7) Crie um endpoint para excluir uma conta. Este endpoint deverá receber como
parâmetro a “agência” e o número da conta e retornar o número de contas ativas
para esta agência. */
const excluir = async (req, res, next) => {
  const { agencia, conta } = req.params;
  console.log(agencia, conta);
  const account = Controller.excluir(agencia, conta);
  if (!account) {
    res.status(400).json({ status: 'fail', message: 'Conta/Agencia inválida' });
  }
  res.status(200).json({ status: 'success', message: 'Conta excluída.' });
};

/* 8) Crie um endpoint para realizar transferências entre contas. Este endpoint 
deverá receber como parâmetro o número da “conta” origem, o número da “conta” 
destino e o valor de transferência. Este endpoint deve validar se as contas são 
da mesma agência para realizar a transferência, caso seja de agências distintas 
o valor de tarifa de transferência (8) deve ser debitado na conta origem. 
O endpoint deverá retornar o saldo da conta origem. */
const transferencia = async (req, res, next) => {
  let origem, destino, valorDebitarOrigem, valorCreditarDestino;
  const {
    contaOrigem,
    agenciaOrigem,
    contaDestino,
    agenciaDestino,
    valor,
  } = req.body;
  valorDebitarOrigem = valor;
  valorCreditarDestino = valor;
  if (agenciaOrigem != agenciaDestino) valorDebitarOrigem += 8;

  //Retira o valalor da conta Origem
  origem = await Controller.sacar(
    agenciaOrigem,
    contaOrigem,
    valorDebitarOrigem
  );
  if (origem === -1) {
    res.status(400).json({ status: 'fail', message: 'Saldo insuficiente' });
    return;
  }
  if (!origem) {
    res
      .status(400)
      .json({ status: 'fail', message: 'Agencia/Conta origem inválida' });
    return;
  }

  //Deposita o valor na conta destino
  destino = await Controller.depositar(
    agenciaDestino,
    contaDestino,
    valorCreditarDestino
  );
  if (!destino) {
    //Devolve o dinheiro pra conta Origem
    Controller.depositar(agenciaOrigem, contaOrigem, valorDebitarOrigem);
    res
      .status(400)
      .json({ status: 'fail', message: 'Agencia/Conta destino inválida' });
    return;
  }

  //Registra a tansação
  const newTransaction = {
    tipo: 'T', //Transferencia
    agenciaCredito: agenciaDestino,
    contaCredito: contaDestino,
    agenciaDebito: agenciaOrigem,
    contaDebito: contaOrigem,
    valor: valor,
    tarifa: 8,
  };
  Transaction.create(newTransaction);
  res.status(200).json({ status: 'success', data: { origem, destino } });
};

/* 9) Crie um endpoint para consultar a média do saldo dos clientes de 
determinada agência. O endpoint deverá receber como parâmetro a “agência” e 
deverá retornar o balance médio da conta. */
const mediaSaldo = async (req, res, next) => {
  const { agencia } = req.params;
  if (!agencia) {
    res.status(400).json({ status: 'fail', message: 'Agencia inválida' });
    return;
  }
  const media = await Controller.mediaSaldoPorAgencia(agencia);
  if (!media) {
    res
      .status(400)
      .json({ status: 'fail', message: 'Não foi possível calcular a média!' });
    return;
  }
  res.status(200).json({ status: 'success', data: media });
};

/* 10) Crie um endpoint para consultar os clientes com o menor saldo em conta. 
O endpoint deverá receber como parâmetro um valor numérico para determinar a 
quantidade de clientes a serem listados, e o endpoint deverá retornar em ordem 
crescente pelo saldo a lista dos clientes (agência, conta, saldo). */
const topPobres = async (req, res, next) => {
  const qtd = req.params.qtd ? req.params.qtd * 1 : 5;
  const clientesPobres = await Controller.topPobres(qtd);
  if (clientesPobres.length > 0) {
    res.status(200).json({
      status: 'success',
      results: clientesPobres.length,
      data: clientesPobres,
    });
    return;
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Ocorreu um erro ao buscar os clientes mais pobres!',
    });
    return;
  }
};

/* 11) Crie um endpoint para consultar os clientes mais ricos do banco. O 
endpoint deverá receber como parâmetro um valor numérico para determinar a 
quantidade de clientes a serem listados, e o endpoint deverá retornar em ordem 
decrescente pelo saldo, crescente pelo nome, a lista dos clientes (agência, 
 conta, nome e saldo). */
const topRicos = async (req, res, next) => {
  const qtd = req.params.qtd ? req.params.qtd * 1 : 5;
  const clientes = await Controller.topRicos(qtd);
  if (clientes.length > 0) {
    res.status(200).json({
      status: 'success',
      results: clientes.length,
      data: clientes,
    });
    return;
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Ocorreu um erro ao buscar os clientes mais ricos!',
    });
    return;
  }
};

/* 12) Crie um endpoint que irá transferir o cliente com maior saldo em conta de 
cada agência para a agência private agencia=99. O endpoint deverá retornar a 
lista dos clientes da agencia private. */
const agenciaVip = async (req, res, next) => {
  const vip = await Controller.agenciaVip();
  res.status(200).json({
    status: 'success',
    results: vip.length,
    data: vip,
  });
};

export {
  deposito,
  saque,
  saldo,
  excluir,
  transferencia,
  mediaSaldo,
  topPobres,
  topRicos,
  agenciaVip,
};
