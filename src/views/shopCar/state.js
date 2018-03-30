export default function mapStateToProps(state){
	//遍历cart_list算出总价
	let totalCost=0;//总价
	let selectAll=true;//默认全选
	state.cart_list.forEach((item,ind) =>{
		if (item.selected==1) {
			totalCost+=(item.count*item.price)
		}
		if (item.selected==0){
			selectAll=false
		}
	})
	return {
		cartList:state.cart_list,
		totalCost:totalCost,
		selectAll:selectAll
	}
}