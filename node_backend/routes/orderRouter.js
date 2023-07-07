const express = require('express');
const ordenRouter = express.Router();
controller = require('../controllers/orderController');

ordenRouter.route('/ordenes').get((req, res) => {
    controller.verOden(req,res);
});
ordenRouter.route('/allOrders').get((req, res) => {
    controller.show(req,res);
});
ordenRouter.route('/ordenes/ordenFalsa').get((req, res) => {
    controller.verOrdenFalsa(req,res);
});

ordenRouter.route('/ordenes/add').post((req, res) => {
    controller.agregarOrden(req,res);
});

ordenRouter.route('/ordenes/:id/edit').put((req, res) => {
    controller.editarOrden(req,res);
});

ordenRouter.route('/ordenes/:id/subido').put((req,res)=>{
    controller.subida(req,res);
});
ordenRouter.route('/ordenes/:id/finalizar').put((req,res)=>{
    controller.finalizar(req,res);
});

module.exports = ordenRouter;