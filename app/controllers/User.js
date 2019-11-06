const express = require('express');
const User = require('../models/userDAO');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    
    req.body.password = await bcrypt.hash(req.body.password, 10);
    
    const result = await User.createUsers(req.body);
    
    return (!result.error)? res.status(200).send({"result":"successfully registered"}):  res.status(400).send({"result":result});

});// Create User

router.get('/', async (req, res) => {

    const result = await User.getUsers();

    return (!result.error)?res.status(200).send(result):res.status(400).send({"result":result});
    
}); // List All Users



router.get('/:id', async (req, res) => {

    const result = await User.getUser(req.params.id);
   
    return (!result.error) ? res.status(200).send(result) : res.status(400).send({"result":result});

}); //List One User

router.get('/test', async(req,res)=>{
   
    console.log(req.params.email,req.params.senha)
 
});

router.put('/:id', async (req, res) => {
    
    req.body.password = (req.body.password != '') ? await bcrypt.hash(req.body.password, 10):req.body.password;
    
    const result = await User.updateUser({"id":req.params.id,...req.body});

    return (!result.error) ? res.status(200).send({"result":"row update"}) : res.status(400).send({"result":result});

}); //Editar

router.delete('/:id', async (req, res) => {
    
    const result = await User.deleteUser(req.params.id);
      
    return (!result.error)?res.status(200).send({"result":"row deleted"}) : res.status(400).send({"result":result});
    
}); //Deletar


module.exports = app => app.use('/user',router);

