 'use strict'

var jwt = require('jwt-simple'); //se importa la libreria del jwt
var moment = require('moment'); //
var secret = 'clave_secreta_curso';

exports.ensureAuth = function(req,res,next){  //el next sirve para salir del midleware despues que se autentico

	if(!req.headers.authorization){
		return res.status(403).send({
			message: 'La peticion no tiene la cabecera de autenticacion.'
		});
	}

	var token = req.headers.authorization.replace(/['"]+/g,'');
	try{
		var payload = jwt.decode(token,secret);
		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				message: 'El token ha expirado.'
			});		
		}
	}
	catch(ex){
		console.log(ex);
		return res.status(404).send({
			message: 'Token no valido o expirado.'
		});	
	}

	req.user = payload;
	next();   //salir de la funcion midleware
}