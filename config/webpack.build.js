let baseConfig =require('./webpack.base') 
const webpack = require('webpack')
const UglifyPlugin = webpack.optimize.UglifyJsPlugin
const DefinePlugin = webpack.DefinePlugin
//生产者模式显示
baseConfig.plugins.push(new UglifyPlugin())
baseConfig.plugins.push(new DefinePlugin({
	'process.env':'"production"'
}))
module.exports={
	...baseConfig
}