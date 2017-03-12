var express = require('express');
var path = require('path')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
var config = require('config-lite');
var flash = require('connect-flash');
var routes = require('./routes/index');
var pkg = require('./../package.json');

app.set('views',path.join(__dirname,'views'));//设置存放模版的目录
app.set('view engine','ejs');//设置模版为ejs
// app.set(express.static(path.join(__dirname,'build')));// 设置静态文件目录
// session中间件
// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))
app.use(flash())
app.locals.travel = {
    title: pkg.name,
    description: pkg.description
}
app.use(function (req,res,next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next()
})
routes(app);
app.listen(3000,function(){
    console.log('app listening on port 3000!')
})