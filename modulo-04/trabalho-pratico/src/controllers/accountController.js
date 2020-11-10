import Account from '../models/accountModel.js';

/******************************************************************************/
/*                                BUSCA SALDO                                 */
/******************************************************************************/
const saldo = async (agencia, conta) => {
  let result;
  try {
    result = await Account.findOne({ agencia: agencia, conta: conta });
  } catch (err) {
    return undefined;
  }
  if (result) return result;
  return undefined;
};

/******************************************************************************/
/*                                  DEPOSITA                                  */
/******************************************************************************/
const depositar = async (agencia, conta, valor) => {
  //Tenta alterar a conta
  let account;
  try {
    account = await Account.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: valor } }
    );
  } catch (err) {
    return undefined;
  }
  account.balance += valor;
  return account;
};

/******************************************************************************/
/*                                    SACA                                    */
/******************************************************************************/
const sacar = async (agencia, conta, valor) => {
  //Busca saldo da origem
  let account = await Account.findOne({ agencia, conta });
  if (account.balance < valor) return -1;

  //Tenta alterar a conta
  try {
    await Account.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: valor * -1 } }
    );
  } catch (err) {
    console.log(err);
    return undefined;
  }

  account.balance += valor * -1;

  return account;
};

/******************************************************************************/
/*                             EXCLUSAO DE CONTA                              */
/******************************************************************************/
const excluir = async (agencia, conta) => {
  const account = await Account.findOneAndDelete({
    conta: conta,
    agencia: agencia,
  });
  return account;
};

/******************************************************************************/
/*                             MÉDIA POR AGENCIA                              */
/******************************************************************************/
const mediaSaldoPorAgencia = async (agencia) => {
  const media = await Account.aggregate([
    { $match: { agencia: agencia * 1 } },
    {
      $group: {
        _id: null,
        agencia: { $first: '$agencia' },
        media: { $avg: '$balance' },
      },
    },
  ]);
  return media;
};

/******************************************************************************/
/*                                TOP POBRES                                  */
/******************************************************************************/
const topPobres = async (qtde) => {
  const clientes = await Account.find().sort({ balance: 1 }).limit(qtde);
  return clientes;
};

/******************************************************************************/
/*                                 TOP RICOS                                  */
/******************************************************************************/
const topRicos = async (qtde) => {
  const clientes = await Account.find()
    .sort({ balance: -1, name: 1 })
    .limit(qtde);
  return clientes;
};

/******************************************************************************/
/*                                VIP TRANSFER                                */
/******************************************************************************/
const agenciaVip = async () => {
  //Busca os TOP CLIENTS
  const topClients = await Account.aggregate([
    { $match: { agencia: { $ne: 99 } } },
    { $sort: { balance: -1 } },
    {
      $group: {
        _id: '$agencia',
        agencia: { $first: '$agencia' },
        conta: { $first: '$conta' },
        balance: { $max: '$balance' },
      },
    },
  ]);

  for (let i = 0; i < topClients.length; i++) {
    const doc = await Account.findOneAndUpdate(
      { agencia: topClients[i].agencia, conta: topClients[i].conta },
      { agencia: 99 }
    );
    console.log(doc);
  }

  const vipAccounts = Account.find({ agencia: 99 });

  return vipAccounts;
};

export {
  saldo,
  depositar,
  sacar,
  excluir,
  mediaSaldoPorAgencia,
  topPobres,
  topRicos,
  agenciaVip,
};
