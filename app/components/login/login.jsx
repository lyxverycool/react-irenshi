import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('./login.scss')

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
        tel:'', //手机号码
        code:'', //验证码
        errorInfo:'',
        login:'登录',
        type:'+86'
    }
    this.enter=()=>{
        hashHistory.push('/enter')
    }
    this.select=()=>{
        hashHistory.push('/loginSelect')
    }
    this.changeValue=(type,event)=>{
      if(type==='tel'){
          let telNumber=event.target.value;
          this.setState({
            tel:telNumber,
            errorInfo:''
          })
      }
      if(type==='code'){
        let telCode=event.target.value;
        this.setState({
          code:telCode,
          errorInfo:''
        })
      }
    }
    this.login =()=>{ 
      if(!this.state.tel){
        this.setState({
            errorInfo:'手机号不能为空！',
            login:'登录'
        }) 
      }
      if(!this.state.code){
        this.setState({
            errorInfo:'验证码不能为空！',
            login:'登录'
        }) 
      }
      if(this.state.code&&this.state.tel){
        this.setState({
            login:'登录中……'
        }) 
        let userInfo=JSON.parse(localStorage.getItem("userInfo"));
        if(!userInfo){
            let user={
            'tel':this.state.tel,
            'code':this.state.code
            }
            user=JSON.stringify(user);
            console.log(user)
            localStorage.setItem("userInfo",user);
        }
        if(userInfo.tel != this.state.tel){
            this.setState({
                errorInfo:'手机号错误！',
                login:'登录'
            }) 
        }
        else if(userInfo.code!==this.state.code){
            this.setState({
                errorInfo:'验证码错误',
                login:'登录'
            }) 
        }else{
            this.setState({
                login:'登录成功！'
            }) 
            setTimeout(function() {
                hashHistory.push('/productIntroduce')
            }, 500);
        }
        console.log(userInfo.tel)
        console.log(this.state.tel)
      }
    }
  }
   componentWillMount() {
    document.title="登录";
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
        // console.log(userInfo);       
        // this.setState({
        //     tel:userInfo.tel,
        //     code:userInfo.code
        // })
      

    }
  render(){
    return (
        <div className="login container">
          <div className="logo flex flex-pack-center">
            <img src={require('../../img/login/logo.png')} alt=""/>
          </div>
          <form action="" className="form">
            <div className="information flex flex-align-center">
                <img src={require('../../img/login/company.png')} alt=""/>
                <input type="text" placeholder="公司名称" className="company"/>
            </div>
            <div className="mobile flex flex-align-center">
                <img src={require('../../img/login/mobile.png')} alt=""/>
                <span className="local" onClick={this.select}>{this.state.type}</span>
                <span className="jian">&gt;</span>
                <input type="tel" maxLength="11" placeholder="手机号" className="mobileNumber"/>
            </div>
            <div className="information flex flex-align-center">
                <img src={require('../../img/login/code.png')} alt=""/>
                <input type="text" placeholder="密码" className="passwords"/>
            </div>
            <div className="loginIn" onClick={this.enter}>
                登录
            </div>
            <Link to={'/loginForget'} className="forgetPassword">忘记密码</Link>
          </form>
        </div>
    );
  }

}