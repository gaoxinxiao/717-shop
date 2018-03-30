//dev启服务，不用进行压缩
//build不用启服务，要进行压缩，代码分离
let path = require('path')
let dir = process.cwd()

let baseConfig={
	//入口模块
	entry:{
		'bundle':dir+'/main.js'
	},
	output:{
		path:dir+'/dist',
		filename:"[name].js"
	},
	module:{
		rules:[
			{
				test:/\.(js|jsx)$/,
				use:['babel-loader']
			},
			{
				test:/\.(jpg|gif|jpeg|png)$/,
				use:['url-loader']
			},
			{
				test:/\.(eot|log|woff|woff2|svg|ttf)$/,
				use:['url-loader']
			},
			{
				test:/\.less$/,
				use:['style-loader','css-loader','less-loader']
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
	plugins:[]
}
module.exports=baseConfig