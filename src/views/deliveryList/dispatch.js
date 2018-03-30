import {UPDATE_DELIVERY,DEL_DELIVERY,EDIT_ADDRESS} from '../../store/reducers'

export default function mapDispatchToProps(dispatch){
	return {
		delivery_list(res){
			if (res.success==1)
			{//添加成功
				for (let key in res.deliveryInfo){
					dispatch({
						type:UPDATE_DELIVERY,
						data:res.deliveryInfo[key]
					})
				}
			}
		},
		del_delivery(res){
			for (let key in res){
				dispatch({
					type:DEL_DELIVERY,
					data:res[key]
				})
			}
		},
		edit_address(res){
			dispatch({
				type:EDIT_ADDRESS,
				data:res
			})
		}
	}
}