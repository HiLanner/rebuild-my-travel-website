var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// 获取登陆页
router.get('/',checkLogin,function (req,res,next) {
    res.send(req.flash());
})

// 用户登录
router.post('/',checkLogin,function (req,res,next) {
    res.send(req.flash());
})

module.exports = router;