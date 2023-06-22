let Order = require('../models/order_model');

module.exports = {
    show: (req,res)=>{
        Order.find({})
        .then((ordenes)=>{
            res.json(ordenes);
        })
        .catch((err)=>{
            console.error('Ocurrio un error al listar las ordenes', err);
        });
    },
    create:(req,res)=>{
        let order = new Order;
        order._id = req.body._id,
        order.pedido = req.body.pedido,
        order.entregado = req.body.entregado,
        order.comentario = req.body.comentario

        order.save()
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            console.log('Error al insertar',err);
        })
    },
    update: (req,res)=>{
        let id = req.params.id,
        order = new Order;
        order._id = req.body._id,
        order.pedido = req.body.pedido,
        order.entregado = req.body.entregado,
        order.comentario = req.body.comentario

        Order.updateOne({_id:id},order)
        .then(()=>{
            res.send('Se modifico el objeto');            
        })
        .catch((err)=>{
            console.error('Error al modificar orden',err)
        })
    },
    act_estado_pedido: (req,res)=>{
        let id = req.params.id;
        Order.findByIdAndUpdate({_id:id},{$set:{entregado: true}})
        .then(()=>{
            res.send('Se modifico el estado de la orden');    
        })
        .catch((err)=>{
            console.err('Error al modificar el estado de la orden',err);
        });
    }
}