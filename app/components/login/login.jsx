import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import fetchRequest from '../../config/fetch';
require('../../style/login.scss')

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '', //手机号码
      company: '', //公司
      errorInfo: '',
      login: '登录',
      type: '+86'
    }
    this.select = () => {
      hashHistory.push('/loginSelect')
    }
    this.changeValue = (type, event) => {
      if (type === 'mobile') {
        let telNumber = event.target.value;
        this.setState({
          mobile: telNumber,
          login: '登录',
          errorInfo: ''
        })
      }
      if (type === 'company') {
        let company = event.target.value;
        this.setState({
          company: company,
          login: '登录',
          errorInfo: ''
        })
      }
    }
    this.login = () => {
      if (!this.state.mobile) {
        this.setState({
          errorInfo: '手机号不能为空！',
          login: '登录'
        })
      }
      if (!this.state.company) {
        this.setState({
          errorInfo: '公司不能为空！',
          login: '登录'
        })
      }
      if (this.state.company && this.state.mobile) {
        this.setState({
          login: '登录中...'
        })
        let user = {
          company: this.state.company,
          mobile: this.state.mobile
        }
        user = JSON.stringify(user);
        localStorage.setItem("userInfo", user);
        //请求发送短信验证码
        let params = { codeType: 'WECHAT_LOGIN', mobileNo: this.state.mobile };
        fetchRequest('/account/sendLoginDynamicCode.do', 'POST', params)
          .then(res => {
            //请求成功
            if (res.response == "OK") {
              hashHistory.push({
                pathname: '/sendCode/',
                query: {
                  entry: 'login',
                  companyName: this.state.company,
                  mobileNo: this.state.mobile
                },
              })
            }
          }).catch(err => {
            //请求失败
          })
      }
    }
  }

  componentWillMount() {
    document.title = "登录";
    let type = localStorage.getItem("selectType");
    if (type) {
      if (type == 'china') {
        this.setState({
          type: '+86'
        })
      }
      if (type == 'singapore') {
        this.setState({
          type: '+85'
        })
      }
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.setState({
        company: userInfo.company,
        mobile: userInfo.mobile
      })
    }
  }
  render() {
    return (
      <div className="login container">
        <div className="logo flex flex-pack-center">
          <img src={require('../../img/login/logo.png')} alt="" />
        </div>
        <form action="" className="form">
          <div className="information flex flex-align-center">
            <img src={require('../../img/login/company.png')} alt="" />
            <input type="text" placeholder="公司名称" className="company" value={this.state.company} onChange={this.changeValue.bind(this, 'company')} />
          </div>
          <div className="mobile flex flex-align-center">
            <img src={require('../../img/login/mobile.png')} alt="" />
            <span className="local" onClick={this.select}>{this.state.type}</span>
            <span className="jian">&gt;</span>
            <input type="tel" maxLength="11" placeholder="手机号" className="mobileNumber" value={this.state.mobile} onChange={this.changeValue.bind(this, 'mobile')} />
          </div>
          {/* <div className="information flex flex-align-center">
            <img src={require('../../img/login/code.png')} alt="" />
            <input type="password" placeholder="密码" className="passwords" value={this.state.password} onChange={this.changeValue.bind(this, 'password')} />
          </div> */}
          <div className="loginIn" onClick={this.login}>
            {this.state.login}
          </div>
          {/* <Link to={'/loginForget'} className="forgetPassword">忘记密码</Link> */}
          <div className="wrongInfo flex flex-pack-center">
            {this.state.errorInfo}
          </div>
        </form>
      </div>
    );
  }
}