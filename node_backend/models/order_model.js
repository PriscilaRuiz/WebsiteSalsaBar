var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/salsabar2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

const ordenSchema = new mongoose.Schema({
    persona: String,
    ip: String,
    celular:String,
    fecha: String,
    estado:Boolean,
    direccion:String,
    total:Number,
    pedido:[]
  
});
  
ordenSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
  
const Orden = mongoose.model('Orden', ordenSchema);
module.exports = Orden;
