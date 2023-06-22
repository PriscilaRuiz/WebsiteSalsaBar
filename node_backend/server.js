var express = require('express'),
app = express(),
productRouter = require('./routes/productRouter'),
orderRouter = require('./routes/orderRouter'),
userRouter = require('./routes/userRouter');
const port = 3000;

app.use(express.json());

app.use('/api/v1/productos',productRouter);
app.use('/login',userRouter);
app.use('/api/v1/order',orderRouter);

app.listen(port, () =>{
    console.log(`Escuchando por el puerto ${port}`);
});