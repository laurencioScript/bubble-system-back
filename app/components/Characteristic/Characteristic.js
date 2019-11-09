const express = require('express');
const Characteristic = require('./CharacteristicDAL');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Characteristic.getCharacteristics();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Characteristics


router.post('/register', async (req, res) => {
    
    const result = await Characteristic.createCharacteristic(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create Characteristic

router.get('/:id', async (req, res) => {

    const result = await Characteristic.getCharacteristic(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One Characteristic

router.put('/:id', async (req, res) => {
    
    const result = await Characteristic.updateCharacteristic({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar Characteristic

router.delete('/:id', async (req, res) => {
    
    const result = await Characteristic.deleteCharacteristic(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar Characteristic


module.exports = app => app.use('/characteristic',router);

