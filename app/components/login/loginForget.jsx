import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
import fetchRequest from '../../config/fetch';
require ('../../style/login.scss')

export default class LoginForget extends Component{
  constructor(props){
		super(props);
		this.state={
			company:'',
			type:'+86',
      tel:'',
      errorInfo:""
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
    //发送忘记登录密码短信
    this.forgetPsd=()=>{ 
      console.log(this.state.company)
      if(!this.state.company){
        this.setState({
          errorInfo:'公司名不能为空！'
        })
      }
      if(!this.state.tel){
        this.setState({
          errorInfo:'手机号不能为空！'
        })
      }
      if(this.state.company&&this.state.tel){
        let user={
          company:this.state.company,
          mobile:this.state.tel
        }
        user=JSON.stringify(user); 
        localStorage.setItem("userInfo",user);
        let params={mobileNo:this.state.tel}
        fetchRequest('/account/sendAppResetPasswordDynamicCode.do','POST',params)
        .then( res=>{
          //请求成功
          if(res.response=="OK"){
            hashHistory.push({  
              pathname: '/sendCode/',  
              query: {  
                entry:'loginPassword' 
              },  
            })
          }
        }).catch( err=>{ 
            //请求失败
        })
      }
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
    let userInfo=JSON.parse(localStorage.getItem("userInfo"));
		if(userInfo){
			this.setState({
				company:userInfo.company,
				tel:userInfo.mobile
			})
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
            <div onClick={this.forgetPsd} className="loginInNext">下一步</div>
            <Link to={'/login'} className="forgetPassword">返回登录</Link>
          </div>
          <div className="wrongInfo flex flex-pack-center">
							{this.state.errorInfo}
          	</div>
				</div>
    );
  }
}