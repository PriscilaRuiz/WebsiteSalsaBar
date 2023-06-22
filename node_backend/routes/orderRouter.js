var express = require('express'),
router = express.Router(),
controller = require('../controllers/orderController');

router.get('/',(req,res)=>{
    controller.show(req,res);
});

router.post('/',(req,res)=>{
    controller.create(req,res);
});

router.put('/:id',(req,res)=>{
    controller.update(req,res);
});

router.post('/:id/estado',(req,res)=>{
    controller.act_estado_pedido(req,res);
});

module.exports = router;