import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
    enum: {
      values: ['T', 'R', 'D'], //Transferencia, Retirada, Deposito
    },
  },
  agenciaDebito: Number,
  contaDebito: Number,
  agenciaCredito: Number,
  contaCredito: Number,
  valor: Number,
  tarifa: Number,
  data: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
