import React,{Component} from 'react'
import './setting.less'
import {Dialog} from '../dialog/dialog.jsx'
import {loginout} from '../utils/utils'

class Setting extends Component{
	constructor(){
		super()
		this.loginout=this.loginout.bind(this)
		this.state={
			flag:false
		}
	}
	render(){
		return <div className='box setting_bg'>
			<header className='setting_header'>
				<span className='iconfont icon-xiangzuo'></span>
				<span>设置</span>
				<span className='iconfont'></span>
			</header>
			<section className='setting_section' >
				<ul>
					<li>
						<p>我的头像</p>
						<p>
							<span><img src={require('../../static/imgs/setting_logo.gif')}/></span>
							<i className='iconfont icon-chevron-thin-right'></i>
						</p>
					</li>
					<li>
						<p>用户名</p>
						<p>
							<span>路飞</span>
							<i className='iconfont icon-chevron-thin-right'></i>
						</p>
					</li>
					<li>
						<p>我的二维码名片</p>
						<p>
							<span className='iconfont icon-fengjing'></span>
							<i className='iconfont icon-chevron-thin-right'></i>
						</p>
					</li>
				</ul>
				<p><button onClick={this.loginout}>退出登录</button></p>
				{
					this.state.flag&&<Dialog loginout={loginout} history={this.props} confirm={'确认'} cancel={'取消'}/>
				}
			</section>
		</div>
	}
	loginout(){
		this.setState({
			flag:true
		})
		let dialog_bg = document.querySelector('.dialog_bg')
		dialog_bg!=null?dialog_bg.className='dialog_bg':''
	}
}
export default Setting