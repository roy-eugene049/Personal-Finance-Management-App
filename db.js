const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/finance-app', { useNewUrlParser: true });

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Get all transactions
const getTransactions = async () => {
  const transactions = await Transaction.find({});
  return transactions;
};

// Add a new transaction
const addTransaction = async (transaction) => {
  const newTransaction = new Transaction({
    description: transaction.description,
    amount: transaction.amount,
  });
  await newTransaction.save();
  return newTransaction;
};

// Delete a transaction
const deleteTransaction = async (id) => {
  await Transaction.findByIdAndDelete(id);
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
