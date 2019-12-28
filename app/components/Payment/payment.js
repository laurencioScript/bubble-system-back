const express = require('express');
const Payment = require('./paymentDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');
router.use(JWT.getMiddleware);


router.post('/register', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({
            debit_card:Joi.number(),
            credit_card:Joi.number(),
            check_pay:Joi.number(),
            money_pay:Joi.number(),
            discount:Joi.number().integer(),
            amount_paid:Joi.number(),
            value_total:Joi.number()
        });

        const resultValidate = Joi.validate({...req.body,id:req.params}, Schema);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        resultValidate.value.id =  uuidV4();

        await Payment.createPayment(resultValidate.value);
        
        return res.status(200).send(resultValidate.value);

    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
    
    

});// Create Defect

router.get('/:id', async (req, res) => {

    try {
        
        JWT.hasPermissions(req,res,1);

        const SchemaDefect = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, SchemaDefect);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Payment.getPayment(resultValidate.value.id);
       
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows});


    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
   
   
   
}); //List One Defect

router.get('/', async (req, res) => {

    try {
        
        JWT.hasPermissions(req,res,1);

        const SchemaDefect = Joi.object().keys({ 
            limit: Joi.number().integer().min(0),
            offset: Joi.number().integer().min(0) 
        });

        const resultValidate = Joi.validate(req.params, SchemaDefect);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        const {value} = resultValidate;

        value.limit =  value.limit ? value.limit : 10;
        value.offset =  value.offset ? value.offset : 0; 


        const result = await Payment.getPayments(value);
       
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows});


    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
   
   
   
}); //List One Defect

router.put('/:id', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const SchemaDefect = Joi.object().keys({
            id:Joi.string().required(),
            debit_card:Joi.number(),
            credit_card:Joi.number(),
            check_pay:Joi.number(),
            money_pay:Joi.number(),
            discount:Joi.number().integer(),
            amount_paid:Joi.number(),
            value_total:Joi.number()
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, SchemaDefect);

        if(resultValidate.error !== null){
            
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Payment.updatePayment(resultValidate.value);
        
        
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:resultValidate.value})

    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
    

   

}); //Editar Defect

router.delete('/:id', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const SchemaUser = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, SchemaUser);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Payment.deletePayment(resultValidate.value.id);
          
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }
        
        return res.status(200).send({result:resultValidate.value});


    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
     
  
}); //Deletar Defect


module.exports = app => app.use('/payment',router);

