var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/salsabar2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

const productoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: String,
    imagen:String
});
const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
