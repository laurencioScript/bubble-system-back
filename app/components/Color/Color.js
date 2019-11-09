const express = require('express');
const Color = require('./colorDAL');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Color.getColors();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Pieces


router.post('/register', async (req, res) => {
    
    const result = await Color.createColor(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create Piece

router.get('/:id', async (req, res) => {

    const result = await Color.getColor(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One Piece

router.put('/:id', async (req, res) => {
    
    const result = await Color.updateColor({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar Piece

router.delete('/:id', async (req, res) => {
    
    const result = await Color.deleteColor(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar Piece


module.exports = app => app.use('/color',router);

