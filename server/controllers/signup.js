var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// 获取注册页页
router.get('/',function (req,res,next) {
    res.render('signup');
})

// 获取注册信息
router.post('/',function (req,res,next) {
    res.send(req.flash());
})

module.exports = router;