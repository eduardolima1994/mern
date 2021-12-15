const express = require('express');

const routes = express.Router();

// => ROTAS 
routes.get('/', function(req,res){
    res.json({message:'Olá - mundo!'})
});

module.exports = routes;

