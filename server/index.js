var express = require('express');
var path = require('path');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views',path.join(__dirname,'views'));//设置存放模版的目录
app.set('view engine','ejs');//设置模版为ejs

app.use('/',indexRouter);
app.use('/users',userRouter);
app.listen(3000,function(){
    console.log('app listening on port 3000!')
})