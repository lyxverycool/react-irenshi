import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import StorageFn from '../../config/storage';
import fetchRequestGateway from '../../config/fetchGateway';
require('../../style/login.scss')

export default class LoginNoPassword extends Component {
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
        // localStorage.setItem("userInfo", user);
        new StorageFn().setCookie("userInfo2", user, 60);
        //请求登录接口
        let params = {
          companyName: this.state.company,
          mobileNo: this.state.mobile,
        }
        fetchRequestGateway('/redis', 'POST', params)
          .then(res => {
            console.log(res)
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
    let userInfo = JSON.parse(new StorageFn().getCookie("userInfo"));
    if (userInfo) {
      this.setState({
        company: userInfo.company,
        mobile: userInfo.mobile
      })
    }
  }
  render() {
    return (
      <div className="login2 login container">
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
          <div className="loginIn2" onClick={this.login}>
            {this.state.login}
          </div>
          <div className="wrongInfo flex flex-pack-center">
            {this.state.errorInfo}
          </div>
        </form>
      </div>
    );
  }
}