const express = require('express');
const User = require('./userDAL');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async(req,res)=>{
 
    let result = await User.loginUser(req.body);
   
    if(result.rowCount > 0 && await bcrypt.compare(req.body.senha,result.rows[0].senha)){
        result.rows[0]. senha = "";
        result =  result.rows[0];
     }
     else{
       result =  {"error": "Password Invalid or User not exists"};
     }

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
});


module.exports = app => app.use('/login',router);

