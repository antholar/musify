'use strict'

var bcrypt = require('bcrypt-nodejs'); //modulo para encriptar contraseñas
var User = require('../models/user');
var jwt = require('../services/jwt');

var fs = require('fs');       //liberrias usadas para trabajar con los archivos
var path = require('path');

function pruebas(req,res){
	res.status(200).send({
		message: 'Probando una accion del controlador de usuario de; api res de nodejs'
	});
}

//guardar el usuario en la base de datos, siempre y cuando 
function saveUser(req,res){
	var user = new User();
	var params = req.body;  //se recogen los datos de la peticion
	
	//console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_USER';
	user.image = 'null';

	if(params.password){
		// encriptar contraseña y  guardar datos
		// la funcion hash sirver para encriptar el primer param, el cuarto parametro es una funcion 
		// callback que sirver para manejar errores y la encriptacion, en el callback, la variable
		// hast es la data ya encriptada
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.pass = hash;
			if(user.name != null && user.surname != null && user.email != null){
				//se guardarn los datos, usando 
				// al exportarel objeto de schema de mongoose ya se exportaron todas las funciones de la libreria
				// por eso se puede usar la clase save
				user.save((err,userStored) => {
					if(err){
						res.status(500).send({message: 'SaveUser: Huno un error al guardar al usuario en la BD'});
					}
					else{
						if(!userStored){
							res.status(404).send({message: 'No se guardo elo usuario'});
						}
						else{
							res.status(200).send({message: userStored});
						}

					}
					
				}); //funcion de mongoose
			}
			else{
				res.status(200).send({message: 'Introduce todos los campos'});
			}

		});
	}
	else{
		res.status(500).send({message: 'Introduce la contraseña'});
	}

}

// consulta del login del usuario, si es correcto, retorna un toquen, de otro modo un estado
function loginUser(req,res){
	var params = req.body;
	var email = params.email;
	var pass = params.password;

	//consulta los datos del usuario en la base de datos, obteniendo el objeto user
	//con todos los datos del usuario
	User.findOne({email: email.toLowerCase() }, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}
		else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}
			else{
				//compara desencriptando la contraseña ingresada, con la contraseña de la BD
				bcrypt.compare(pass, user.pass, function(err,check){
					if(check){
						//devolver los datos del usuario logueado
						if(params.gethash){  //al pasarle el parametro gethash devuelve el hash del usuario donde estan todos los datos del usuario
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}
						else{
							res.status(200).send({user});
						}
					}
					else{
						res.status(404).send({message: 'El usuario no ha podido loguearse. Compruebe que el usuario y la contraseña seran correctos.'});
					}
				});

			}

		}
	} );
}

//actualizacion de los datos del usuario, recibiendo como parametro el id
function updateUser(req,res){
	var userId = req.params.id;
	var update = req.body;     //se guardan todos los datos de la peticion, datos del usuario que se quiere actualizar

	//es necesario que funcione con token, ya que la variable user.sub, se agregar al Request 
	//despues de haber pasado por el midleware
	if(userId != req.user.sub){
		return res.status(500).send({message: 'No se envio el id del usuario que quiere actualizar'});
	}

	//metodo de mongoose para actualizar los datos, apartir del id, recordar que el id es generado por mongo
	User.findByIdAndUpdate(userId,update, (err,userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}	
		else{
			if(!userUpdated){  //en el caso que no retorno nada al actualizar los datos
				res.status(404).send({
					message: 'No se a podido actualizar el usuario'
				});
			}
			else{
				res.status(200).send({
					user:userUpdated
				});
			}
		}
	});
}

//meotodo para subir una imagen y guardarla en una carpeta, el midleware se encarga de guardar la imagen en la carpeta
//como parametro es necesario pasar el id del usuario
function uploadImage(req,res){
	var userId = req.params.id;
	var file_name = 'Imagen no subida....';

	if(req.files){
		var file_path = req.files.image.path;  //nombre de la imagen que esta llegando al servidor, como la variable se llama image, obtiene los datos de esta variable
		var file_split = file_path.split('/');
		var file_name = file_split[2];
		
		var ext_split = file_name.split('\.'); //para obtener la extension del archivo
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			User.findByIdAndUpdate(userId,{image: file_name}, (err, userUpdated) => {
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}
				else{
					res.status(200).send({image: file_name, user: userUpdated});
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
	var path_file = './uploads/users/'+imageFile; //ruta de la imagen a buscar

	fs.exists(path_file, function(exists){
		if(exists){ //existe la imagen en el fichero
			res.sendFile(path.resolve(path_file));
		}
		else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

//en el controlador se ponen todas las funciones que se exportaran para que puedan ser llamadas desde afuera
module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};