const express = require('express');
const router = express.Router();
const User=require("../Controller/userController");

router.post("/signUp", User.userSignUp );
router.post("/signIn", User.userSignIn );
router.get("/currentBalance", User.checkBalance );
router.put("/transaction/:senderId/:receiverId", User.transaction );
router.get("/transactionHistory/:senderId", User.listTransactionHistory );


router.all("/*", async function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" });
  });



module.exports = router;
