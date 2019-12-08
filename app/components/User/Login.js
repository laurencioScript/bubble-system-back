const express = require('express');
const User = require('./userDAL');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const JWT= require('./../../../jwt/authConfig');

router.post('/', async(req,res)=>{
 
  try {

    const SchemaUser = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });

    const resultValidate = Joi.validate(req.body, SchemaUser);
    
    if(resultValidate.error !== null){
        return res.status(400).send({error:resultValidate.error.details[0].message });
    }
 
    const {value} = resultValidate;
    
    
    let result = await User.loginUser(value);
    
    if(result.rowCount < 1){
        return res.status(404).send({error:'Not found'});
    }

    if(!await bcrypt.compare(req.body.password, result.rows[0].password_user)){
      return res.status(404).send({error:'Password Invalid or User not exists'}); 
    }

    result = result.rows[0];
    result.password_user = "";
    result.token = JWT.generateToken({
      id:result.id_user,
      level:result.level_user
    });
    

    return res.status(200).send({result:result})


} catch (error) {

    console.log('LOG',error);
    
    if(error.detail){
        return res.status(400).send({error:error.detail});
    }
    else{
      return res.status(400).send({"error":"Has error"});

    }
  }
})

module.exports = app => app.use('/login',router)