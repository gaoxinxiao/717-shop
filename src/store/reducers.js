import {combineReducers} from 'redux'

//添加购物车
export const ADD_CART = 'ADD_CART'
//删除商品
export const DELETE_CART = 'DELETE_CART'
//改变商品数量
export const UPDATE_GOODS_COUNT = 'UPDATE_GOODS_COUNT'
//改变选中与否
export const UPDATE_GOODS_SELECTED = 'UPDATE_GOODS_SELECTED'
//更新整个商品列表
export const UPDATE_GOODS_LIST = 'UPDATE_GOODS_LIST'
//全部选中
export const SELECTED_ALL = 'SELECTED_ALL'
//存储用户信息
export const USER_INFO = 'USER_INFO'
//更新地址信息
export const UPDATE_DELIVERY = 'UPDATE_DELIVERY'
//删除地址信息
export const DEL_DELIVERY = 'DEL_DELIVERY'
//修改地址信息
export const EDIT_ADDRESS = 'EDIT_ADDRESS'

let initState={
	cart_list:[],
	user_info:null,
	goods_list:[],
	update_delivery:[],
	pcr_data:[],
	edit_address:{}
}
function pcr_data(state=initState.pcr_data,action){
	if (action.type=='GET_PCR_DATA') {
		return action.data
	}
	return state
}
function goods_list(state=initState.goods_list,action){
	if (action.type=='TEST_SAGA') {
		return action.data
	}
	return state
}
function cart_list(state=initState.cart_list,action){
	switch(action.type){
		case ADD_CART: 
			let flag =false;//新加的商品购物里面有还没有
			state.forEach((item,ind) =>{
				if (item.id==action.data.id) {
					++item.count
					flag=true
				}
			})
			return flag?[...state]:[...state,action.data]
		break;
		case UPDATE_GOODS_COUNT:
			 let arr =[...state]
			 arr.forEach(item =>{
				if (item.id==action.id) {
					item.count=action.data
					if (item.count<=1)
					{
						item.count=1
					}
				}
			})
			return arr
		break;
		case UPDATE_GOODS_SELECTED:
			 let arr2 =[...state]
			 arr2.forEach(item =>{
				if (item.id==action.id) {
					item.selected=action.data
				}
			})
			return arr2
		break;
		case UPDATE_GOODS_LIST:
			return action.data
		break;
		case SELECTED_ALL:
			 let arr3 =[...state]
			 let str = action.data
			 arr3.forEach(item =>{
				item.selected= str=='all'?1:0
			})
			return arr3
		break;
		case DELETE_CART:
			return action.data
		break;
		default:
			return state
		break;
	}
}

function user_info(state=initState.user_info,action){
	switch(action.type){
		case USER_INFO:
			return action.data
		break;
		default:
			 return state;
		break;
	}
}
function edit_address(state=initState.edit_address,action){
	if (action.type==EDIT_ADDRESS){
		return action.data
	}
	return state
}
function update_delivery(state=initState.update_delivery,action){
	if (action.type==UPDATE_DELIVERY) {
		return action.data
	}
	if (action.type==DEL_DELIVERY) {
		return action.data
	}
	return state
}

export default combineReducers({
	cart_list,
	user_info,
	goods_list,
	update_delivery,
	pcr_data,
	edit_address
})