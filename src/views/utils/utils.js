export function getCookie(name){
	let cookieStr=document.cookie;//获取所有的cookie
	if (cookieStr==0) return;
	let arr;
	let res=null
	if (cookieStr.indexOf(';')>-1) {
		//至少有2个值以上
		arr=cookieStr.split(';')
		arr.forEach((cookie,ind) =>{
			let tmp_arr=cookie.split('=')
			if(tmp_arr[0]==name){
				res=tmp_arr[1]
			}
		})
	} else {
		let tmp_arr=cookieStr.split('=')
		if(tmp_arr[0]==name){
			res=tmp_arr[1]
		}
	}
	return res
}

export function loginout(){
	let t= new Date()
	t.setTime(t.getTime()-1)
	document.cookie='token='+getCookie('token')+'; expires='+t.toUTCString()//t.toUTCString()全球时间
}