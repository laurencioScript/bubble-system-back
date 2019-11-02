const express = require('express');
const User = require('../models/userDAO');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {

    const result = await User.getUsers();
    return res.send({"result":result.rows})

}); // List All Users


router.post('/register', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUsers(req.body);
    return  res.send({"result":"successfully registered"});

});// Create User

router.get('/:id', async (req, res) => {

    const result = await User.getUser(req.params.id);
    return  res.send({"result":result.rows});

}); //List One User

router.put('/:id', async (req, res) => {

    const result = await User.updateUser({"id":req.params.id,...req.body});
    return  res.send({"result":{"id":req.params.id,...req.body}});
}); //Editar

router.delete('/:id', async (req, res) => {
    const result = await User.deleteUser(req.params.id);
    return  res.send({"result":"row deleted"});

}); //Deletar


module.exports = app => app.use('/produto',router);