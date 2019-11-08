const express = require('express');
const Defect = require('../models/DefectDAL');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Defect.getDefects();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Defects


router.post('/register', async (req, res) => {
    
    const result = await Defect.createDefect(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create Defect

router.get('/:id', async (req, res) => {

    const result = await Defect.getDefect(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One Defect

router.put('/:id', async (req, res) => {
    
    const result = await Defect.updateDefect({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar Defect

router.delete('/:id', async (req, res) => {
    
    const result = await Defect.deleteDefect(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar Piece


module.exports = app => app.use('/defect',router);

