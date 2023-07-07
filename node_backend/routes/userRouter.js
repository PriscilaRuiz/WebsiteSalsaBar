var express = require('express'),
router = express.Router(),
controller = require('../controllers/userController');

router.get('/usuarios',(req,res)=>{
    controller.show(req,res);
});
router.post('/usuarios',(req,res)=>{
    controller.create(req,res);
});
router.post('/',(req,res)=>{
    controller.findUser(req,res);
});
router.delete('/usuarios/:id',(req,res)=>{
    controller.deleteUser(req,res);
});
module.exports = router;