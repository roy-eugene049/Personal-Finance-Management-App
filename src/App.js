import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';

<Route exact path="/" render={() => (
  <div className="container">
    <Header />
    <Balance />
    <IncomeExpenses />
    <TransactionList />
    <AddTransaction />
  </div>
)} />


function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  }, []);

  const addTransaction = (transaction) => {
    fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(res => res.json())
      .then(data => setTransactions([...transactions, data]))
      .catch(err => console.error(err));
  }

  const deleteTransaction = (id) => {
    fetch(`/api/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTransactions(transactions.filter(transaction => transaction._id !== id)))
      .catch(err => console.error(err));
  }

  const total = transactions.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
  const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
  const expenses = (transactions.filter(transaction => transaction.amount < 0).reduce((acc, curr) => acc + curr.amount, 0) * -1).toFixed(2);

  return (
    <div className="container">
      <Header />
      <Balance total={total} />
      <IncomeExpenses income={income} expenses={expenses} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <AddTransaction addTransaction={addTransaction} />
    </div>
  );
}

export default App;
