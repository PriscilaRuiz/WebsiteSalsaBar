var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/salsabar2");

var userSchema = new Schema({
    _id: {type:Number},
    nombre: {type:String,require:true},
    password: {type:String,require:true},
    correo: {type:String,require:true,unique:true}
});

var user = mongoose.model('User',userSchema,'users');
module.exports = user;