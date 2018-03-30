import React,{Component} from 'react'
import './consignee.less'
import propTypes from 'prop-types'
import $http from '../utils/http'
import {getCookie} from '../utils/utils.js'
import {connect} from 'react-redux'

class Input extends Component{
	constructor(){
		super()
		this.getVal=this.getVal.bind(this)
		this.valueData=''
	}
	render(){
		return <input type="text" ref={(e)=>{e&&(e.value=this.props.value||'')}} placeholder={this.props.placeholder} onChange={this.getVal}/>
	}
	getVal(e){
		this.props.onChange(e.target.value)
	}
}
Input.propTypes={
	onChange:propTypes.func.isRequired
}
class Select extends Component{
	constructor(){
		super()
		this.getVal=this.getVal.bind(this)
	}
	render(){
		let {data} = this.props
		return <select onChange={this.getVal}>
			<option value="0">请选择</option>
			{
				data&&data.map((item,ind) =>{
					return <option key={ind} value={item.name}>
						{
							item.name?item.name:item
						}
					</option>
				})
			}
		</select>
	}
	getVal(e){   
		this.props.onChange(e.target.value)
	}
}
Select.propTypes={
	onChange:propTypes.func.isRequired
}
class Consignee extends Component{
	constructor(){
		super()
		this.toDeliveryList=this.toDeliveryList.bind(this)
		this.toSave=this.toSave.bind(this)
		this.inputChange=this.inputChange.bind(this)
		this.state={
			cities:[],
			regions:[],
			dataName:null
		}
		this.reRenderCity=this.reRenderCity.bind(this)
		this.reRenderRegion=this.reRenderRegion.bind(this)
	}
	reRenderCity(province){
		let {pcrData} = this.props
		pcrData.forEach(item =>{
			if (item.name==province) {
				console.log(item)
				this.setState({
					cities:item.city
				})
				return;
			}
		})
	}
	reRenderRegion(city){
		let {cities} = this.state
		cities.forEach(file =>{
			if(file.name==city){
				this.setState({
					regions:file.area
				})
			}
			return;
		})
	}
	render(){
		let {pcrData,editAddress} = this.props
		let {cities,regions} = this.state
		return <div className='box consignee_box'>
			<header className='consignee_header'>
				<span className='iconfont icon-xiangzuo' onClick={this.toDeliveryList}></span>
				<span>{editAddress.name?'修改邮寄地址':'添加邮寄地址'}</span>
				<span></span>
			</header>
			<section className='consignee_section'>
				<div className='consignee_content'>
					<Input placeholder='收货人姓名' value={editAddress.name} onChange={(val)=>{
							this.inputChange('name',val)
						}
					}/>
					<Input placeholder='手机号' value={editAddress.phone} onChange={(val)=>{this.inputChange('phone',val)}}/>
					<Select data={pcrData} onChange={(val)=>{
							this.inputChange('province',val);
							this.reRenderCity(val)
						}
					}></Select>
					<Select data={cities} onChange={(val)=>{
							this.inputChange('city',val)
							this.reRenderRegion(val)
						}
					}></Select>
					<Select data={regions} onChange={(val)=>{this.inputChange('region',val)}}></Select>
					<Input placeholder='详细地址' value={editAddress.address} onChange={(val)=>{this.inputChange('address',val)}}/>
				</div>
				<span><i className='iconfont icon-dui'></i><b>设为默认地址</b></span>
				<p onClick={this.toSave}><button>保存</button></p>
			</section>
		</div>
	}
	toDeliveryList(){
		this.props.history.push('/deliveryList')
	}
	inputChange(a,b){
		this[a]=b
	}
	toSave(){
		let reg_exp_name=/^[\u4E00-\u9FA5A-Za-z]+$/;
		let reg_exp_phone=/^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
		if (!reg_exp_name.test(this.name)) {
			alert('请输入用户名')
			return;
		}
		if (!reg_exp_phone.test(this.phone)) {
			alert('请输入手机号')
			return;
		}
		if (!this.province || !this.city || !this.region) {
			alert('请输入省市')		
			return;	
		}
		if (!this.address) {
			alert('请填写街道')		
			return;	
		}
		$http.post('/user/Mail/addNew',{
			name:this.name,
			phone:this.phone,
			province:this.province,
			city:this.city,
			region:this.region,
			address:this.address,
			token:getCookie('token')
		}).then(res =>{
			if (res.success==1){
				alert('添加成功!')
			}
		})
	}
	componentDidMount(){
		this.props.fetchPCR()
	}
}

export default connect((state)=>{
	return {
		pcrData:state.pcr_data,
		editAddress:state.edit_address
	}
},(dispatch)=>{
	return {
		fetchPCR(){
			dispatch({
				type:'PCR_DATA'
			})
		}
	}
})(Consignee)