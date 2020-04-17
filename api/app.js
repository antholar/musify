'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/////////////////////////////
//se cargan las rutas
var user_routes = require('./routes/user'); 

//se procesan las peticiones post y get de forma json
app.use(bodyParser.urlencoded({extended:false}));  //necesario para que bodyparse funcione
app.use(bodyParser.json()); //se combierten a json las peticiones que llegan por http




//////////////////////////////
//configurar cabeceras http
// Configurar cabeceras y cors, sirve para determinar que tipos de autorizaciones son validas para 
// realizar consultas al api

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//////////////////////////////
//rutas base
 
app.use('/api',user_routes);

app.get('/pruebas',function(req,res){
	res.status(200).send({message: 'Curso de nodeJS'});
});

module.exports = app;   //se puede usar express en otros ficheros que tengan express, exportacion de express para otros ficheros



