import React,{Component} from 'react'
import './search.less'
import result from '../result'
import {connect} from 'react-redux'
class Search extends Component{
	constructor(){
		super()
		this.toSearch=this.toSearch.bind(this)
		this.clearHistory=this.clearHistory.bind(this)
		this.testSaga=this.testSaga.bind(this)
		this.state={
			historylist:[]
		}
	}
	render(){
		let {historylist} = this.state
		return <div className='box'>
			<header className='search_header'>
				<p></p>
				<p><i className='iconfont icon-fangdajing'></i><input type="text" placeholder='请输入你想找的商品' ref='search_value'/></p>
				<p><span onClick={this.toSearch}>搜索</span></p>
			</header>
			<section className='search_section'>
				<div className='Recent_search'>
					<p><span>最近搜索</span><span className='iconfont icon-lajitong' onClick={this.clearHistory}></span></p>
					{
						historylist.length==0?<p>暂无搜索记录</p>:
						<ul>
							{
								this.state.historylist.map((item,ind) =>{
									return <li key={ind} onClick={()=>{this.toResult()}}>{item}</li>
								})
							}
						</ul>
					}
				</div>
				<div className='all_search'>
					<p>大家都在搜</p>
					<ul>
						<li onClick={this.testSaga}>蜂蜜</li>
						<li>三黄鸡</li>
						<li>红酒</li>
						<li>红枣</li>
						<li>蜂蜜</li>
						<li>三黄鸡</li>
						<li>红酒</li>
					</ul>
				</div>
			</section>
		</div>
	}
	testSaga(){
		this.props.dispatch({
			type:'GET_GOODS_LIST'
		})
	}
	toSearch(){
		let {search_value} = this.refs;
		if (!search_value.value) return 
		let key_wrods = search_value.value
		let ls = localStorage;
		if (ls.getItem('SearchHistory')){
			let shArr = JSON.parse(ls.getItem('SearchHistory'))
			if (shArr.indexOf(key_wrods)>-1) return;
			shArr.push(key_wrods)
			ls.setItem('SearchHistory',JSON.stringify(shArr))
		} else {
			ls.setItem('SearchHistory',JSON.stringify([key_wrods]))
		}

		this.props.history.push('/index/result',{
			key_wrods:search_value.value
		})
	}
	clearHistory(){
		localStorage.removeItem('SearchHistory');
		this.setState({
			historylist:[]
		})
	}
	toResult(keyWords){
		console.log(keyWords)
		this.props.history.push('/index/result',{
			key_wrods:keyWords
		})
	}
	componentDidMount(){
		if (localStorage.getItem('SearchHistory')) {
			this.setState({
				historylist:JSON.parse(localStorage.getItem('SearchHistory'))
			})
		}
	}
}
export default connect(null)(Search)