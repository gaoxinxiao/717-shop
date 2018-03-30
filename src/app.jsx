import React,{Component} from 'react'
import router from './router/router.config.js'
import {Router,Route,BrowserRouter,Switch,Redirect} from 'react-router-dom'
import RouteWraper from './components/routeWraper.jsx'
import home from './views/home'

class App extends Component{
	render(){
		return <BrowserRouter>
			<Switch>
				<Redirect exact from='/' to='/index/home'></Redirect>
				<RouteWraper routes={router.routes}></RouteWraper>
			</Switch>
		</BrowserRouter>
	}
}
export default App