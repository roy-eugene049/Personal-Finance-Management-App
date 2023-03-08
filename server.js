const { getTransactions, addTransaction, deleteTransaction } = require('./db');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the index.html file for any undefined routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });
  

// In-memory storage for transactions
let transactions = [];

// Get all transactions
app.get('/transactions', async (req, res) => {
    try {
      const transactions = await getTransactions();
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

// Add a new transaction
app.post('/transactions', async (req, res) => {
    try {
      const transaction = req.body;
      const newTransaction = await addTransaction(transaction);
      res.json(newTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await deleteTransaction(id);
      res.json({ message: 'Transaction deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
