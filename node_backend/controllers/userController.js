//Llamar al archivo de variables de entorno
require('dotenv').config();
//Llamar a librerias
let User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_API_KEY;
module.exports = {
    show:(req,res)=>{
        User.find({},{_id:1,nombre:1,correo:1})
        .then((usuarios)=>{
            res.json(usuarios);
        })
        .catch((err)=>{
            console.log("Error al mostrar usuarios",err);
        });
    },
    create: (req,res)=>{
        let user = new User;
        user._id = req.body._id,
        user.nombre = req.body.nombre,
        user.correo = req.body.correo,
        user.password = req.body.password
        
        user.save()
        .then((user)=>{
            res.json(user);
        })
        .catch((err)=>{
            console.log("Error al insertar usuario",err);
        })
    },
    findUser: (req,res) =>{
        let user ={
            correo : req.body.correo,
            pass :req.body.password
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
            const dataLogin ={
                id: userData.id,
                name: userData.nombre,
                correo: userData.correo,
                accesstoken: token,
                expire: Date.now() + 60 * 1000
            }
            res.send({dataLogin});
        })
        .catch((err)=>{
            console.error('Error al encontrar el usuario',err);
        });
    },
    deleteUser(req,res){
        let id = req.params.id;
        User.findByIdAndDelete({_id:id})
        .then((user) =>{
            res.json(user);
        })
        .catch((err)=>{
            console.log("Error al eliminar usuario", err);
        })
    }
}