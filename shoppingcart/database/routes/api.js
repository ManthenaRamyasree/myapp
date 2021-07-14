const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/shoppingcart';

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Connection Established Successfully');
    }
  }
);
router.get('/', (req, res) => {
  res.send('From API ROUTE');
});

router.post('/cart', async(req, res) => {
  const { cart: items, address } = req.body;
  console.log(`{ ...address, items }`, { ...address, items });
  let cartObject = new Cart({ ...address, items });
  cartObject.save((error, detailsCart) => {
    if (error) {
      console.log('Error: ' + error);
      return res.status(400).send(null);
    } else {
      res.status(200).send(detailsCart);
    }
  });
  //step 1

let transporter = nodemailer.createTransport({
  service:'gmail',
  secure: true,
  auth:{
    user:'XXXXX',
    pass:'XXXX'
    
  }
   });
     
  //step 2
  let mailOptions = {
      from:'XXXXXX',
      to:'XXXXX',
      subject:'Testing',
      text:'Its working',
  };
  
  //step 3
  
  transporter.sendMail(mailOptions, function(err, data){
      if(err){
          console.log('Error Occurs:', err);
      }
      else{
              console.log('Email sent!!!');
          }
      
  });
});

router.get('/cart', (req, res) => {
  Cart.find({}, (error, detailsCart) => {
    if (error) {
      console.log('Error: ' + error);
      return res.status(400).send(null);
    }
    res.status(200).send(detailsCart);
  });
});

// router.post('/login', (req, res) => {
//   let userData = req.body

//   User.findOne({username: userData.username}, (error, user)=> {
//     if(error){
//       console.log("Error: "+ error)
//     }
//     else {

//           if (!user){
//           res.status(401).send("Invalid Username")
//          }

//       else if(user.password !== userData.password){
//         res. status(401).send("Invalid Password")
//       }

//     else{
//       res.status(200).send(user)
//     }
//   }
//   })
// })

module.exports = router;