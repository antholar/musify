'use strict'  //llamada a las librerias de node

var mongoose = require('mongoose');   // carga de la libreria en el proyecto
var app = require('./app'); //se carga el fichero de js en el cual se encuentra toda la configuracion de express, este archivo carga todas las configuraciones
var port = process.env.PORT || 3977; //puerto para el servidor web

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean', (err,res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexion a la base de datos esta corriendo bien.");
		app.listen(port,function(){
			console.log("Servidor del api rest de musica escuchando en http://localhost:"+port);
		});
	}
}); 