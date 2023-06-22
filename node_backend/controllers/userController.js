//Llamar al archivo de variables de entorno
require('dotenv').config();
//Llamar a librerias
let User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_API_KEY;
module.exports = {
    findUser: (req,res) =>{
        let user ={
            correo : req.body.correo,
            pass :req.body.pass
        }
        User.findOne({correo:user.correo, pass:user.pass})
        .then((userData)=>{
            let usuarioLogin = {
                correo: userData.correo,
                nombre: userData.nombre
            }
            const token = jwt.sign({
                usuarioLogin,
                exp : Date.now() + 60 * 1000
            }, jwtKey);
            res.send({token});
        })
        .catch((err)=>{
            console.error('Error al encontrar el usuario',err);
        });
    }
}