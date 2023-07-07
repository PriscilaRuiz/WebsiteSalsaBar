const express = require('express');
const productoRouter = express.Router();
Pcontroller = require('../controllers/productController');

productoRouter.route('/productos').get((req, res) => {
    Pcontroller.verProducto(req,res);
});

productoRouter.route('/productos/alitas_saladas').get((req, res) => {
    Pcontroller.verAlitasSaladas(req,res);
});
productoRouter.route('/productos/alitas_dulces').get((req, res) => {
    Pcontroller.verAlitasDulces(req,res);
});
productoRouter.route('/productos/alitas_picantes').get((req, res) => {
    Pcontroller.verAlitasPicantes(req,res);
});

productoRouter.route('/productos/salchis').get((req, res) => {
    Pcontroller.verSalchis(req,res);
});

productoRouter.route('/productos/bebidas').get((req, res) => {
    Pcontroller.verBebidas(req,res);
});
productoRouter.route('/productos/cerveza').get((req, res) => {
    Pcontroller.verCervezas(req,res);
});
productoRouter.route('/productos/refrescos').get((req, res) => {
    Pcontroller.verRefrescos(req,res);
});
productoRouter.route('/productos/combos').get((req, res) => {
    Pcontroller.verCombos(req,res);
});
productoRouter.route('/productos/personales').get((req, res) => {
    Pcontroller.verPersonales(req,res);
});
productoRouter.route('/productos/add').post((req, res) => {
    Pcontroller.agregarProducto(req,res);
});

module.exports = productoRouter;