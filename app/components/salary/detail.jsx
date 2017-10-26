import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import monthLists from './salaryText';
require ('../../style/salary.scss')

export default class Detail extends Component{
    constructor(props){
			super(props);
			this.state={
					activeMonth:'0',
					active:true
			}
    }
    componentDidMount() {
		document.title='我的薪资';
        var mySwiper = new Swiper ('.swiper-container', {
				slidesPerView: 4,
				nextButton: '.right',
				prevButton: '.left',
				slideToClickedSlide:true,
				onSlideChangeEnd: (swiper)=>{
						this.setState({
								activeMonth:swiper.activeIndex
						}) 
						console.log(this.state.activeMonth)
				},
				onTap: (swiper)=>{
					this.setState({
						activeMonth:swiper.clickedIndex
					}) 
				let lists=monthLists[this.state.activeMonth]
					console.log(this.state.activeMonth);
					}
				})  
    }
    render(){
			let salary=monthLists[this.state.activeMonth];
			return (
				<div className="detail">
					<div className="detail-head flex">
							<div className="left flex flex-align-center flex-pack-center">
									<img src={require('../../img/salary/left.png')} alt=""/>
							</div>
							<div className="months swiper-container">
									<div className="swiper-wrapper">
										{monthLists.map(
											(monthList,i)=>{
												return <div key={i} className={this.state.activeMonth==i?"swiper-slide month-select":"swiper-slide month"}>
													<div className="month-top flex flex-pack-center">{monthList.date}</div>
													<div className="month-center flex flex-pack-center">{monthList.month}</div>
												</div>              
											}
										)}				
									</div>
							</div>
							<div className="right flex flex-align-center flex-pack-center">
									<img src={require('../../img/salary/right.png')} alt=""/>
							</div>
					</div>
					<div className="detail-lists">
							<div className="salaryAll">
									<div className="salary-left">
											<img src={require('../../img/salary/salary2.png')} alt=""/>
									</div>
									<div className="salary-right">
											<div className="money">
												{salary.money}
											</div>
											<div className="month">
												{salary.date}
											</div>
									</div>
							</div>
							<div className="detail-list">
									<span className="list-left">部门</span>
									<span className="list-right">{salary.depart}</span>
							</div>
							<div className="detail-list">
									<span className="list-left">职位</span>
									<span className="list-right">{salary.position}</span>
							</div>
							<div className="detail-list">
									<span className="list-left">开户行</span>
									<span className="list-right">{salary.bank}</span>
							</div>
							<div className="detail-list">
									<span className="list-left">工资卡号</span>
									<span className="list-right">{salary.code}</span>
							</div>
					</div>
					<div className="classify">
							<div className="title flex flex-align-center">
									分类1
							</div>
							<div className="detail-lists">
									<div className="detail-list">
											<span className="list-left">基本工资</span>
											<span className="list-right">{salary.salary1}</span>
									</div>
									<div className="detail-list">
											<span className="list-left">扣社保个人部分</span>
											<span className="list-right">{salary.salary2}</span>
									</div>
									<div className="detail-list">
											<span className="list-left">实发工资</span>
											<span className="list-right">{salary.salary3}</span>
									</div>
									<div className="detail-list">
											<span className="list-left">个税</span>
											<span className="list-right">{salary.salary4}</span>
									</div>
							</div>
					</div>  
				</div>
			);
    }
}