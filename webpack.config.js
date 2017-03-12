var path = require('path');
var webpack = require('webpack');
var serverConfig = require('./server.config');
var autoprefixer = require('autoprefixer');

//var glob = require('glob');//利用glob模块可以很方便的获取src/scripts/page路径下的所有js入口文件。同理，可以实现自动的进行与入口文件相对应的模板配置
/*
 html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*
 extract-text-webpack-plugin插件，
 有了它就可以将你的样式提取到单独的css文件里，
 再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
    entry: serverConfig.entries,
    output: {
        path: path.resolve(__dirname,'build'),
        publicPath: '/static/',
        filename: '[name]/[name]-[hash:5].js'
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel"
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.styl$/,
                // loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
                loader: ExtractTextPlugin.extract('style', 'css!stylus')
            },
            {
                test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf|ico)$/i,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: '[name]-[hash:5].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name]/[name].[hash:5].css'),//单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    ],
    postcss: function () {
        return [
            autoprefixer({browsers: '> 1%'})
        ]
    }
}

// var pages = Object.keys(serverConfig.entries);
// pages.forEach(function (pathname) {
//     var conf = {
//         filename: './views/' + pathname +'.html',
//         template: 'client/views/' + pathname + '.html',
//         inject: false
//     }
//     if (pathname in config.entry){
//         // conf.favicon = 'client/images/favicon.ico';
//         conf.inject = 'body';
//         // conf.chunks = ['vendors', pathname];
//         conf.hash = true;
//         conf.chunks = [pathname];
//     }
//     console.log('===================================================================')
//     config.plugins.push(new HtmlWebpackPlugin(conf));
//     console.log(config.plugins)
// })

var pages = Object.keys(serverConfig.entries);
// pages.forEach(function (pathname) {
pages.forEach(function(pathname) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    // webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: './views/' + pathname +'.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: 'client/views/' + pathname + '.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [pathname]
    });
    config.plugins.push(plugin);
})

module.exports = config;