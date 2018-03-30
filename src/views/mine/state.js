export default function mapStateToProps(state){
	console.log(state.user_info)
	return {
		userInfo:state.user_info?state.user_info:JSON.parse(localStorage.getItem('user-info'))
	}
}