import {takeEvery} from 'redux-saga'
import {call,put} from 'redux-saga/effects'
import $http from '../views/utils/http'

//generator函数
//每一个saga就是一个sagagenerator函数

//babel转化es6的时候 如果遇到不能转化的语法就用到babel-polyfill

//在saga里面叫做worker saga
//worker saga
function* fetchData(){
	//使用call去请求数据，call(fn,param) fn(param)
	//这样写是为了后期的测试方便的
	//实现异步转同步
	try{
		let res = yield call($http.post,'/mall/index/getGoodChannel',{channel_id:3})
		//saga中替代dispatch触发action的函数
		yield put({
			type:"TEST_SAGA",
			data:res
		})
	}catch(err){
		yield put({
			type:"TEST_SAGA_ERROR",
			data:err
		})
	}
}

function* fetchPCR(){
	try{
		let PCR = yield $http.get('/user/Mail/pcr');
		yield put({
			type:"GET_PCR_DATA",
			data:PCR
		})
	}catch(err){
		console.log(err)
	}
}

function* watchPCRdata(){
	yield takeEvery(['PCR_DATA'],fetchPCR)
}

//regeneratorRuntime is not defined 这个错需要安装一个插件

//watcher saga
export default function* rootSaga(){
	//监听每一个type为GET_GOODS_LIST的action
	yield [watchPCRdata()]
}