import $http from '../utils/http'
import {getCookie} from '../utils/utils'
import {UPDATE_GOODS_LIST,SELECTED_ALL,DELETE_CART} from '../../store/reducers'

export default function mapDispatchToProps(dispatch){
	return {
		fetchGoodlist(history){
			$http.post('/user/Cart/goodsList',{
				token:getCookie('token')
			}).then(res =>{
				if (res.error==1) {
					history.push('/login',{
						from:'/index/shopCar'
					})
				} else {
					dispatch({
						type:UPDATE_GOODS_LIST,
						data:res
					})
				}
			})
		},
		toggleSelectAll(str){
			dispatch({
				type:SELECTED_ALL,
				data:str
			})
		},
		delGoodsList(selectedID){
			$http.post('/user/Cart/delGoods',{
				selectedID,
				token:getCookie('token')
			}).then(res =>{
				if (res.success==1) {
					for (let key in res.GoodsList){
						dispatch({
							type:UPDATE_GOODS_LIST,
							data:res.GoodsList[key]
						})
					}
				}
			})
		}
	}
}