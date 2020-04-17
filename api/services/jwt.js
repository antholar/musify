'use strict'

var jwt = require('jwt-simple'); //se importa la libreria del jwt
var moment = require('moment'); //
var secret = 'clave_secreta_curso';

exports.createToken = function(user){
	var payload = {  //se guardanr los registros de la base de datos
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),   //unix= formato de fecha
		exp: moment().add(15, 'minutes').unix() 
	};

	return jwt.encode(payload, secret);
}