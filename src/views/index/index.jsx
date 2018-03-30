import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../../static/css/common.less'
import '../../static/fonts/iconfont.css'
import Home from '../home'//首页
import Category from '../category'//分类
import ShopCar from '../shopCar'//购物车
import Mine from '../mine'//我的
import RouteWraper from '../../components/routeWraper.jsx'

class Index extends Component{
	render(){
		let {routes} = this.props
		return <div className='box'>
			<section><RouteWraper routes={routes}></RouteWraper></section>
			<footer>
				<NavLink to={{pathname:'/index/home'}} activeClassName='tab_active'><i className='iconfont icon-shouye'></i><span>首页</span></NavLink>
				<NavLink to={{pathname:'/index/category'}} activeClassName='tab_active'><i className='iconfont icon-fenlei-xuanzhong'></i><span>分类</span></NavLink>
				<NavLink to={{pathname:'/index/shopCar'}} activeClassName='tab_active'><i className='iconfont icon-gouwuche'></i><span>购物车</span></NavLink>
				<NavLink to={{pathname:'/index/mine'}} activeClassName='tab_active'><i className='iconfont icon-wode'></i><span>我的</span></NavLink>
			</footer>
		</div>
	}
}
export default Index