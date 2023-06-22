var express = require('express'),
router = express.Router(),
controller = require('../controllers/productController');

router.get('/',(req,res)=>{
    controller.show(req,res);
});

router.post('/',(req,res)=>{
    controller.create(req,res);
});

router.post('/:id',(req,res)=>{
    controller.finOne(req,res);
});

router.put('/:id',(req,res)=>{
    controller.update(req,res);
});

router.delete('/:id',(req,res)=>{
    controller.delete(req,res);
});
module.exports = router;