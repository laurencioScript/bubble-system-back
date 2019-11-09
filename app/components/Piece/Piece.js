const express = require('express');
const Piece = require('./PieceDAL');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Piece.getPieces();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Pieces


router.post('/register', async (req, res) => {
    
    const result = await Piece.createPiece(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create Piece

router.get('/:id', async (req, res) => {

    const result = await Piece.getPiece(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One Piece

router.put('/:id', async (req, res) => {
    
    const result = await Piece.updatePiece({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar Piece

router.delete('/:id', async (req, res) => {
    
    const result = await Piece.deletePiece(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar Piece


module.exports = app => app.use('/piece',router);

