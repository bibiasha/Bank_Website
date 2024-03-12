const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        trim:true
    },
    email: String,
    password: String,
    transactionType: {
        type: String,
        enum: ['credit', 'debit']
    },
    amount: {
        type: Number
    },
    balance: {
        type: Number,
        min: 0,
    }
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;