var fs = require('fs');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require("webpack");
var config = require('./webpack.config');
var devPort = 8081;
// 添加livereload的client path
var exec = require('child_process').exec;
for (var i in config.entry) {
    config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, "webpack/hot/dev-server")
}
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
console.log(config);
var compiler = webpack(config);
var server = new WebpackDevServer(compiler,{
    // contentBase: "http://localhost:8080",
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        colors: true,
        chunks: false,
    }
});
// fs.watch('./client/views/', function() {
//     exec('webpack --progress --hide-modules', function(err, stdout, stderr) {
//         if (err) {
//             console.log(stderr);
//         } else {
//             console.log(stdout);
//         }
//     });
//
// });
server.listen(devPort)