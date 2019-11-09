const express = require('express');
const Item = require('./ItemDAL');
const router = express.Router();


router.get('/', async (req, res) => {

    const result = await Item.getAllItems();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Users


router.post('/register', async (req, res) => {
    
    const result = await Item.createItem(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create User

router.get('/:id', async (req, res) => {

    const result = await Item.getOneItem(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One User

router.put('/:id', async (req, res) => {
    
    const result = await Item.updateItems({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar

router.delete('/:id', async (req, res) => {
    
    const result = await Item.deleteItem(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar


module.exports = app => app.use('/item',router);

