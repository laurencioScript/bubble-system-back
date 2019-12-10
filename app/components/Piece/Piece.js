const express = require('express');
const Piece = require('./PieceDAL');
const router = express.Router();
const JWT= require('./../../../jwt/authConfig');
const Joi = require('joi');
const { isUuid }  = require('uuidv4');
const uuidV4 = require('uuid/v4');
router.use(JWT.getMiddleware);

router.get('/', async (req, res) => {
    try{

        JWT.hasPermissions(req,res,2);

        const SchemaPiece = Joi.object().keys({
            name: Joi.string().min(1).max(30).lowercase(),
            unity: Joi.number().integer().min(0),
            value: Joi.number().integer().min(0),
            limit: Joi.number().integer().min(0),
            offset: Joi.number().integer().min(0)
        });
        
        const resultValidate = Joi.validate(req.query, SchemaPiece);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        const {value} = resultValidate;

        value.limit =  value.limit ? value.limit : 10;
        value.offset =  value.offset ? value.offset : 0; 

        const result = await Piece.getPieces(value);

        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows})
        
    }
    catch (error) {

        console.log(error);

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
}); // List All Pieces

router.post('/register', async (req, res) => {
   
    try{

        JWT.hasPermissions(req,res,1);

        const SchemaPiece = Joi.object().keys({
            name: Joi.string().min(3).max(30).lowercase().required(),
            unity: Joi.string().min(3).max(30).lowercase().required(),
            value: Joi.number().min(0).required(),
        });

        const resultValidate = Joi.validate(req.body, SchemaPiece);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }
    
        resultValidate.value.id = uuidV4();

        await Piece.createPiece(resultValidate.value);
        
        return res.status(200).send(resultValidate.value);
    }
    catch (error) {

        console.log(error);
        

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }

});// Create Piece

router.get('/:id', async (req, res) => {

    try{

        JWT.hasPermissions(req,res,1);

        const SchemaPiece = Joi.object().keys({ id: Joi.string().required() });

        const resultValidate = Joi.validate(req.params, SchemaPiece);
        
        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Piece.getPiece(resultValidate.value.id);
       
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:result.rows});

    }
    catch (error) {

        console.log(error);
        

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }

}); //List One Piece

router.put('/:id', async (req, res) => {
    
    try{

        JWT.hasPermissions(req,res,2);

        const SchemaPiece = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().min(1).max(30).lowercase(),
            unity: Joi.string().min(1).max(30).lowercase(),
            value: Joi.number().integer().min(0),
        });
        
        const resultValidate = Joi.validate({"id":req.params.id,...req.body}, SchemaPiece);

        if(resultValidate.error !== null){
            return res.status(400).send({error:resultValidate.error.details[0].message });
        }

        if(!isUuid(resultValidate.value.id)){
            return res.status(400).send({error:"The id is not valid" });
        }

        const result = await Piece.updatePiece({"id":req.params.id,...req.body});
        
        
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }

        return res.status(200).send({result:resultValidate.value})

    }
    catch (error) {

        console.log(error);
        

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }

}); //Editar Piece

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

        const result = await Piece.deletePiece(resultValidate.value.id);
          
        if(result.rowCount < 1){
            return res.status(404).send({error:'Not found'});
        }
        
        return res.status(200).send({result:resultValidate.value})


    }
    catch (error) {

        console.log(error);
        

        if(error.detail){
            return res.status(400).send({error:error.detail});
        }
        else{
            return res.status(400).send({"error":"Has error"});
        }
    }
    
}); //Deletar Piece


module.exports = app => app.use('/piece',router);

