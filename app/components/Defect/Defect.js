const express = require('express');
const Defect = require('./defectDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');
router.use(JWT.getMiddleware);

router.get('/', async (req, res) => {

    try {

        JWT.hasPermissions(req,res,2);

        const SchemaDefect = Joi.object().keys({
            defect_name:Joi.string().min(1).max(30).lowercase(),
            limit: Joi.number().integer().min(0),
            offset: Joi.number().integer().min(0)
        });

        const resultValidate = Joi.validate(req.query, SchemaDefect);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        const {value} = resultValidate;

        value.limit =  value.limit ? value.limit : 10;
        value.offset =  value.offset ? value.offset : 0; 

        const result = await Defect.getDefects(value);

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
    

   
    
}); // List All Defects


router.post('/register', async (req, res) => {
    
    try {
        
        JWT.hasPermissions(req,res,2);

        const SchemaDefect = Joi.object().keys({
            name:Joi.string().min(1).max(30).lowercase()
        });

        const resultValidate = Joi.validate(req.body, SchemaDefect);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        resultValidate.value.id = uuidV4();

        await Defect.createDefect(resultValidate.value);
        
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

        const result = await Defect.getDefect(resultValidate.value.id);
       
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
            name:Joi.string().min(1).max(30).lowercase()
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, SchemaDefect);

        if(resultValidate.error !== null){
            
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Defect.updateDefect(resultValidate.value);
        
        
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

        const result = await Defect.deleteDefect(resultValidate.value.id);
          
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


module.exports = app => app.use('/defect',router);

