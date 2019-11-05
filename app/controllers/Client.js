const express = require('express');
const Client = require('../models/clienteDAO');
const router = express.Router();

router.get('/', async (req, res) => {

    const result = await Client.getClients();
    if(!result.detail){
        return res.send({"result":result})
    }
    else{
        return res.send({"result":result}).status(400);
    }
    

}); 


router.post('/register', async (req, res) => {
    console.log(req.body);
    const result = await Client.createClient(req.body);
    
    if(result.success){
        return  res.send({"result":"successfully registered"});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    

});

router.get('/:id', async (req, res) => {

    const result = await Client.getClient(req.params.id);
    if(!result.detail){
        return  res.send({"result":result});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    

}); 

router.put('/:id', async (req, res) => {
    
    const result = await Client.updateClient({"id":req.params.id,...req.body});
    if(result.success){
        return  res.send({"result":{"id":req.params.id,...req.body}});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    


}); 

router.delete('/:id', async (req, res) => {
    
    const result = await Client.deleteClient(req.params.id);
    if(result.success){
        return  res.send({"result":"row deleted"});
    }
    else{
        return res.send({"result":result}).status(400);
    }

}); 


module.exports = app => app.use('/client',router);

