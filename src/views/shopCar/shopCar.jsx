import React,{Component} from 'react'
import './shopcar.less'
import {connect} from 'react-redux'
import mapStateToProps from './state.js'
import mapDispatchToProps from './dispatch.js'
import CartItem from '../../components/cartItem/cartItem.jsx'
import $http from '../utils/http'
import {getCookie} from '../utils/utils'
class ShopCar extends Component{
	constructor(){
		super()
		this.state={
			str:'all',
			edit:'编辑',
			pay:'结算'
		}
		this.cartEdit=this.cartEdit.bind(this)
		this.delGoods=this.delGoods.bind(this)
	}
	render(){
		let {cartList,totalCost,selectAll,toggleSelectAll,delGoodsList} = this.props
		let {str,edit,pay} = this.state
		return <div className='box'>
			<header className='shopcar_header'>
				<p><i className='iconfont icon-xiangzuo'></i></p>
				<p><span>购物车</span></p>
				<p><span onClick={this.cartEdit}>{edit}</span><i className='iconfont icon-xiaoxi'></i></p>
			</header>
			<section>
				<div className='shopcar_content'>
					<ul>
						{
							cartList.map((item,ind) =>{
								return <CartItem key={ind} item={item}></CartItem>
							})
						}
					</ul>
				</div>
			</section>
			<footer className='cart_footer'>
				<p><i className={'iconfont' + (selectAll?' icon-dui':'')} onClick={()=>{
					this.setState({
						str:str=='all'?'none':'all'
					})
					toggleSelectAll(this.state.str)
				}}></i><span>全选</span></p>
				<p>
					<span>合计: <b>￥{totalCost}</b></span>
					<span className='cart_btn' onClick={this.delGoods}>{pay}</span>
				</p>
			</footer>
		</div>
	}
	cartEdit(){
		let {edit,pay} = this.state
		this.setState({
			edit:edit=='编辑'?'完成':'编辑',
			pay:pay=='结算'?'删除':'结算'
		})
	}
	delGoods(){
		let {cartList,delGoodsList} = this.props
		let selectedID=[]
		let {pay} = this.state
		if(pay=='删除'){
			cartList.map(file =>{
				if (file.selected==1){
					selectedID.push(file.id)
				}
			})
			delGoodsList(selectedID)
		}
	}
	componentDidMount(){
		this.props.fetchGoodlist(this.props.history)
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(ShopCar)