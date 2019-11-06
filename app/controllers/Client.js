const express = require('express');
const Client = require('../models/clienteDAO');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Client.getClients();
    
    return (!result.error)? res.status(200).send(result) : res.status(400).send({"result":result}); 
    

}); 


router.post('/register', async (req, res) => {
    console.log(req.body);
    const result = await Client.createClient(req.body);
    
    return (!result.error) ? 
        res.status(200).send({"result":"successfully registered"}) : 
        res.status(400).send({"result":result}); 
    

});

router.get('/:id', async (req, res) => {

    const result = await Client.getClient(req.params.id);
    return(!result.error)?res.status(200).send(result): res.status(400).send({"result":result});
    

}); 

router.put('/:id', async (req, res) => {
    
    const result = await Client.updateClient({"id":req.params.id,...req.body});

    return (!result.error) ? 
        res.status(200).send({"result":{"id":req.params.id,...req.body}}) : 
        res.status(400).send({"result":result});


}); 

router.delete('/:id', async (req, res) => {
    
    const result = await Client.deleteClient(req.params.id);
    return (!result.error) ? res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});

}); 


module.exports = app => app.use('/client',router);

