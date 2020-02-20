var fs = require('fs');
var express = require('express');
var router = express.Router();
var StrategyModel = require('../models/strategys');
var checkLogin = require('../middlewares/check').checkLogin;
var StrategyCommentModel = require('../models/strategyComment');
//get获取所有文章内容
router.get('/', function(req, res, next) {
    var city = req.query.city;

    StrategyModel.getStrategys(city)
        .then(function (strategys) {
            var result = {
                code: 0,
                message: '发表成功',
                strategys: strategys
            };
            return res.send(result);
        })
        .catch(next);
});

// POST /posts 发表一篇文章
router.post('/create', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;
    var tag = req.fields.tag;

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        // req.flash('error', e.message);
        var result = {
            code: -1,
            message: e.message
        };
        return res.send(result);
    }

    var strategy = {
        author: author,
        title: title,
        content: content,
        tag: tag,
        pv: 0
    };

    StrategyModel.create(strategy)
        .then(function (result) {
            // 此 post 是插入 mongodb 后的值，包含 _id
            strategy = result.ops[0];
            // req.flash('success', '发表成功');
            // 发表成功后返回数据
            var result = {
                code: 0,
                message: '发表成功',
            };
            return res.send(result);
        })
        .catch(next);
});


// GET /posts/:postId 单独一篇的文章页
router.get('/:strategyId', function(req, res, next) {
    var strategyId = req.params.strategyId;

    Promise.all([
        StrategyModel.getStrategyById(strategyId),// 获取文章信息
        StrategyCommentModel.getComments(strategyId),// 获取该文章所有留言
        StrategyModel.incPv(strategyId)// pv 加 1
    ])
        .then(function (data) {
            var strategy = data[0];
            var comments = data[1];
            console.log(strategy.replysCount,"####################")
            if (!strategy) {
                throw new Error('该文章不存在');
            }else {
                var result = {
                    code: 0,
                    message: '查看成功',
                    strategy: {
                        id: strategy._id,
                        title: strategy.title,
                        content: strategy.content,
                        tag: strategy.tag,
                        pv: strategy.pv,
                        commentsCount: strategy.commentsCount,
                        replysCount: strategy.replysCount
                    },
                    author: {
                        id: strategy.author._id,
                        name: strategy.author.name,
                        avatar: strategy.author.avatar
                    },
                    comments: comments
                };
                return res.send(result);
            }
        })
        .catch(next);
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:strategyId/comment', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var strategyId = req.params.strategyId;
    var content = req.fields.content;
    var comment = {
        author: author,
        strategyId: strategyId,
        content: content
    };

    StrategyCommentModel.create(comment)
        .then(function () {
            // req.flash('success', '留言成功');
            // 留言成功后跳转到上一页
            // res.redirect('back');
            var result = {
                code: 0,
                message: '发表成功',
            };
            res.send(result)
        })
        .catch(next);
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:strategyId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    var commentId = req.params.commentId;
    var author = req.session.user._id;

    StrategyCommentModel.delCommentById(commentId, author)
        .then(function () {
            var result = {
                code: 0,
                message: '删除成功',
            };
            res.send(result)
        })
        .catch(next);
});

// POST /posts/:postId/comment 创建一条回复
router.post('/:strategyId/comment/:commentId/reply', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var strategyId = req.params.strategyId;
    var commentId = req.params.commentId;
    var content = req.fields.content;
    var reply = {
        author: author,
        strategyId: strategyId,
        strategyCommentId: commentId,
        content: content
    };

    StrategyCommentModel.create(reply)
        .then(function () {
            var result = {
                code: 0,
                message: '发表成功',
            };
            res.send(result)
        })
        .catch(next);
});

// GET /posts/:postId/comment/:commentId/remove 删除一条回复
router.get('/:strategyId/comment/:commentId/reply/:replyId/remove', checkLogin, function(req, res, next) {
    var replyId = req.params.replyId;
    var author = req.session.user._id;

    StrategyCommentReplyModel.delReplyById(commentId, author)
        .then(function () {
            var result = {
                code: 0,
                message: '删除成功',
            };
            res.send(result)
        })
        .catch(next);
});


module.exports = router;