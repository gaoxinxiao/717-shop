const fs = require('fs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
module.exports=(app)=>{
	// //编辑收货地址
	app.post('/user/Mail/editAddress',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.end(JSON.stringify({
					detail:err.TokenExpiredError,
					error:1,
					info:'登陆过期 请重新登录'
				}))
			} else {
				let editAddress = JSON.parse(fs.readFileSync(__dirname+'/delivery.json',{encoding:'utf-8'}))
				let editAddressList = editAddress[decoded.username]
				editAddressList.map((file,ind) =>{
					if (req.body.id==ind) {
						res.json({
							success:1,
							info:'修改成功',
							editAddressData:file
						})
					}
				})
			}
		})
	})
	//地址管理区数据
	app.get('/user/Mail/pcr',(req,res)=>{
		let pcrData=fs.readFileSync('./pcr.json',{encoding:'utf-8'})
		res.end(pcrData)
	})
	//商品列表的接口
	app.post('/mall/index/getGoodChannel',(req,res)=>{
		let data=fs.readFileSync('mock.json',{encoding:'utf-8'})
		let newArr=[];
		JSON.parse(data).list.find((file,ind) =>{
			newArr.push(file)
			return ind>req.body.id
		})
		res.end(JSON.stringify(newArr))
	})

	//注册接口
	app.post('/user/register',(req,res)=>{
		let user = fs.readFileSync('user.json',{encoding:'utf-8'})//先转化Buffer数据
		user=JSON.parse(user)
		user.push(req.body)//把每次获取到的数据存到user里面
		fs.writeFile('user.json',JSON.stringify(user),()=>{
			res.end(JSON.stringify({//返回成功注册之后的信息
				"success":1,
				"info":"register success"
			}))
		})
	})
	//登录接口
	app.post('/user/login',(req,res)=>{
		let user = fs.readFileSync(__dirname+'/user.json',{encoding:'utf-8'})//先转化Buffer数据
		user=JSON.parse(user)
		let login= req.body
		let resInfo={
			success:'0',
			info:"用户名或密码错误",
			token:''
		}
		user.forEach(item =>{
			if (item.username==login.username&&item.password==login.password) {
				resInfo.success=1,
				resInfo.info="login success",
				resInfo.user={
					name:item.username,
					time:new Date().toLocaleTimeString(),
					nickName:'Mr.G'
				}
			}
		})
		if (resInfo.success==1){
			resInfo.token=jwt.sign(login,'1511',{
				expiresIn:60*60//设置token时间
			})//用户信息可以是一个对象或者字符串
		}
		res.end(JSON.stringify(resInfo))
	})


	//注册购物车接口
	app.post('/user/Cart/addCart',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.end(err)
			} else {
				res.end('1')
				let cartInfo = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
				if (cartInfo[decoded.username]) {
					let recordList = cartInfo[decoded.username];
					let flag = false;//新加商品
					recordList.forEach((item,ind) =>{
						if (item.id==req.body.goods_info.id) {
							++item.count
							flag=true
						}
					})
					if(!flag){
						let record = req.body.goods_info
						record.count=1//第一次追加的时候追加到数据里面
						record.selected=0
						//查看cartInfo里面是否有这个信息，没有的话追加到里面
						cartInfo[decoded.username].push(record)
					}
				} else {
					let record = req.body.goods_info
					record.count=1//第一次追加的时候追加到数据里面
					record.selected=0
					cartInfo[decoded.username]=[record]
					//在cartInfo如果有这个信息，就直接追加到里面
					cartInfo[decoded.username]=[req.body.goods_info]
				}
				fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cartInfo),()=>{
					//添加成功的情况返回值
					res.end('1')
				})
			}
		})
			res.end(JSON.stringify('1'))
	})

	//注册分类
	app.get('/mobile/Category/categorySon',(req,res)=>{
		let data = JSON.parse(fs.readFileSync(__dirname+'/category_info.json',{encoding:'utf-8'}))
		data.list.forEach((item,ind) =>{
			if (item.id==req.query.id) {
				res.end(JSON.stringify(item))
			}
		})
	})
	app.post('/user/Cart/goodsList',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.end(JSON.stringify({
					detail:err.TokenExpiredError,
					error:1,
					info:'登陆过期 请重新登录'
				}))
			} else {
				try{
					let goodsRecord = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
					let goodsList = goodsRecord[decoded.username] || []
					res.json(goodsList)
				}
				catch(err){
					res.json(err)
				}
			}
		})
	})
	//删除购物车指定商品
	app.post('/user/Cart/delGoods',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.end(JSON.stringify({
					detail:err.TokenExpiredError,
					error:1,
					info:'登陆过期 请重新登录'
				}))
			} else {
				let GoodsList = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
				let delGoodsList = GoodsList[decoded.username]//取到当前账号对应的数据
				_.remove(delGoodsList,(file)=>{
					return req.body.selectedID.indexOf(file.id)>-1
				})
				GoodsList[decoded.username]=delGoodsList
				fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(GoodsList),()=>{
					//添加成功的情况返回值
					res.json({
						success:1,
						info:'删除成功',
						GoodsList
					})
				})
			}
		})
	})
	//添加邮寄地址
	app.post('/user/Mail/addNew',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.json(err)
			} else {
				let usr = decoded.username;
				let delivery=JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
				delete req.body.token
				if (delivery[usr]) {
					delivery[usr].push(req.body)
				} else {
					delivery[usr]=[req.body]
				}
				fs.writeFile('./delivery.json',JSON.stringify(delivery),(err)=>{
					if (err){
						res.json(err)
					} else {
						res.json({
							success:1,
							info:'地址添加成功'
						})
					}
				})
			}
		})
		
	})
	//收货地址接口
	app.post('/user/Mail/receiving',(req,res)=>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.json(err)
			} else {
				let delivery=JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
				res.json({
					success:1,
					deliveryInfo:delivery
				})
			}
		})
		
	})
	//删除收货地址
	app.post('/user/Mail/delAddress',(req,res) =>{
		jwt.verify(req.body.token,'1511',(err,decoded)=>{
			if (err) {
				res.json(err)
			} else {
				let delivery=JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
				let deliveryList = delivery[decoded.username]//取到当前账号对应的数据
				_.remove(deliveryList,(file,ind)=>{
					return req.body.id==ind
				})
				delivery[decoded.username]=deliveryList
				fs.writeFile(__dirname+'/delivery.json',JSON.stringify(delivery),()=>{
					//添加成功的情况返回值
					res.json({
						success:1,
						info:'删除成功',
						delivery
					})
				})
			}
		})
	})
}