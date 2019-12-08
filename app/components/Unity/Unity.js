const express = require('express');
const Unity = require('./unityDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');

router.use(JWT.getMiddleware);

router.get('/', async (req, res) => {

    try {

        JWT.hasPermissions(req,res,1);

        const SchemaUser = Joi.object().keys({
            name: Joi.string().min(1).max(30).lowercase(),
            limit: Joi.number().integer().min(0),
            offset: Joi.number().integer().min(0)
        });

        const resultValidate = Joi.validate(req.query, SchemaUser);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        const {value} = resultValidate;
        
        value.limit =  value.limit ? value.limit : 10;
        value.offset =  value.offset ? value.offset : 0; 

        const result = await Unity.getUnitys(value);

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

    
}); // List All Unity

router.post('/register', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,1);

        const SchemaUser = Joi.object().keys({
            name: Joi.string().min(3).max(30).lowercase().required()
        });
    
        const resultValidate = Joi.validate(req.body, SchemaUser);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        resultValidate.value.id = uuidV4();

        await Unity.createUnity(resultValidate.value);
        
        resultValidate.value.password = undefined;

        return res.status(200).send(resultValidate.value);

    } catch (error) {

       
        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
        
    }

});// Create Unity

router.get('/:id', async (req, res) => {

    try{
        
        JWT.hasPermissions(req,res,1);

        const SchemaUser = Joi.object().keys({ id: Joi.string().required() });
    
        const resultValidate = Joi.validate(req.params, SchemaUser);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Unity.getUnity(resultValidate.value.id);

        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows});

    }   
    catch (error) {

        console.log('LOG',error);
        
        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        
        return res.status(400).send({"error":"Has error"});
    } 

}); //List One Unity

router.put('/:id', async (req, res) => {

    try{

        JWT.hasPermissions(req,res,2);

        const SchemaUser = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().min(3).max(30).lowercase()
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, SchemaUser);
            
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }
        
        const result = await Unity.updateUnity(resultValidate.value);
    
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:resultValidate.value})
    }   
    catch (error) {

        console.log('LOG',error);
        
        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        
        return res.status(400).send({"error":"Has error"});
    }  
    
    const result = await Unity.updateUnity({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar

router.delete('/:id', async (req, res) => {
    
    try{

        JWT.hasPermissions(req,res,2);
        
        const SchemaUser = Joi.object().keys({ id: Joi.string().required() });
        
        const resultValidate = Joi.validate(req.params, SchemaUser);
            
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }
        
        const result = await Unity.deleteUnity(resultValidate.value.id);
    
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:resultValidate.value})

    }   
    catch (error) {

        console.log('LOG',error);
        
        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        
        return res.status(400).send({"error":"Has error"});
    } 
    
}); //Deletar


module.exports = app => app.use('/unity',router);

