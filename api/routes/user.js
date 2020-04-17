'use strict'

var express = require('express');
var UserController = require('../controllers/user');
//variable que contiene el midleware, el midleware solo tiene una funcion
//lo que hace es extraer de la cabecera la variable authorization
var md_auth = require('../midleware/authenticated');



var api = express.Router();

var multipart = require('connect-multiparty'); //libreria para subir ficheros
var md_upload = multipart({ uploadDir: './uploads/users' });  //midleware donde se indica en que directorio se subiran los archivos


api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas); //se llama al controlador la funcion pruebas para la ruta probando-controlador
api.post('/register', UserController.saveUser); 
api.post('/login', UserController.loginUser); 
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);  //el id es un valor que se da, si se quisiera que el parametro sea opcional se tiene q poner id?
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile',  UserController.getImageFile);

// NOTA: Uso de midlewalres, se le pasa como segundo parametro a las direcciones


module.exports = api;  //se tiene q exportar el api para que pueda ser usado fuera de este fichero, y que pueda ser reconocido con todas las rutas