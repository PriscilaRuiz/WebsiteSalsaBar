var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/salsabar");

var userSchema = new Schema({
    _id: {type:Number},
    nombre: {type:String,require:true},
    pass: {type:String,require:true,unique:true},
    correo: {type:String}
});

var user = mongoose.model('User',userSchema,'users');
module.exports = user;