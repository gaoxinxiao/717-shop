import React,{Component} from 'react'
import './mine.less'
import $http from '../utils/http.js'
import {connect} from 'react-redux'
import mapStateToProps from './state.js'

class Mine extends Component{
	constructor(){
		super()
		this.toSetting=this.toSetting.bind(this)
		this.toDeliveryList=this.toDeliveryList.bind(this)
	}
	render(){
		let {userInfo} = this.props
		return <div className='box'>
			<header className='mine_header'> 
				<span className='iconfont icon-shezhi' onClick={this.toSetting}></span>
				<span>我的717商城</span>
				<span className='iconfont icon-xiaoxi'></span>
			</header>
			<section>
				<div className="section_logo">
					<p><img src={require('../../static/imgs/logo.png')}/></p>
					<p>{userInfo.name}</p>
					<p>{userInfo.nickName}</p>
				</div>
				<div className='mine_section'>
					<p><i className='iconfont icon-01'></i><i className='iconfont icon-youjiantou-01'></i></p>
					<h1>我的店铺</h1>
					<ul>
						<li>
							<i className='iconfont icon-zixun'></i>
							<span>待付款</span>
						</li>
						<li>
							<i className='iconfont icon-gongzuojilu'></i>
							<span>待发货</span>
						</li>
						<li>
							<i className='iconfont icon-daishouhuo-01'></i>
							<span>待收货</span>
						</li>
						<li>
							<i className='iconfont icon-zhifu-01'></i>
							<span>售后</span>
						</li>
						<li>
							<i className='iconfont icon-wodedingdan'></i>
							<span>我的订单<i className='iconfont icon-youjiantou-01'></i></span>
						</li>
					</ul>
					<dl>
						<dt><i className='iconfont icon-gongzuojilu'></i></dt>
						<dd><span>账户余额</span><i className='iconfont icon-youjiantou-01'></i></dd>
					</dl>
					<dl onClick={this.toDeliveryList}>
						<dt><i className='iconfont icon-dizhi-01'></i></dt>
						<dd><span>地址管理</span><i className='iconfont icon-youjiantou-01'></i></dd>
					</dl>
					<dl>
						<dt><i className='iconfont icon-kefu'></i></dt>
						<dd><span>我的客服</span><i className='iconfont icon-youjiantou-01'></i></dd>
					</dl>
				</div>
			</section>
		</div>
	}
	toDeliveryList(){
		this.props.history.push('/deliverylist')
	}
	toSetting(){
		this.props.history.push('/setting')
	}
}
export default connect(mapStateToProps,null)(Mine)