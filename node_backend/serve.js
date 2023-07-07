
///////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productoRouter = require('./routes/productRouter');
const ordenRouter = require('./routes/orderRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api', ordenRouter);
app.use('/api', productoRouter);
app.use('/login', userRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor backend en ejecución en el puerto: ' + port);
});
