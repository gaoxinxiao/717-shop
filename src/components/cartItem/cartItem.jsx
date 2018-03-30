import React,{Component} from 'react'
import {UPDATE_GOODS_SELECTED} from '../../store/reducers'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch.js'

class CartItem extends Component{
	constructor(){
		super()
	}
	render(){
		let {item,updateCount,toggleSelect} = this.props
		return (
			<li>
				<p><span onClick={()=>{toggleSelect((1-item.selected),item.id)}} className={'iconfont' + (item.selected==0?'':' icon-dui')}></span></p>
				<dl>
					<dt><img src={item.images}/></dt>
					<dd>
						<p>{item.txt}</p>
						<p>x{item.count}</p>
						<p><span>￥{item.price}.00</span><span>
							<button onClick={()=>{updateCount(--item.count,item.id)}}>-</button>
							<b>{item.count}</b>
							<button onClick={()=>{updateCount(++item.count,item.id)}}>+</button>
						</span></p>
					</dd>
				</dl>
			</li>
		)
	}
}

export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)