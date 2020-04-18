'use strict'

var bcrypt = require('bcrypt-nodejs'); //modulo para encriptar contraseñas
var jwt = require('../services/jwt');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

//liberrias usadas para trabajar con los archivos
var fs = require('fs');       //devuelve la imagen cargada
var path = require('path');    //subir una imagen al servidor
var mongoosePaginate = require('mongoose-pagination');


function getSong(req,res){
	var songId = req.params.id;
	Song.findById(songId).populate({path: 'album'}).exec((err,song) => {
		if(err)
			res.status(500).send({message: 'Error en la peticion'});
		else{
			if(!song)
				res.status(404).send({message: 'La song no existe'});
			else
				res.status(200).send({song});
		}
	}); 

	//res.status(200).send({message: 'Controlador cancion'});
}

function saveSong(req,res){
	var song = new Song();
	var params = req.body;
	song.number = params.number;
	song.name = params.name;
	song.duration = params.duration;
	song.file = null;
	song.album = params.album;

	song.save((err,songStored) => {
		if(err)
			res.status(500).send({message: 'Error en la peticion'});
		else{
			if(!songStored)
				res.status(404).send({message: 'la cancion no se guardo'});
			else
				res.status(200).send({song: songStored});
		}
	});
}

function getSongs(req,res){
	var albumId = req.params.album;

	if(!albumId){ //en el caso que no llege el id muestra todos los albunes
		var find = Song.find().sort('number');
	}
	else{ //busqueda de los albunes de un artista 
		var find = Song.find({album: albumId}).sort('number');
	}

	find.populate({
		path: 'album',
		populate: {  //se popula los datos del artista al sacar los datos del album
			path: 'artist',
			model: 'Artist'
		}
	}).exec((err,songs) => {
		if(err)
			res.status(500).send({message: 'Error en la peticion'});
		else{
			if(!songs)
				res.status(404).send({message: 'No se pudo obtener las canciones.'});
			else
				res.status(200).send({songs});
		}
	});
}

function updateSong(req,res){
	var songId = req.params.id;
	var update = req.body;

	Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
		if(err)
			res.status(500).send({message: 'Error en el servidor'});
		else{
			if(!songUpdated)
				res.status(404).send({message: 'No se a actualizado la cancion.' });
			else
				res.status(200).send({song: songUpdated});
		}
	});

}

function deleteSong(req,res){
	var songId = req.params.id;
	Song.findByIdAndDelete(songId, (err, songRemove) => {
		if(err)
			res.status(500).send({message: 'Error en el servidor'});
		else{
			if(!songRemove)
				res.status(404).send({message: 'No se a borrado la cancion.' });
			else
				res.status(200).send({song: songRemove});
		}
	});

}

function uploadFile(req,res){
	var songId = req.params.id;
	var file_name = "no subido";

	if(req.files){
		var file_path = req.files.file.path;  //file nombre de la imagen que esta llegando al servidor
		var file_split = file_path.split('/');
		var file_name = file_split[2];
		
		var ext_split = file_name.split('\.'); //para obtener la extension del archivo
		var file_ext = ext_split[1];

		if(file_ext == 'mp3'){
			Song.findByIdAndUpdate(songId,{file: file_name}, (err, songUpdated) => {
				if(!songUpdated){
					res.status(404).send({message: 'No se ha podido actualizar la cancion'});
				}
				else{
					res.status(200).send({album: songUpdated});
				}
			});
		}
		else{
			res.status(200).send({message: 'Extension del archivo no valida'});	
		}
	}
	else{
		res.status(200).send({
			message: 'No has subido ningun archivo ...'
		});
	}
}

//metodo para sacar un fichero del servidor
function getSongFile(req,res){
	var songFile = req.params.songFile;  //se recoge el url de la imagen
	var path_file = './uploads/songs/'+songFile; //ruta de la imagen a buscar

	fs.exists(path_file, function(exists){
		if(exists){ //existe la imagen en el fichero
			res.sendFile(path.resolve(path_file));
		}
		else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

module.exports = {
	getSong
	,saveSong
	,getSongs
	,updateSong
	,deleteSong
	,uploadFile
	,getSongFile
};