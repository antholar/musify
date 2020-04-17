'use strict'

var mongoose = require('mongoose');  //conexion a la bd
var Schema = mongoose.Schema;  //definir squemas de la base de datos, permite guardar documentos en los esquemas en una coleccion en especifico 

var UserSchema = Schema({
	name: String,
	surname: String,
	email: String,
	pass: String,
	role: String,
	image: String
});  //mongodb añade automaticamente el id

module.exports = mongoose.model('User',UserSchema); //se exporta el esquema para que pueda usarse fuera de este archivo