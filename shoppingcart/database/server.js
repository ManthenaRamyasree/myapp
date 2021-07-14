const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const PORT = 3000;
const api =  require('./routes/api')
const cors = require('cors');
const {response} = require('express');

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())



app.use('/api', api )



app.get('/', function(req, res){
  res.send("Hello From Server......")
})


app.listen(PORT, function(){
  console.log("Server is Running at PORT Number: "+PORT)
})