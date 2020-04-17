 'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var md_auth = require('../midleware/authenticated');

var api = express.Router(); //permite hacer las funciones get post put

var multipart = require('connect-multiparty'); //libreria para subir ficheros
var md_upload = multipart({ uploadDir: './uploads/artist' });  //midleware donde se indica en que directorio se subiran

api.get('/artist/:id',md_auth.ensureAuth , ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth , ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth , ArtistController.getArtists); // en este metodo el ? quiere decir que sea opcional, si no se pone nada es obligatorio
api.put('/artist/:id',md_auth.ensureAuth , ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth , ArtistController.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile',  ArtistController.getImageFile);

module.exports = api; 