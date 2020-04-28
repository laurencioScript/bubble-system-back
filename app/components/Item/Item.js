const express = require('express');
const Item = require('./itemDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');
router.use(JWT.getMiddleware);


router.get('/', async (req, res) => {

    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({
            service_id:Joi.string().min(1).max(30).lowercase(),
            limit: Joi.number().integer().min(0),
            offset: Joi.number().integer().min(0)
        });

        const resultValidate = Joi.validate(req.query, Schema);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        const {value} = resultValidate;

        value.limit =  value.limit ? value.limit : 10;
        value.offset =  value.offset ? value.offset : 0; 

        const result = await Item.getAllItems(value);

        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows})

    } catch (error) {
        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }

  
    
}); // List All Itens


router.post('/register', async (req, res) => {
    
    try {
        const Schema = Joi.object().keys({
            service_id:Joi.string().min(1).lowercase(),
            piece: Joi.string().min(1).max(30).lowercase(),
            amount: Joi.number().integer().min(0),
            unity: Joi.string().min(1).max(30).lowercase(),
            value_unity: Joi.number().min(0),
            value_total: Joi.number().min(0),
            colors: Joi.array(),
            defects: Joi.array(),
            characteristics: Joi.array()
        });

        const resultValidate = Joi.validate(req.body, Schema);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        resultValidate.value.id = uuidV4();

        await Item.createItem(resultValidate.value);
        
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

  
});// Create User

router.get('/:id', async (req, res) => {

    try {
        
        
        const Schema = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, Schema);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Item.getOneItem(resultValidate.value.id);
       
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

}); //List One User

router.put('/:id', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({
            id:Joi.string().required(),
            piece: Joi.string().min(1).max(30).lowercase(),
            amount: Joi.number().integer().min(0),
            unity: Joi.string().min(1).max(30).lowercase(),
            value_unity: Joi.number().min(0),
            value_total: Joi.number().min(0),
            colors: Joi.array(),
            defects: Joi.array(),
            characteristics: Joi.array()
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, Schema);

        if(resultValidate.error !== null){
            
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Item.updateItems(resultValidate.value);
        
        
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

}); //Editar

router.delete('/:id', async (req, res) => {

    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, Schema);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Item.deleteItem(resultValidate.value.id);
          
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

}); //Deletar


module.exports = app => app.use('/item',router);

