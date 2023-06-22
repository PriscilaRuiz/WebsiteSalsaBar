## Install Dependencies
run `npm install` in the node_backend directory
## Run Server
run `node server.js` to initialize the server. Using Postman or Navigator, go to some API URL.
## URL Project
`Usuarios`
- - localhost:3000/login --> Methods : POST (Login users)
`Productos`
- localhost:3000/api/v1/productos --> Methods : GET and POST (Show and Create)
- localhost:3000/api/v1/productos/id --> Methods : PUT and DELETE (Update and Delete)
`Ordenes`
- localhost:3000/api/v1/ordenes --> Methods : GET and POST (Show and Create)
- localhost:3000/api/v1/ordenes/id/estado --> Methods : POST (Update the status of entregado from false to true) 
- localhost:3000/api/v1/ordenes/id --> Methods : PUT (Update)
