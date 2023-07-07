let Producto = require('../models/product_model');

module.exports = {
    verProducto: (req,res)=>{
        Producto.find({})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verAlitasSaladas:(req,res)=>{
        Producto.find({categoria: 'Salsa Salada'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verAlitasDulces:(req,res)=>{
        Producto.find({categoria: 'Salsa Dulce'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verAlitasPicantes:(req,res)=>{
        Producto.find({categoria: 'Salsa Picante'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verSalchis:(req,res)=>{
        Producto.find({categoria: 'Salchis'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verBebidas:(req,res)=>{
        Producto.find({categoria: 'Bebidas'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verCervezas:(req,res)=>{
        Producto.find({categoria: 'Cerveza'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verRefrescos:(req,res)=>{
        Producto.find({categoria: 'Refrescos'})
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            console.log(err);
        });
    },
    agregarProducto: (req,res)=>{
        const producto = new Producto(req.body);
        producto.save()
            .then(producto => {
            res.status(200).json({ 'producto': 'Producto añadido exitosamente' });
            })
            .catch(err => {
            res.status(400).send('No se pudo guardar el Producto');
            });
    },
    verCombos:(req,res)=>{
        Producto.find({categoria: 'Combos'})
        .then(persons => {
            res.json(persons);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verPersonales:(req,res)=>{
        Producto.find({categoria: 'Personal'})
        .then(persons => {
            res.json(persons);
        })
        .catch(err => {
            console.log(err);
        });
    },
}