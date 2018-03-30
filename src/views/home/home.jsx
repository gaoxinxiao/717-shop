import React,{Component} from 'react'
import $http from '../utils/http.js'
import SwiperComponent from '../../components/swiper/swiperComp.jsx'
import GoodsComponent from '../../components/goodsComp/goodsComponent.jsx'

class Home extends Component{
	constructor(){
		super()
		this.state={
			goodlist:[],
			count:2
		}
		this.scrolling=this.scrolling.bind(this)
		this.toSearch=this.toSearch.bind(this)
	}
	render(){
		let {goodlist} = this.state
		return <div onScroll={this.scrolling} ref='scroller' id='content'>
			<div ref='doc'>
				<header className='home_header'>
				<p><i><img src={require('../../static/imgs/icon1.gif')}/></i></p>
				<p><i className='iconfont icon-fangdajing'></i><input type="text" placeholder="请输入你要购买的商品" onFocus={this.toSearch}/></p>
				<p><span><i className='iconfont icon-01'></i><b>我的店铺</b></span><span><i className='iconfont icon-xiaoxi'></i><b>消息</b></span></p>
				</header>
				<section className='home_section'>
					<div className='home_banner'>
						<SwiperComponent></SwiperComponent>
					</div>
					<div className='home_category'>
						<dl>
							<dt><img src={require('../../static/imgs/pic1.gif')}/></dt>
							<dd>家乡味道</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic2.gif')}/></dt>
							<dd>进口食品</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic3.gif')}/></dt>
							<dd>牛奶乳品</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic4.gif')}/></dt>
							<dd>茶果冲饮</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic5.gif')}/></dt>
							<dd>休闲零食</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic6.gif')}/></dt>
							<dd>米面粮油</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic7.gif')}/></dt>
							<dd>调味调料</dd>
						</dl>
						<dl>
							<dt><img src={require('../../static/imgs/pic8.gif')}/></dt>
							<dd>酒水饮料</dd>
						</dl>
					</div>
					<div className='home_content'>
						{
							goodlist.map((item,ind) =>{
								return <GoodsComponent key={ind} data={item} history={this.props.history} location={this.props.location}></GoodsComponent>
							})
						}
						<p className='hide' ref='Bottom'>别拉了我是有底线的!!!</p>
					</div>
				</section>
			</div>
		</div>
	}
	toSearch(){
		this.props.history.push('/search')
	}
	componentDidMount(){
		$http.post('/mall/index/getGoodChannel',{id:this.state.count}).then(res =>{
			this.setState({
				goodlist:res
			})
		})
	}
	scrolling(){
		let count=0;
		let {scroller,doc,Bottom} = this.refs;
		let st = scroller.scrollTop//每次滑动距离顶部的高度
		let sw = scroller.offsetHeight//视窗高度
		let dh = doc.offsetHeight//总高度
		if (dh-(st+sw)<50) {
			this.setState({
				count:++this.state.count
			})
			$http.post('/mall/index/getGoodChannel',{id:this.state.count}).then(res =>{
				this.setState({
					goodlist:res
				})
			})
		//	Bottom.className='Bottom_show'
		}
	}
}
export default Home