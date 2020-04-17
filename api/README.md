# Backend del sistema MUSIFY

Permite realizar consultas a la base de datos (MongoDB) y mostrarlas al usuario

## v1
Se subio todas las funciones del usuario, tambien se implemento un midleware para el control de acceso, usando el algoritmo JWT

### URLs generadas
        
```
Prueba del midleware y las rutas - http://localhost:3977/api/probando-controlador
Registrar usuario - http://localhost:3977/api/register
Login usuario - http://localhost:3977/api/login
actualizacion del usuario apartir del id y token - http://localhost:3977/api/update-user/<ID USER>
Actualizacion de la imagen del usuario - http://localhost:3977/api/upload-image-user/<ID USER>
Obtener la imagen del usuario - http://localhost:3977/api/get-image-user/<COD IMAGE>
```


## v2
Se subieron las funciones del artista. Se probo con otras formas para subir archivos al servidor. La peculiaridad de multipart, es que lo guarda en el servidor en el archivo. tiene q guardarlo para procesar informacion del nombre.

### URLs generadas
```
Get artista apartir del ID - http://localhost:3977/api/artist/<ID ARTISTA>
Guardar artista nuevo - http://localhost:3977/api/artist
Listado de multiples artistas indicando la pagina - http://localhost:3977/api/artists/1
Actualizar datos del artista - http://localhost:3977/api/artist/<ID ARTISTA>
Borrado del artista apartir del ID - http://localhost:3977/api/artist/<ID ARTISTA>
Actualizacion de la imagen del artista - http://localhost:3977/api/upload-image-artist/<ID ARTISTA>
Obtener la imagen del artista - http://localhost:3977/api/get-image-artist/<COD IMAGEN>
```
