var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/salsabar");

var orderSchema = new Schema({
    _id: {type: Number},
    pedido: [],
    date_pedido : { type:Date, default:Date.now },
    entregado : {type:Boolean},
    comentario: {type:String}
});

var order = mongoose.model('Order',orderSchema,'ordenes');
module.exports = order;
