import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import App from './src/app.jsx'
import {Provider} from 'react-redux'
import store from './src/store/store.js'

class Main extends Component{
	render(){
		return <Provider store={store}><App/></Provider>
	}
}

ReactDOM.render(<Main/>,document.getElementById('root'))
