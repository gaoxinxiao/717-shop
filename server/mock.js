const Mock = require('mockjs')
const fs = require('fs')

let res = Mock.mock({
	"success":1,
	"info":"请求成功",
	"code":1001,
	"list|8":[				
		{
			'id|+1': 1,					
			"category_list|6":[
				{
					tit:()=>Mock.mock('@ctitle(2)'),
					images:()=>Mock.mock('@image("88x120","red","","png","category")'),
				}
			]
		}
	]
})
fs.writeFileSync('category_info.json',JSON.stringify(res))