let Orden = require('../models/order_model');

module.exports = {
    show: (req,res)=>{
        Orden.find({})
        .then(ordenes => {
            res.json(ordenes);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verOden: (req,res)=>{
        Orden.find({estado: false})
        .then(ordenes => {
            res.json(ordenes);
        })
        .catch(err => {
            console.log(err);
        });
    },
    verOrdenFalsa:(req,res)=>{
        Orden.find({estado: false})
        .then(ordenes => {
            res.json(ordenes);
        })
        .catch(err => {
            console.log(err);
        });
    },
    agregarOrden: (req,res)=>{
        const orden = new Orden(req.body);
        orden.save()
            .then(orden => {
            res.status(200).json({ 'producto': 'Producto añadido exitosamente' });
            })
            .catch(err => {
            res.status(400).send('No se pudo guardar el Producto');
            });
    },
    editarOrden: (req,res)=>{
        const orderId = req.params.id;
        const nuevoDato = req.body.nuevo;
        const antiguoDato = req.body.existente;
      
        antiguoDato.push(nuevoDato);
        const ingreso = {
          pedido: antiguoDato
        }
        Orden.updateOne({_id:orderId},ingreso)
          .then(() => {
            res.status(200).json({ 'orden': 'Orden actualizada exitosamente' });
          })
          .catch(err => {
            console.log(err);
            res.status(400).send('No se pudo actualizar la orden');
          });
    },
    subida: (req,res)=>{
        const orderId = req.params.id;
        const nuevoEstado = req.body.estado;
        const totalNuevo = req.body.total;
        const personaNuevo = req.body.persona;
        const celularNuevo = req.body.celular;
        const direccionNuevo = req.body.direccion;

        ingreso = {
            persona: personaNuevo,
            celular: celularNuevo,
            estado: nuevoEstado,
            direccion: direccionNuevo,
            total:totalNuevo
        };
        

        Orden.updateOne({ _id: orderId }, ingreso)
            .then(() => {
            res.status(200).json({ 'orden': 'Orden subida exitosamente' });
            })
            .catch(err => {
            console.log(err);
            res.status(400).send('No se pudo actualizar la orden');
            });
    },
    finalizar: (req,res)=>{
        const orderId = req.params.id;
        const nuevoPedido = req.body.nuevo;

        const ingreso = {
            pedido: nuevoPedido
        };


        Orden.updateOne({ _id: orderId }, ingreso)
            .then(() => {
            res.status(200).json({ 'orden': 'Orden actualizada exitosamente' });
            })
            .catch(err => {
            console.log(err);
            res.status(400).send('No se pudo actualizar la orden');
            });
    },
}