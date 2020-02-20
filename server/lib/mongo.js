var config = require('../config/default');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
});
exports.Strategys = mongolass.model('Strategys', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: { type: 'string' },
    tag: {type: 'string'},
    pv: { type: 'number' }
});
exports.Strategys.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.StrategyComment = mongolass.model('StrategyComment', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    strategyId: { type: Mongolass.Types.ObjectId }
});
exports.StrategyComment.index({ strategyId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.StrategyComment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言

exports.StrategyReply = mongolass.model('StrategyReply', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    strategyId: { type: Mongolass.Types.ObjectId },
    strategyCommentId: { type: Mongolass.Types.ObjectId }
});
exports.StrategyReply.index({ strategyCommentId: 1, _id: 1 }).exec();// 通过评论id 获取该评论下所有回复，按回复创建时间升序
exports.StrategyReply.index({ strategyId: 1, _id: 1 }).exec();// 通过攻略id 获取该攻略下所有评论回复，按回复创建时间升序
exports.StrategyReply.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和评论 id 删除一个留言


// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});
mongolass.connect(config.mongodb);