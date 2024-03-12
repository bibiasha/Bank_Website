#Overview of the project#

#1 User Sign Up Endpoint (/signUp):

Method: POST

Description: 
This endpoint allows users to sign up for the application by providing their name, email, and password. It will credit 1000 Rs automatically after signing up.

Postman URL: http://localhost:3000/signUp

Postman Schema

{
    "name":"mina",
    "email":"mina@gmail.com",
    "password":"mina@123"
}



#2 User Sign In Endpoint (/signIn):

Method: POST

Description: 

This endpoint allows users to sign in to the application using their email and password.If successful, returns a JWT token in the response body, which can be used for authentication.
If unsuccessful (due to incorrect credentials, missing fields, etc.), returns an appropriate error status along with a corresponding message.

Postman URL: http://localhost:3000/signUp](http://localhost:3000/signIn

Postman Schema

{
    "email":"mina@gmail.com",
    "password":"mina@123"
}



#3 Get my current balance Endpoint (/currentBalance): 

Method: GET

Description:

This endpoint allows users to check their account balance by providing their password and an authorization token.

Request Body:

password: User's password.

Request Headers:

Authorization: JWT token obtained during sign-in.

Response:

If successful, returns a status of 200 OK along with the user's account balance.
If unsuccessful (due to incorrect password, missing authorization token, etc.), returns an appropriate error status along with a corresponding message.
Transaction Endpoint (/transaction):


Postman URL: http://localhost:3000/currentBalance

Postman Schema

{
    "password":"mina@123"
}


#4 Make transaction only if the password is right Endpoint (/transaction/:senderId/:receiverId): 

Method: PUT

Description: 

This endpoint allows users to perform transactions (i.e., transfer funds between accounts) by providing the sender's and receiver's IDs(_id), the transaction amount, and the sender's password.

#Request Body:#

senderId: _id of the sender. 

receiverId: _id of the receiver.

*You can select any two _id from DB and after transaction you can see a change in sender's balance his/her account is debited while receiver's account is credited.*

amount: Amount to be transferred(any number).

password: Sender's password for authentication.

#Request Headers:#

Authorization: JWT token obtained during sign-in.

Response:

If successful, returns a status of 200 OK along with a message confirming the successful transaction.

If unsuccessful (due to insufficient balance, incorrect password, etc.), returns an appropriate error status along with a corresponding message.

Postman URL:  (/transaction/:senderId/:receiverId)

*senderId: _id of the sender.* 

*receiverId: _id of the receiver.*

Postman Schema

{
      "password":"mina@123",
     "amount":80
}


#5 List-my-transaction-history Endpoint ("/transactionHistory/:senderId")

Method: GET

Description: This endpoint allows users to retrieve their transaction history by providing their user ID(_id).

#Request Parameters:#

senderId: ID of the sender for whom transaction history is requested in params.

#Response:#

If successful, returns a status of 200 OK along with an array of transactions, including details such as sender name, receiver name, and amount.

If unsuccessful (due to invalid sender ID, database error, etc.), returns an appropriate error status along with a corresponding message.

Postman URL: http://localhost:3000/:senderId"

*senderId: _id of the sender.* 

Postman Schema: empty


These are the main endpoints and functionalities provided by the API. Users can sign up, sign in, check their balance, perform transactions, and view their transaction history. Each endpoint requires appropriate authentication and may return errors if the request is invalid or unauthorized.
