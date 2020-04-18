 'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var md_auth = require('../midleware/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty'); //libreria para subir ficheros
var md_upload = multipart({ uploadDir: './uploads/songs' });  //midleware donde se indica en que directorio se subiran

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);  //parametro temporal no obligatorio
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file-song/:id',[md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/get-song-file/:songFile',  SongController.getSongFile);


module.exports = api;


/*

,uploadFile
	,getSongFile
*/