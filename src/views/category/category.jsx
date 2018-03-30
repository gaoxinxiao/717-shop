import React,{Component} from 'react'
import './category.less'
import $http from '../utils/http.js'

class Category extends Component{
	constructor(){
		super()
		this.state={
			activeIndex:0,
			category_data:[]
		}
	}
	render(){
		let cartList = ['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜水果','米面粮油','调味调料','酒水饮料']
		let {category_data} = this.state
		return <div className='box'>
			<header className='category_header'>
				<p></p>
				<p><i className='iconfont icon-fangdajing'></i><input type="text" placeholder='请输入你要购买的商品'/></p>
				<p><i className='iconfont icon-xiaoxi'></i></p>
			</header>
			<section className='category_section'>
				<div className='categorySection_menu'>
					<ul>
						{
							cartList.map((item,ind) =>{
								return <li className={this.state.activeIndex==ind?'category_active':''} key={ind} onClick={()=>{this.toggleActive(ind)}}>{item}</li>
							})
						}
					</ul>
				</div>
				<div className='categorySection_content'>
					{
						category_data.map((item,ind) =>{
							return <dl key={ind}>
								<dt><img src={item.images}/></dt>
								<dd>{item.tit}</dd>
							</dl>
						})
					}
				</div>
			</section>
		</div>
	}
	toggleActive(ind){
		$http.get('/mobile/Category/categorySon',{id:ind+1}).then(res =>{
			this.setState({
				category_data:res.category_list
			})
		})
		this.setState({
			activeIndex:ind
		})
	}
	componentDidMount(){
		$http.get('/mobile/Category/categorySon',{id:1}).then(res =>{
			this.setState({
				category_data:res.category_list
			})
		})
	}
}
export default Category