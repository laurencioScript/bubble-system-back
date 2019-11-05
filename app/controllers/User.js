const express = require('express');
const User = require('../models/userDAO');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {

    const result = await User.getUsers();
    if(result.rows){
        return res.send({"result":result.rows})
    }
    else{
        return res.send({"result":result.detail}).status(400);
    }
    

}); // List All Users


router.post('/register', async (req, res) => {
    
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUsers(req.body);
    
    if(result.success){
        return  res.send({"result":"successfully registered"});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    

});// Create User

router.get('/:id', async (req, res) => {

    const result = await User.getUser(req.params.id);
    if(result.rows){
        return  res.send({"result":result.rows});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    

}); //List One User

router.put('/:id', async (req, res) => {
    if(req.body.password != '')
        req.body.password = await bcrypt.hash(req.body.password, 10);
    
    const result = await User.updateUser({"id":req.params.id,...req.body});
    if(result.success){
        return  res.send({"result":{"id":req.params.id,...req.body}});
    }
    else{
        return res.send({"result":result}).status(400);
    }
    


}); //Editar

router.delete('/:id', async (req, res) => {
    
    const result = await User.deleteUser(req.params.id);
    if(result.success){
        return  res.send({"result":"row deleted"});
    }
    else{
        return res.send({"result":result}).status(400);
    }

}); //Deletar


module.exports = app => app.use('/user',router);

