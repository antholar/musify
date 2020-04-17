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

//funcion que devuelve los parametros del album, tambien devuelve los datos del artista
//gracias a las vinculaciones que tiene en el modelo
function getAlbum(req,res){
	var albumId = req.params.id;
	Album.findById(albumId).populate({path: 'artist'}).exec((err,album) => {  //populate: funcion para obtener los datos vinculados al objeto
		if(err)
			res.status(500).send({message: 'Error en la peticion'});
		else{
			if(!album)
				res.status(404).send({message: 'El album no existe'});
			else
				res.status(200).send({album});
		}
	}); 
	//funcion para obtener el objeto al cual se tiene asociado
	//La funcion de exec es para ejecutar la funcion de findByID donde se pondra el callback y se revisara
	//si tiene errores la consulta o fue exitosa


	//res.status(200).send({message: 'Metodo de getAlbum del controlador del album'});
}

function getAlbums(req,res){
	var artistId = req.params.id;
	if(!artistId){ //en el caso que no llege el id muestra todos los albunes
		var find = Album.find().sort('title');
	}
	else{ //busqueda de los albunes de un artista 
		var find = Album.find({artist: artistId}).sort('year');
	}

	find.populate({path: 'artist'}).exec((err,albums) => {
		if(err)
			res.status(500).send({message: 'Error en la peticion'});
		else{
			if(!albums)
				res.status(404).send({message: 'No se pudo obtener los albunes.'});
			else
				res.status(200).send({albums});
		}
	});

}

function saveAlbum(req,res){
	var album = new Album();
	var params = req.body; //obtener lo que se mando por el req
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;

	album.save((err,albumStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}
		else{
			if(!albumStored)
				res.status(404).send({message: 'No se a guardado el album.' });
			else
				res.status(200).send({album: albumStored});
		}
	});
}

function updateAlbum(req,res){
	var albumId = req.params.id;  //se obtiene el id que se pasa por la url
	var update = req.body;
	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
		if(err)
			res.status(500).send({message: 'Error en el servidor'});
		else{
			if(!albumUpdated)
				res.status(404).send({message: 'No se a actualizado el album.' });
			else
				res.status(200).send({album: albumUpdated});
		}
	});
}

function deleteAlbum(req,res){
	var albumId = req.params.id;


	Album.findByIdAndRemove(albumId, (err,albumRemoved) => {
	if(err){
		res.status(500).send({message: 'Error al tratar de borrar el album'});	
	}
	else{
		if(!albumRemoved){
			res.status(404).send({message: 'Error al eliminar el album'});		
		}
		else{
			//En el caso que se encuentre el album y se borre
			//se necesita borrar todas las canciones
			Song.find({album: albumRemoved._id}).remove((err,songRemoved) => {
				if(err){
					res.status(500).send({message: 'Error al tratar de borrar la cancion'});	
				}
				else{
					if(!songRemoved){
						res.status(404).send({message: 'La cancion  no a sido eliminada'});		
					}
					else{
						res.status(200).send({album: albumRemoved});		

					}
				}
			}); 
		}
	}
	}); 

}

function uploadImage(req,res){
	var albumId = req.params.id;
	var file_name = "no subido";

	if(req.files){
		var file_path = req.files.image.path;  //nombre de la imagen que esta llegando al servidor
		var file_split = file_path.split('/');
		var file_name = file_split[2];
		
		var ext_split = file_name.split('\.'); //para obtener la extension del archivo
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Album.findByIdAndUpdate(albumId,{image: file_name}, (err, albumUpdated) => {
				if(!albumUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}
				else{
					res.status(200).send({album: albumUpdated});
				}
			});
		}
		else{
			res.status(200).send({message: 'Extension del archivo no valida'});	
		}
	}
	else{
		res.status(200).send({
			message: 'No has subido ninguna imagen ...'
		});
	}
}

//metodo para sacar un fichero del servidor
function getImageFile(req,res){
	var imageFile = req.params.imageFile;  //se recoge el url de la imagen
	var path_file = './uploads/album/'+imageFile; //ruta de la imagen a buscar

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
	getAlbum
	, saveAlbum
	, getAlbums
	, updateAlbum
	, deleteAlbum
	, uploadImage
	, getImageFile
}

