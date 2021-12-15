const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usuarios.controllers')

// => ROTAS 
routes.get('/', Usuario.index);
routes.post('/api/usuarios', Usuario.create);
module.exports = routes;

