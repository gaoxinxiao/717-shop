//同源策略:1.协议相同2.域名相同3.端口号相同
//基于fetch封装的请求方法，支持get和post

//本地测试服务器域名 
let domin;
if (process.env=='development') {
	domin = 'http://localhost:8000'
}
if (process.env=='production') {
	domin = 'http://www.lb717.com'
}
let $http={
	get(url,data){
		if (data) {
			if (Object.prototype.toString.call(data)!='[object Object]') {
				return {
					then(callback){
						//这里接收到错误 把错误传到函数里面
						callback('get请求入参格式不正确,需要传object格式');
						return{
							catch(err){
								err(new Error('入参格式不正确'))
							}
						}
					}
				};
			}
			let queryString='?'
			for (let i in data) {
				queryString+=(i+"="+data[i]+'&')
			}
			queryString=queryString.slice(0,-1)//把最后一项截取掉
			url=encodeURI(url+queryString)
		}
		return fetch(domin+url,{//把域名拼接到接口上
			headers:{
				'Content-Type':'application/json;charset=utf-8'
			}
		}).then(res =>res.json())
	},
	post(url,data){
		if (Object.prototype.toString.call(data)!='[object Object]') {
			return {
				then(callback){
					//这里接收到错误 把错误传到函数里面
					callback('get请求入参格式不正确,需要传object格式');
					return{
						catch(err){
							err(new Error('入参格式不正确'))
						}
					}
				}
			};
		}
		return fetch(domin+url,{
			body:JSON.stringify(data),
			headers:{//这里必须和服务端对应上 否则在后端拿不到前端传回来的数据
				'Content-Type':'application/json;charset=utf-8',
				"Token":''
			},
			"method":"POST"
		}).then(res =>res.json())
	}
}
export default $http