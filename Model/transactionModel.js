const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    amount: Number,
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
