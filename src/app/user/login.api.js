const {Router} = require('express');
const router = Router();
const Joi = require('joi');

const errorHandler = require("./../../error-handler");
const userService = require('./user.service');

router.post('/login', async(req,res)=>{
 
  try {

    const body = req.body;
    const Schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    
    const validationResult = Joi.validate(body, Schema);

    if(validationResult.error){
      throw {
        status: 400,
        message: validationResult.error.details[0].message
      }       
    }    
    
    const user = await userService.login(body);

    return res.status(200).send(user);

  } catch (error) {
    return errorHandler(error,res);
  }
})

module.exports = router;