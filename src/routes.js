const express = require('express');

const routes = express.Router();

routes.get('/', function(req,res){
    res.json({message:'Olá - mundo!'})
});

module.exports = routes;