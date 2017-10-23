import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('./login.scss')

export default class LoginForget extends Component{
  constructor(props){
		super(props);
		this.state={
			company:'上海利唐科技有限公司',
			type:'+86',
			tel:'',
		}
		this.changeValue=(type,event)=>{
      if(type==='company'){
          let company=event.target.value;
          this.setState({
            company:company,
            errorInfo:''
          })
      }
      if(type==='tel'){
        let telCode=event.target.value;
        this.setState({
          tel:telCode,
          errorInfo:''
        })
      }
    }
    this.enter=()=>{
      hashHistory.push('/sendCode')
    }
    
  }
   componentWillMount() {
    document.title="忘记密码";
    let type=localStorage.getItem("selectType");
    if(type){
        if(type=='china'){
            this.setState({
                type:'+86'
            }) 
        }
        if(type=='singapore'){
            this.setState({
                type:'+85'
            }) 
        }
    }
  }
  render(){
    return (
        <div className="loginForget">
          <div className="company"><input type="text" placeholder='请输入公司名' value={this.state.company} onChange={this.changeValue.bind(this,'company')}/></div> 
					<div className="mobile flex">
              <div className="mobile-left flex flex-align-center">
                <img src={require('../../img/login/mobile2.png')} alt=""/>
                <Link className="local" to={ 
                    { 
                        pathname:"/loginSelect", 
                        query:{entry:'loginForget'} 
                    } 
                }>{this.state.type}
                </Link>
                <span className="jian">&gt;</span>
              </div>
              <div className="mobile-right flex flex-align-center">
                <input type="tel" maxLength="11" placeholder="手机号" className="mobileNumber" value={this.state.tel} onChange={this.changeValue.bind(this,'tel')}/>
              </div>
					</div>
          <div className="login-last">
            <div className="loginIn" onClick={this.enter}>
                下一步
            </div>
            <Link to={'/login'} className="forgetPassword">返回登录</Link>
          </div>
				</div>
    );
  }

}