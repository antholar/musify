'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var md_auth = require('../midleware/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty'); //libreria para subir ficheros
var md_upload = multipart({ uploadDir: './uploads/album' });  //midleware donde se indica en que directorio se subiran

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.get('/albums/:id?',md_auth.ensureAuth,AlbumController.getAlbums);
api.put('/album/:id',md_auth.ensureAuth,AlbumController.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile',  AlbumController.getImageFile);

module.exports = api;