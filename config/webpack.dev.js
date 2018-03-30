let baseConfig =require('./webpack.base') 
//开发者模式显示
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin
baseConfig.plugins.push(new DefinePlugin({
	'process.env':'"development"'
}))
module.exports={
		...baseConfig,
		devServer:{
			historyApiFallback:true,
			open:true,
			inline:true,
			port:8080
		},
		devtool:'eval-source-map'
	}