import React,{Component} from 'react'
import './deliveryList.less'
import {connect} from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import $http from '../utils/http'
import {getCookie} from '../utils/utils.js'

let bStyle = {
	color:"red",
	fontSize:'18px',
}
class DeliveryList extends Component{
	constructor(){
		super()
		this.toConsignee=this.toConsignee.bind(this)
		this.toMain=this.toMain.bind(this)
	}
	render(){
		return <div className='box DeliveryList_box'>
			<header className='DeliveryList_header'>
				<span className='iconfont icon-xiangzuo' onClick={this.toMain}></span>
				<span>收货地址</span>
				<span></span>
			</header>
			<section className='DeliveryList_section'>
				<ul>
					{
						this.props.deliveryList.length==0?<b style={bStyle}>暂无地址记录请添加!!!</b>:(
							this.props.deliveryList.map((file,ind) =>{
								return <li key={ind}>
									<p>{file.name} <span>{file.phone}</span></p>
									<p>{file.province}{file.city}{file.region}{file.address}</p>
									<div>
										<p><i className='iconfont icon-dui'></i><span>默认地址</span></p>
										<p>
											<span onClick={()=>{this.editAddress(ind)}}><i className='iconfont icon-bianji1'></i>编辑</span>
											<span onClick={()=>{this.delAddress(ind)}}><i className='iconfont icon-shanchu'></i>删除</span>
										</p>
									</div>
								</li>
							})
						)
					}
				</ul>
				<p onClick={this.toConsignee}><i className='iconfont icon-jia'></i><button>新增地址</button></p>
			</section>
		</div>
	}
	toConsignee(){
		this.props.history.push('/consignee')
	}
	toMain(){
		this.props.history.push('/index/mine')
	}
	componentDidMount(){
		$http.post('/user/Mail/receiving',{
			token:getCookie('token')
		}).then(res =>{
			this.props.delivery_list(res)
		})
	}
	delAddress(ind){
		$http.post('/user/Mail/delAddress',{
			token:getCookie('token'),
			id:ind
		}).then(res =>{
			if (res.success==1) {
				this.props.del_delivery(res.delivery)
			}
		})
	}
	editAddress(ind){
		$http.post('/user/Mail/editAddress',{
			token:getCookie('token'),
			id:ind
		}).then(res =>{
			this.props.edit_address(res.editAddressData)
			this.props.history.push('/consignee')
		})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliveryList)