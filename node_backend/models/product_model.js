var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/salsabar");

var productSchema = new Schema({
    _id : {type: Number},
    nombre: {type: String, require:true},
    precio: {type: Number, require:true},
    categoria: {type: String, require:true},
    descripcion: {type: String, require:true},
});

var product = mongoose.model('Product',productSchema,'productos');
module.exports = product;