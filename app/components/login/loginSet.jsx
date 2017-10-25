import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('../../style/login.scss')

export default class LoginSet extends Component{
  constructor(props){
		super(props);
		this.state={
			psd1:'',
			psd2:'',
			errorInfo:''
		}
		this.changeValue=(type,event)=>{
      if(type==='psd1'){
        let psd1=event.target.value;
        this.setState({
          psd1:psd1,
          errorInfo:''
        })
      }
      if(type==='psd2'){
        let psd2=event.target.value;
        this.setState({
          psd2:psd2,
          errorInfo:''
        })
      }
		}  
		this.enter=()=>{
			if(this.state.psd1&&this.state.psd2){
				if(this.state.psd1 !== this.state.psd2){
					this.setState({
						errorInfo:'两次输入密码不一致,请重新输入！'
					})
				}else{
					hashHistory.push('/login')
				}
			}else{
				this.setState({
          errorInfo:'密码不能为空！'
        })
			}
		}
  }
  componentWillMount() {
    document.title="设置新密码";  
  }
  render(){
    return (
      <div className="loginSelect">
				<div className="detail-lists">
					<div className="detail-list">
						<input type="text" placeholder="请输入新密码" className="passwords"  value={this.state.psd1} onChange={this.changeValue.bind(this,'psd1')}/>
					</div>
					<div className="detail-list">
						<input type="text" placeholder="请再次输入新密码" className="passwords"  value={this.state.psd2} onChange={this.changeValue.bind(this,'psd2')}/>
					</div>
				</div>  
				<div className="login-last">
						<div className="loginInNext" onClick={this.enter}>完成</div>           
            <Link to={'/login'} className="forgetPassword">返回登录</Link>
        </div>
				<div className="wrongInfo flex flex-pack-center">
					{this.state.errorInfo}
				</div>
			</div>	
    );
  }
}