import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import {getCookie} from '../views/utils/utils'
import {Redirect} from 'react-router-dom'

function isLogin() {
	return !!getCookie('token')
}
class RouteWraper extends Component{
	render(){
		const {routes} = this.props
		return routes.map((item,ind) =>{
			return <Route key={ind} path={item.path} render={(location)=>{
				return item.autherization && !isLogin()
					?<Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect>
					:<item.component {...location} routes={item.children}></item.component>
			}}></Route>
		})
	}
}
export default RouteWraper