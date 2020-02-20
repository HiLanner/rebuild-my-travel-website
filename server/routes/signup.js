var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// POST /signup 用户注册
router.post('/', function(req, res, next) {
    console.log(req.fields);
    var name = req.fields.name;
    var email = req.fields.email;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    // 校验参数
    try {
        if (!name.length) {
            throw new Error('请填写用户名称');
        }
        if (!email.length) {
            throw new Error('请填写邮箱');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        fs.unlink(req.files.avatar.path);
        // req.flash('error', e.message);
        var result = {
            code: -1,
            message: e.message
        };
        return res.send(result);
    }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        email: email,
        avatar: avatar
    };
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function (result) {
            console.log(result)
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            req.session.user = user;
            // 写入 flash
            // req.flash('success', '注册成功');
            // 跳转到首页
            // res.redirect('/posts');
            var response = {
                code: 0,
                message: '注册成功'
            };
            res.send(response)
        })
        .catch(function (e) {
            // 注册失败，异步删除上传的头像
            fs.unlink(req.files.avatar.path);
            // 用户名被占用则跳回注册页，而不是错误页
            var response = {
                code: -1,
                message: '用户名已被占用'
            };
            if (e.message.match('E11000 duplicate key')) {
                // req.flash('error', '用户名已被占用');
                return res.send(response);
            }
            next(e);
        });
});

module.exports = router;