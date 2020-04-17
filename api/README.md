# Backend del sistema MUSIFY

Permite realizar consultas a la base de datos (MongoDB) y mostrarlas al usuario

## v1
Se subio todas las funciones del usuario, tambien se implemento un midleware para el control de acceso, usando el algoritmo JWT

### URLs generadas
        ```
        http://localhost:3977/api/probando-controlador
        http://localhost:3977/api/register
        http://localhost:3977/api/login
        http://localhost:3977/api/update-user/<ID USER>
        http://localhost:3977/api/upload-image-user/<ID USER>
        http://localhost:3977/api/get-image-user/<COD IMAGE>.png
        ```