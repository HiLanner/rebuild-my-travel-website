var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// POST /signin 用户登录
router.post('/', function(req, res, next) {
    var name = req.fields.name;
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            console.log(user)
            if (!user) {
                // req.flash('error', '用户不存在');
                var result = {
                    code: -1,
                    message: '用户名不存在'
                };
                return res.send(result);
            }
            // 检查密码是否匹配
            if (sha1(password) !== user.password) {
                var result = {
                    code: -1,
                    message: '密码错误'
                };
                return res.send(result);
            }
            // req.flash('success', '登录成功');
            // 用户信息写入 session
            delete user.password;
            req.session.user = user;
            // 跳转到主页
            var result = {
                code: 0,
                message: '验证通过',
                user: {
                    name: user.name,
                    avatar: user.avatar
                }
            };
            return res.send(result);
        })
        .catch(next);
});

module.exports = router;