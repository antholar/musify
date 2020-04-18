# Backend del sistema MUSIFY

Permite realizar consultas a la base de datos (MongoDB) y mostrarlas al usuario

## v1
Se subio todas las funciones del usuario, tambien se implemento un midleware para el control de acceso, usando el algoritmo JWT

### URLs generadas
        

- Prueba del midleware y las rutas
    - http://localhost:3977/api/probando-controlador
- Registrar usuario
    - http://localhost:3977/api/register
- Login usuario
     - http://localhost:3977/api/login
- actualizacion del usuario apartir del id y token
    - http://localhost:3977/api/update-user/<ID USER>
- Actualizacion de la imagen del usuario
     - http://localhost:3977/api/upload-image-user/<ID USER>
- Obtener la imagen del usuario
    - http://localhost:3977/api/get-image-user/<COD IMAGE>



## v2
Se subieron las funciones del artista. Se probo con otras formas para subir archivos al servidor. La peculiaridad de multipart, es que lo guarda en el servidor en el archivo. tiene q guardarlo para procesar informacion del nombre.

### URLs generadas

- Get artista apartir del ID
     - http://localhost:3977/api/artist/<ID ARTISTA>
- Guardar artista nuevo
    - http://localhost:3977/api/artist
- Listado de multiples artistas indicando la pagina
    - http://localhost:3977/api/artists/1
- Actualizar datos del artista
    - http://localhost:3977/api/artist/<ID ARTISTA>
- Borrado del artista apartir del ID
    - http://localhost:3977/api/artist/<ID ARTISTA>
- Actualizacion de la imagen del artista
    - http://localhost:3977/api/upload-image-artist/<ID ARTISTA>
- Obtener la imagen del artista
    - http://localhost:3977/api/get-image-artist/<COD IMAGEN>



## v3 
Se subieron las funciones de Album

### URLs generadas
- Get album apartir del ID
    - http://localhost:3977/api/album/<ID ALBUM>
- Guardado del album
    - http://localhost:3977/api/album
- Listar albunes con o sin el id del artista
    - http://localhost:3977/api/albums/
- Actualizar album apartir del ID
    - http://localhost:3977/api/album/<ID ALBUM>
- Borrar album con el id del album
    - http://localhost:3977/api/album/<ID ALBUM>
- Upload imagen album con el id del album
    - http://localhost:3977/api/upload-image-album/<ID ALBUM>
- Get imagen album apartir del nombre de la imagen
    - http://localhost:3977/api/get-image-album/<ID IMAGEN>


## v4
Se subieron las funciones de la cancion

## URLs generadas
- Obtener datos de la cancion
    - http://localhost:3977/api/song/<ID SONG>
- Guardar cancion
    - http://localhost:3977/api/song
- Listado de canciones con o sin id de la cancion. Al no poner el id del album, muestra todas las canciones
    - http://localhost:3977/api/songs/
- Actualizar cancion con el id de la cancion
    - http://localhost:3977/api/song/<ID SONG>
- Borrar Cancion
    - http://localhost:3977/api/song/<ID SONG>
- Upload file song
    - http://localhost:3977/api/upload-file-song/<ID SONG>
- Get file song, necesita el ID de la cancion
    - http://localhost:3977/api/get-song-file/<NOMBRE FILE >
- 
    - 
- 
    - 
- 
    - 