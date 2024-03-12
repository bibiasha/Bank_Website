const express = require('express');
const router = express.Router();
const User=require("../Controller/userController");

router.post("/signUp", User.userSignUp );
router.post("/signIn", User.userSignIn );
router.get("/currentBalance", User.checkBalance );
router.put("/transaction/:senderId/:receiverId", User.transaction );
router.get("/transactionHistory/:senderId", User.listTransactionHistory );






module.exports = router;