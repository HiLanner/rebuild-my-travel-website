var Strategy = require('../lib/mongo').Strategys;
var StrategyCommentModel = require('./strategyComment');
var StrategyReplyModel = require('./strategyReply');
// 将 post 的 content 从 markdown 转换成 html
Strategy.plugin('contentToHtml', {
    afterFind: function (strategys) {
        return posts.map(function (strategy) {
            strategys.content = marked(strategy.content);
            return strategy;
        });
    },
    afterFindOne: function (strategy) {
        if (strategy) {
            strategy.content = marked(strategy.content);
        }
        return strategy;
    }
});

// 给 strategy 添加留言数 commentsCount
Strategy.plugin('addCommentsCount', {
    afterFind: function (strategys) {
        return Promise.all(strategys.map(function (strategy) {
            return StrategyCommentModel.getCommentsCount(strategy._id).then(function (commentsCount) {
                strategy.commentsCount = commentsCount;
                return strategy;
            });
        }));
    },
    afterFindOne: function (strategy) {
        if (strategy) {
            return StrategyCommentModel.getCommentsCount(strategy._id).then(function (count) {
                strategy.commentsCount = count;
                return strategy;
            });
        }
        return strategy;
    }
});

// 给 strategy 添加回复数 replysCount
Strategy.plugin('addReplysCount', {
    afterFind: function (strategys) {
        return Promise.all(strategys.map(function (strategy) {
            return StrategyReplyModel.getReplysCount(strategy._id).then(function (replysCount) {
                strategy.replysCount = replysCount;
                return strategy;
            });
        }));
    },
    afterFindOne: function (strategy) {
        if (strategy) {
            return StrategyReplyModel.getReplysCount(strategy._id).then(function (count) {
                strategy.replysCount = count;
                return strategy;
            });
        }
        return strategy;
    }
});

module.exports = {
    // 创建一篇文章
    create: function create(strategy) {
        return Strategy.create(strategy).exec();
    },
    // 通过文章 id 获取一篇文章
    getStrategyById: function getStrategyById(strategyId) {
        return Strategy
            .findOne({ _id: strategyId })
            .populate({ path: 'author', model: 'User' })
            .addCreatedAt()
            .addCommentsCount()
            .addReplysCount()
            .exec();
    },

    // 按创建时间降序获取所有文章或者某个城市的所有文章
    getStrategys: function getStrategys(city) {
        var query = {};
        if (city) {
            query.tag = city;
        }
        return Strategy
            .find(query)
            .sort({ _id: -1 })
            .addCreatedAt()
            .addCommentsCount()
            .exec();
    },

    // 通过文章 id 给 pv 加 1
    incPv: function incPv(postId) {
        return Strategy
            .update({ _id: postId }, { $inc: { pv: 1 } })
            .exec();
    }
};