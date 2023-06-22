var express = require('express'),
router = express.Router(),
controller = require('../controllers/userController');

router.post('/',(req,res)=>{
    controller.findUser(req,res);
})
module.exports = router;