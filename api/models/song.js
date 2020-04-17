'use strict'

var mongoose = require('mongoose');  //conexion a la bd
var Schema = mongoose.Schema;  //definir squemas de la base de datos, permite guardar documentos en los esquemas en una coleccion en especifico 

var SongSchema = Schema({
	number: Number,
	name: String,
	duration: String,
	file: String,
	album: {type: Schema.ObjectId, ref: 'Album'} //guarda el id de otro objeto haciendo referencia a la tabla artist
});  //mongodb añade automaticamente el id

module.exports = mongoose.model('Song',SongSchema); //se exporta el esquema para que pueda usarse fuera de este archivo

