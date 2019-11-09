const express = require('express');
const Service = require('./ServiceDAL');
const router = express.Router();


router.get('/', async (req, res) => {

    const result = await Service.getAllServices();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Users


router.post('/register', async (req, res) => {
    
    const result = await Service.createService(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create User

router.get('/:id', async (req, res) => {

    const result = await Service.getOneService(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One User

router.put('/:id', async (req, res) => {
    
    const result = await Service.updateService({"id_servico":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar

router.delete('/:id', async (req, res) => {
    
    const result = await Service.deleteService(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar


module.exports = app => app.use('/service',router);

