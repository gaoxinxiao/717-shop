import React,{Component} from 'react'
import $http from '../utils/http.js'
class Register extends Component{
	constructor(){
		super()
		this.toRegister=this.toRegister.bind(this)
		this.fromLogin=this.fromLogin.bind(this)
	}
	render(){
		return <div className='box'>
			<header className='register_header'>
				<span className='iconfont icon-xiangzuo'></span>
				<span>注册717</span>
				<span onClick={this.fromLogin}>登录</span>
			</header>
			<section className='register_section'>
				<p><i className='iconfont icon-wode'></i><input type="text" placeholder='请您输入手机号' ref='username'/></p>
				<p><i className='iconfont icon-anquanshezhi'></i><input type="password" placeholder='请您输入密码' ref='password'/></p>
				<p className='hide_register' ref='show'>注册成功，请登录</p>
				<p><button onClick={this.toRegister}>立即注册</button></p>
			</section>
		</div>
	}
	toRegister(){
		$http.post('/user/register',
		{
			username:this.refs.username.value,
			password:this.refs.password.value
		}).then(res =>{
			console.log(res)
			if (res.success==1){
				//注册成功的时候显示
				this.refs.show.className=''
			} else {
				this.refs.show.className='hide'
			}
		})
	}
	fromLogin(){
		this.props.history.push('/login')
	}
}

export default Register