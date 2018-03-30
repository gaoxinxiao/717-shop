import React,{Component} from 'react'
import $http from '../../views/utils/http.js'
import {getCookie} from '../../views/utils/utils.js'
import {ToastContainer,toast} from 'react-toastify'
import {connect} from 'react-redux'
import {ADD_CART} from '../../store/reducers.js'

class GoodsItem extends Component{
	constructor(){
		super()
		this.addCart=this.addCart.bind(this)
	}
 	render(){
 		let {data} = this.props;
 		return <dl className='goodsComp' onClick={()=>{this.toDetail(data.id)}}>
 			<dt><img src={data.images}/></dt>
 			<dd>
 				<p>{data.txt}</p>
 				<p><span>￥{data.price}.00</span><span className='iconfont icon-gouwuche' onClick={this.addCart}></span></p>
 				<ToastContainer></ToastContainer>
 			</dd>
 		</dl>
 	}
 	addCart(e){
 		e.stopPropagation()
 		let {data}=this.props
 		if(getCookie('token')){
 			//当cookie存在的时候 添加购物车
 			$http.post('/user/Cart/addCart',{
 				goods_id:data.id,
	 			goods_info:data,
	 			token:getCookie('token')
	 		}).then(res =>{
	 			if (res==1) {
	 				toast('购物车添加成功!')
	 				this.props.dispatch({
	 					type:ADD_CART,
	 					data:{
	 						...data,
	 						count:1,
	 						selected:0//代表未选中
	 					}
	 				})
	 			} else {
	 				toast('购物车添加失败!')
	 			}
	 		})
 		} else {
 			//不存在跳转登录
 			let {history,location} = this.props
 			history.push('/login',{
 				from:location.pathname
 			})
 		}
 	}
 	toDetail(goods_id){
 		this.props.history.push('/detail',{
 			goods_id:goods_id
 		})
 	}
}
export default connect()(GoodsItem)