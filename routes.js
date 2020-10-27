const { Router } = require('express')
const routes = Router();

const unity = require('./src/app/unity/unity.api');
const login = require('./src/app/user/login.api');

const root = Router();
root.get("/ping", async (req, res) => {res.status(200).send({ message: 'pong' });})


routes.use('/', root);
routes.use('/unity', unity);
routes.use('/user', login);

module.exports = routes;