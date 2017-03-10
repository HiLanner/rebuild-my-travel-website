var WebpackDevServer = require('webpack-dev-server');
var webpack = require("webpack");
var config = require('./webpack.config');
var devPort = 8080;
// 添加livereload的client path
for (var i in config.entry) {
    config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, "webpack/hot/dev-server")
}
var compiler = webpack(config);
var server = new WebpackDevServer(compiler,{
    contentBase: "http://localhost:8080/assets/",
    hot: true
});
server.listen(devPort)