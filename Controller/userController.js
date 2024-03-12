const UserModel=require("../Model/userModel");
const Transaction=require("../Model/transactionModel")
const jwt=require("jsonwebtoken");



exports.userSignUp= async function(request, response){
try{
    let body=request.body;
    const{name, email,password,balance=0}=body;
   
    if(!name)return response.status(400).send({status:false,message:"Kindly provide your name"});

    if(!email) return response.status(400).send({status:false,message:"Kindly provide your email"});
    const uniqueEmail= await UserModel.findOne({email:email});
    if(uniqueEmail) return response.status(400).send({status:false,message:"Kindly provide unique email ID"});

    if(!password)return response.status(400).send({status:false,message:"Kindly provide your password"});

    const createUser= await UserModel.create({name, email,password,balance});
    const creditThousand = await UserModel.findOneAndUpdate({
        name: name
    }, {
        $inc: { balance: 1000 } 
    }, { new: true, upsert: true });
    return response.status(201).send({status:true,message:createUser,message:"User signUp successfully"});

    

}catch(error){
    return response.status(500).send({status:false,message:error.message});
}
}

exports.userSignIn= async function(request, response){
    try{
        let body=request.body;
        const{ email,password}=body;
    
        if(!email) return response.status(400).send({status:false,message:"Kindly provide your email"});

        const searchEmail= await UserModel.findOne({email:email});
        if(!searchEmail) return response.status(404).send({status:false,message:"Email is invalid"});
    
        if(!password)return response.status(400).send({status:false,message:"Kindly provide your password"});

        const searchpassword= await UserModel.findOne({password:password});
        if(!searchpassword) return response.status(404).send({status:false,message:"Password is invalid"});

        const payload = {
            email: email,
            password:password
          };
          
          const secret = 'iotree';
          const options = { expiresIn: '1h' };
        
          const login= jwt.sign(payload, secret, options);

        return response.status(200).send({status:true,message:login+"User has signIn successfully"});
    
    }catch(error){
        return response.status(500).send({status:false,message:error.message});
    }
    }

exports.checkBalance= async function(request, response){
        try{
            let body=request.body;
            const{password}=body;
            const token = request.headers['authorization'];
            if (!token) {
                return response.status(401).send({ status: false, message: "Authorization token is missing" });
            }
            
            jwt.verify(token, 'iotree', async (error, decodedToken) => {
                if (error) {
                    return response.status(403).send({ status: false, message: "Invalid token" });
                }
               
                if (decodedToken.password !== password) {
                    return response.status(403).send({ status: false, message: "Unauthorized access" });
                }
            const searchUser= await UserModel.findOne({password:password});
            if(!searchUser) return response.status(404).send({status:false,message:"User not found"});

            const balance=searchUser.balance;
            return response.status(200).send({status:true,message:balance});
        });
        }catch(error){
            return response.status(500).send({status:false,message:error.message});
        }
        }

exports.transaction= async function(request, response){
     try{
        let data=request.body;
        let{password,amount}=data;
        let body=request.params;
        const{senderId, receiverId}=body;
       
        const searchsenderId= await UserModel.findOne({_id:senderId});
        if(!searchsenderId) return response.status(404).send({status:false,message:"User not found"});
      
        const searchreceiverId= await UserModel.findOne({_id:receiverId});
        if(!searchreceiverId) return response.status(404).send({status:false,message:"User not found"});

        if(!password)return response.status(400).send({status:false,message:"Kindly provide your password"});
        
        if(searchsenderId.password != password) return response.status(404).send({status:false,message:"Password is invalid"});
        
        const token = request.headers['authorization'];
        if (!token) {
            return response.status(401).send({ status: false, message: "Authorization token is missing" });
        }
        
        jwt.verify(token, 'iotree', async (error, decodedToken) => {
            if (error) {
                return response.status(403).send({ status: false, message: "Invalid token" });
            }
           
            if (decodedToken.password !== password) {
                return response.status(403).send({ status: false, message: "Unauthorized access" });
            }

        let balanceSender=searchsenderId.balance;
        let currentBalanceOfsender=balanceSender-amount;
        let balanceReceiver=searchreceiverId.balance;
        let currentBalanceOfReceiver=balanceReceiver+amount;

        if(balanceSender>amount){
           await UserModel.findOneAndUpdate({ _id: senderId },{  balance: currentBalanceOfsender})
           await UserModel.findOneAndUpdate({ _id: receiverId },{ balance: currentBalanceOfReceiver})
        }else{
            return response.status(200).send({status:true,message:"You have Insufficient balance"});
        }

        const transaction = new Transaction({
            senderId: senderId,
            receiverId: receiverId,
            amount: amount
        });
        await transaction.save();

        return response.status(200).send({status:true,message:"Transaction is made succeccfully"});       
    });
     }catch(error){
          return response.status(500).send({status:false,message:error.message});
      }
}


exports.listTransactionHistory = async function(request, response) {
    try {
        const senderId = request.params.senderId;

        const searchsenderId= await UserModel.findOne({_id:senderId});
        if(!searchsenderId) return response.status(404).send({status:false,message:"User not found"});

        const transactions = await Transaction.find({senderId:senderId})
            .populate('senderId', 'name')
            .populate('receiverId', 'name')
            .sort({ timestamp: -1 });

        return response.status(200).send({ status: true, transactions: transactions });

    } catch (error) {
        return response.status(500).send({ status: false, message: error.message });
    }
}





        
