import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  balance: {
    type: Number,
    min: 1,
  },
});

accountSchema.index({ agencia: 1, conta: 1 });

const Account = mongoose.model('Account', accountSchema);

export default Account;
