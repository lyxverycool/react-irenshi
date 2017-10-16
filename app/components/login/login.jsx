import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import Header from '../common/header_1';
import Footer from '../common/footer';
require ('./login.scss')

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
        tel:'', //手机号码
        code:'', //验证码
        errorInfo:'',
        login:'登录',
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
   componentDidMount() {
        
        // console.log(userInfo);       
        // this.setState({
        //     tel:userInfo.tel,
        //     code:userInfo.code
        // })
      

    }
  render(){
    return (
    	<div className="container flex flex-pack-center flex-align-center">
          <div className="wrap">
              <div className="common-dialog text-center" id="success-html">
                  <div className="dialogImg"></div>
                  <div className="text-1">注册成功</div>
                  <div className="text-2">请在PC端输入网址</div>
                  <div className="text-2">www.ihr360.com 登录即可！</div>
                  <button type="button" className="adRight text-center" id="goAd">
                      确定
                  </button>
              </div>
              <div id="login-html">
                  <div className="logo text-center">
                      <div className="logo-img"></div>
                  </div>
                  <div className="title text-center">
                     手机
                  </div>
                  <form name="registerForm" className="form">
                      <div id="validateVerifyCode">
                          <div className="content flex flex-align-center">
                              <div className="list-pic flex flex-align-center">
                                  <div className="icon2 icon">
                                  </div>
                              </div>
                              <input className="tel" maxLength="11" type="tel" name="mobileNo" id="mobileNo" value={this.state.tel} onChange={this.changeValue.bind(this,'tel')} placeholder="登录手机号"/>
                          </div>
                          <div className="content flex flex-align-center">
                              <div className="list-pic flex flex-align-center">
                                  <div className="icon3 icon">
                                  </div>
                              </div>
                              <input className="number" type="text" name="verifyCode" id="verifyCode" placeholder="验证码" value={this.state.code} onChange={this.changeValue.bind(this,'code')} />
                              <button type="button" className="gain text-center" id="sendVerifyCode">
                                  获取验证码
                              </button>
                          </div>
                      </div>
                      <button className="text-center register" id="registeredButton" type="button"  onClick={this.login}>
                          {this.state.login}
                      </button>
                      <div className="error-msg">
                          {this.state.errorInfo}
                      </div>
                      <div className="copyright">
                          <span>Copyright © 2016  上海利唐信息科技有限公司 版权所有</span>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
  }

}