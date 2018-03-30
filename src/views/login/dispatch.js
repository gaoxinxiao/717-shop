import {USER_INFO} from '../../store/reducers'
export default function mapDispatchToProps(dispatch){
	return {
		saveInfo(data){
			dispatch({
				type:USER_INFO,
				data
			})
		}
	}
}