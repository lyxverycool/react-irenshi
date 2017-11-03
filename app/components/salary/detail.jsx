import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import fetchRequest from '../../config/fetch';
import Loading from '../common/loading';
require ('../../style/salary.scss')

export default class Detail extends Component{
	constructor(props){
		super(props);
		this.state={
			activeMonth:'0',
			active:true,
			loading:true,
			salaryList:{},
			detailList:{
				salaryList:[]
			}
		}
	}
	componentDidMount() {
		document.title='我的薪资';
		fetchRequest('/salaryWeixin/list.do','POST')
		.then( res=>{
			this.setState({
				salaryList:res.salaryList,
				loading:false
			})
			//请求第一个数据
			let params={
				month:this.state.salaryList[0].date,
				part:this.state.salaryList[0].part,
			}
			fetchRequest('/salaryWeixin/salaryDetail.do','POST',params)
			.then( res=>{
				//请求成功
				if(res.response=="OK"){
					this.setState({
						detailList:res
					})
				}
			}).catch( err=>{ 
					//请求失败
			}) 
			//初始化swiper
			this.mySwiper();
		}).catch( err=>{ 
			console.log(err)
		})
	}
	mySwiper(){
		var swiper=new Swiper ('.swiper-container', {
			slidesPerView: 4,
			nextButton: '.right',
			prevButton: '.left',
			slideToClickedSlide:true,
			onSlideChangeEnd: (swiper)=>{
				querySalary(swiper,'activeIndex')
			},
			onTap: (swiper)=>{
				querySalary(swiper,'clickedIndex')
			}	
		})
		var querySalary=(swiper,type)=>{
			if(type=="activeIndex"){
				this.setState({
						activeMonth:swiper.activeIndex,
						loading:true
				})
			} 
			if(type=="clickedIndex"){
				this.setState({
						activeMonth:swiper.clickedIndex,
						loading:true
				})
			} 			
			let params={
					month:this.state.salaryList[this.state.activeMonth].date,
					part:this.state.salaryList[this.state.activeMonth].part,
			}
			fetchRequest('/salaryWeixin/salaryDetail.do','POST',params)
				.then( res=>{
						//请求成功
						if(res.response=="OK"){
								this.setState({
										detailList:res,
										loading:false
								})
						}
				}).catch( err=>{ 
								//请求失败
				})
			} 
	}
	render(){
		let detailList=this.state.detailList;
		return (
			<div className="detail">
				<Loading isloading={this.state.loading}/>
				<div className="detail-head flex">
					<div className="left flex flex-align-center flex-pack-center">
							<img src={require('../../img/salary/left.png')} alt=""/>
					</div>
					<div className="months swiper-container">
							<div className="swiper-wrapper"> 
								{
									this.state.salaryList.length> 0 ? this.state.salaryList.map(
										(monthList,i)=>{
											return (<div key={i} className={this.state.activeMonth==i?"swiper-slide month-select":"swiper-slide month"}>
												<div className="month-top flex flex-pack-center">{monthList.title}</div>
												<div className="month-center flex flex-pack-center">{monthList.monthString}</div>
											</div>)           
									}):null
								}				
							</div>
					</div>
					<div className="right flex flex-align-center flex-pack-center">
							<img src={require('../../img/salary/right.png')} alt=""/>
					</div>
				</div>
				{
					this.state.detailList.salaryList.length > 0 ? <SalaryDetail list={this.state.detailList} /> : null
				}
			</div>	
		);
	}
}

//每个月详情
class SalaryDetail extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let lists=this.props.list;
		let salaryList=this.props.list.salaryList;
		return (
			<div className="salaryDetail">
				<div className="detail-lists">
					<div className="salaryAll">
							<div className="salary-left">
									<img src={require('../../img/salary/salary2.png')} alt=""/>
							</div>
							<div className="salary-right">
									<div className="money">
										{lists.income.value}
									</div>
									<div className="month">
										{lists.income.deliverTime}
									</div>
							</div>
					</div>
					<div className="detail-list">
							<span className="list-left">部门</span>
							<span className="list-right">{lists.detail.departmentName}</span>
					</div>
					<div className="detail-list">
							<span className="list-left">职位</span>
							<span className="list-right">{lists.detail.positionName}</span>
					</div>
					<div className="detail-list">
							<span className="list-left">开户行</span>
							<span className="list-right">{lists.detail.bankName}</span>
					</div>
					<div className="detail-list">
							<span className="list-left">工资卡号</span>
							<span className="list-right">{lists.detail.bankCardNo}</span>
					</div>
				</div>				
				{salaryList.map(
						(salary,i)=>
							<ListDetail	key={i} salary={salary} />        
					)
				}
			</div>
		)
	}
}

//list 详情
class ListDetail extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let salary=this.props.salary;
		let salaryItemList=this.props.salary.salaryItemList;
		return (
			<div className="classify">
				<div className="title flex flex-align-center">
						{salary.title}
				</div>
				<div className="detail-lists">
				{			
					salaryItemList.map(
						(salary,i)=>{
							return (
								<div className="detail-list" key={i}>
										<span className="list-left">{salary.name}</span>
										<span className="list-right">{salary.value}</span>
								</div>)
						}
					)
				}
				</div>
			</div>
		)
	}
}