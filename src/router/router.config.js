//一级路由
import Index from '../views/index'//初级显示页面
import Detail from '../views/detail'//详情页
import Login from '../views/login'//登录页
import Regiset from '../views/register'//注册页
import Search from '../views/search'//搜索页
import Setting from '../views/setting'//设置页
import Consignee from '../views/consignee'//添加收货人
import DeliveryList from '../views/deliveryList'//收货地址


//二级路由
import Home from '../views/home'//首页
import Category from '../views/category'//分类
import ShopCar from '../views/shopCar'//购物车
import Mine from '../views/mine'//我的
import Result from '../views/result'//我的

let router ={
	routes:[
		{
			path:'/index',
			component:Index,
			children:[
				{
					path:'/index/home',
					component:Home
				},
				{
					path:'/index/category',
					component:Category
				},
				{
					path:'/index/shopCar',
					component:ShopCar,
					autherization:true
				},
				{
					path:'/index/mine',
					component:Mine,
					autherization:true
				},
				{
					path:'/index/result',
					component:Result
				}
			]	
		},
		{
			path:'/detail',
			component:Detail
		},
		{
			path:'/login',
			component:Login
		},
		{
			path:'/register',
			component:Regiset
		},
		{
			path:'/search',
			component:Search
		},
		{
			path:'/setting',
			component:Setting
		},
		{
			path:'/consignee',
			component:Consignee
		},
		{
			path:'/deliverylist',
			component:DeliveryList
		}
	]
}
export default router