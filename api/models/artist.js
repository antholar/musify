'use strict'

var mongoose = require('mongoose');  //conexion a la bd
var Schema = mongoose.Schema;  //definir squemas de la base de datos, permite guardar documentos en los esquemas en una coleccion en especifico 

var ArtistSchema = Schema({
	name: String,
	description: String,
	image: String
});  //mongodb añade automaticamente el id

module.exports = mongoose.model('Artist',ArtistSchema); //se exporta el esquema para que pueda usarse fuera de este archivo