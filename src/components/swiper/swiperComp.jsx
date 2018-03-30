import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
class SwiperComponent extends Component{
	render(){
		return <div className='swiper-container' ref='scDom'>
			<div className='swiper-wrapper'>
				<div className="swiper-slide"><img src={require('../../static/imgs/banner1.png')}/></div>
				<div className="swiper-slide"><img src={require('../../static/imgs/banner2.png')}/></div>
				<div className="swiper-slide"><img src={require('../../static/imgs/banner3.png')}/></div>
				<div className="swiper-slide"><img src={require('../../static/imgs/banner4.png')}/></div>
			</div>
			<div className="swiper-pagination"></div>
		</div>
	}
	componentDidMount(){
		new Swiper(this.refs.scDom,{
			autoplay:true,
			loop:true,
			pagination: {
		      el: '.swiper-pagination',
		    },
		})
	}
}
export default SwiperComponent