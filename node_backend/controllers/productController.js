let Product = require('../models/product_model');

module.exports = {
    show: (req,res)=>{
        Product.find({})
        .then((productos)=>{
            res.json(productos);
        }) 
        .catch((err)=>{
            console.error('Ocurrio un error al listar los productos: ', err);
        });
    },
    finOne: (req,res)=>{
        let id = req.params.id;
        Product.findById({_id:id})
        .then((product)=>{
            res.json(product);
        })
        .catch((err)=>{
            console.error('Error al encontrar el producto: ', err);
        });
    },
    create: (req,res)=>{
        let product = new Product;
        product._id = req.body._id,
        product.nombre = req.body.nombre,
        product.precio = req.body.precio,
        product.categoria = req.body.categoria,
        product.descripcion = req.body.descripcion

        product.save()
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            console.error('Error al insertar el producto: ', err);
        });
    },
    update: (req,res)=>{
        let id = req.params.id,
        product = new Product;
        product.nombre = req.body.nombre,
        product.precio = req.body.precio,
        product.categoria = req.body.categoria,
        product.descripcion = req.body.descripcion

        Product.updateOne({_id:id},product)
        .then((newProduct)=>{
            res.send("Se modifico el objeto");
        })
        .catch((err)=>{
            console.log('Error al modificar el producto: ', err);
        });
    },
    delete:(req,res)=>{
        let id = req.params.id;
        Product.findByIdAndDelete(id)
        .then((product)=>{
            if(!product){
                return res.status(404).send();
            }
            res.send(product);
        })
        .catch((err) => {
            console.log('Error al eliminar el producto: ', err);
        });
    }
}