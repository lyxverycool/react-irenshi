import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('../../style/login.scss')

export default class LoginSelect extends Component{
    constructor(props){
				super(props);
				this.selectChina=()=>{
					localStorage.setItem("selectType","china");
					let Id=this.props.location.query.entry;
					if(Id == 'loginForget'){
						hashHistory.push('/loginForget')
					}else{
						hashHistory.push('/login')
					}
				}
				this.selectSingapore=()=>{
					localStorage.setItem("selectType","singapore");
					let Id=this.props.location.query.entry;
					if(Id == 'loginForget'){
						hashHistory.push('/loginForget')
					}else{
						hashHistory.push('/login')
					}
				}
    }
    componentDidMount() {
      document.title='区号选择';
    }
    render(){
        return (
					<div className="loginSelect">
						<div className="detail-lists">
							<div className="detail-list" onClick={this.selectChina}>
								<span className="list-left">中国</span>
								<span className="list-right">+86</span>
							</div>
							<div className="detail-list" onClick={this.selectSingapore}>
								<span className="list-left">新加坡</span>
								<span className="list-right">+85</span>
							</div>
						</div>  
          </div>
        );
    }
}