'use strict'

var mongoose = require('mongoose');  //conexion a la bd
var Schema = mongoose.Schema;  //definir squemas de la base de datos, permite guardar documentos en los esquemas en una coleccion en especifico 

var AlbumSchema = Schema({
	title: String,
	description: String,
	year: Number,
	image: String,
	artist: {type: Schema.ObjectId, ref: 'Artist'} //guarda el id de otro objeto haciendo referencia a la tabla artist
});  //mongodb añade automaticamente el id

module.exports = mongoose.model('Album',AlbumSchema); //se exporta el esquema para que pueda usarse fuera de este archivo

