const express = require('express');
const Client = require('./clienteDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');
router.use(JWT.getMiddleware);


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


        const result = await Client.getClients(value);
       
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

}); 


router.post('/register', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({
            cpf_cnpj:Joi.string().required(),
            type_client:Joi.string().required(),
            name_client:Joi.string().lowercase().required(),
            corporate_name:Joi.string().allow(""),
            email:Joi.string().required(),
            observation_description:Joi.string().allow(""),
            observation_color:Joi.string().allow(""),
            contact:Joi.array().required(),
            address_client:Joi.string().allow(""),
            number:Joi.string().allow(""),
            complement:Joi.string().allow(""),
            neighborhood:Joi.string().allow(""),
            city:Joi.string().allow(""),
            state_city:Joi.string().allow(""),
            cep:Joi.string().allow("")
        });

        const resultValidate = Joi.validate(req.body, Schema);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        resultValidate.value.id =  uuidV4();
        resultValidate.value.idEnd = uuidV4();
        resultValidate.value.idInfo = uuidV4();


        const result = await Client.createClient(resultValidate.value);

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
  

});

router.get('/:id', async (req, res) => {

    try {
        
        JWT.hasPermissions(req,res,1);

        const Schema = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, Schema);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Client.getClient(resultValidate.value.id);
       
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
    

}); 

router.put('/:id', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const Schema = Joi.object().keys({
            id:Joi.string().required(),
            info:Joi.object().keys({
                cpf_cnpj:Joi.string().required(),
                type_client:Joi.string().required(),
                name_client:Joi.string().lowercase().required(),
                corporate_name:Joi.string().allow(""),
                email:Joi.string().required(),
                observation_description:Joi.string().allow(""),
                observation_color:Joi.string().allow(""),
                contact:Joi.array().required(),
            }),
            end:Joi.object().keys({
                address_client:Joi.string(),
                number:Joi.string().allow(""),
                complement:Joi.string().allow(""),
                neighborhood:Joi.string().allow(""),
                city:Joi.string().allow(""),
                state_city:Joi.string().allow(""),
                cep:Joi.string().required(),
            }),
            
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, Schema);

        if(resultValidate.error !== null){
            
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Client.updateClient(resultValidate.value);
        
        
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

}); 

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

        const result = await Client.deleteClient(resultValidate.value.id);
          
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


}); 


module.exports = app => app.use('/client',router);

