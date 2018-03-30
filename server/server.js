const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./api.js')
app.use(bodyParser.json())//在这里挂在一下 才能接收到前端返回的数据

//设置跨域cors
app.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*')//*代表所有域名访问我的服务器的接口都可以访问到
	res.header('Access-Control-Allow-Headers','Content-Type,Token')//给响应头一个Content-Type
	res.header('Content-Type','application/json;charset=utf-8')
	next()
})//任意的请求都要经过过滤

//启动服务
api(app)

app.listen(8000,()=>{console.log('Service startup...')})