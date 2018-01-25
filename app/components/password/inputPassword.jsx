import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import password from '../../config/input';
import fetchRequest from '../../config/fetch';
require('../../style/password.scss')

export default class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      psd1: '',
      psd2: '',
      psd3: '',
      psd4: ''
    }
    //输入查询密码
    this.changeValue = (type, event) => {
      switch (type) {
        case 'psd1': this.setState({
          psd1: event.target.value
        });
          break;
        case 'psd2': this.setState({
          psd2: event.target.value
        });
          break;
        case 'psd3': this.setState({
          psd3: event.target.value
        });
          break;
        case 'psd4': this.setState({
          psd4: event.target.value,
        });

          let psd = this.state.psd1 + '' + this.state.psd2 + '' + this.state.psd3 + '' + event.target.value;
          this.timer = setTimeout(() => {
            if (psd.length > 3) {
              let params = { salaryPassword: parseInt(psd) }
              fetchRequest('/salaryWeixin/checkPassword.do', 'POST', params)
                .then(res => {
                  //请求成功
                  if (res.responseCode == 0) {
                    hashHistory.push({
                      pathname: '/detail',
                      query: {
                        entry: 'one.click.payroll'
                      }
                    })
                  } else {
                    this.setState({
                      wrongInfo: res.error.message
                    })
                  }
                }).catch(err => {
                  //请求失败
                })
            }
            if (psd.length < 4) {
              this.setState({
                wrongInfo: ''
              })
            }
          }, 1000);
          break;
      }
    }
    //忘记密码
    this.forgetPsd = () => {
      let params = { codeType: 'APP_RESET_SALARY_PASSWORD' };
      fetchRequest('/account/sendDynamicCode.do', 'POST', params)
        .then(res => {
          //请求成功
          if (res.response == "OK") {
            hashHistory.push({
              pathname: '/sendCode/',
              query: {
                entry: 'searchPassword'
              },
            })
          }
        }).catch(err => {
          //请求失败
        })
    }
    //通过手机验证查询
    this.mobileSearch = () => {
      let params = { codeType: 'APP_QUERY_SALARY' }
      fetchRequest('/account/sendDynamicCode.do', 'POST', params)
        .then(res => {
          //请求成功
          if (res.response == "OK") {
            hashHistory.push({
              pathname: '/sendCode/',
              query: {
                entry: 'mobileSearch'
              },
            })
          }
        }).catch(err => {
          //请求失败
        })
    }
  }
  componentDidMount() {
    password();
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render() {
    return (
      <div className="password">
        <div className="title">请输入您的查询密码</div>
        <div className="inputCode">
          <div className="input flex flex-justify-around">
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd1} onChange={this.changeValue.bind(this, 'psd1')} />
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd2} onChange={this.changeValue.bind(this, 'psd2')} />
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd3} onChange={this.changeValue.bind(this, 'psd3')} />
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd4} onChange={this.changeValue.bind(this, 'psd4')} />
          </div>
          <div className="forgetPassWord" onClick={this.forgetPsd}>
            忘记密码?
          </div>
          <div className="wrongInfo flex flex-pack-center">
            <span>{this.state.wrongInfo}</span>
          </div>
        </div>
        <div className="mobile-search flex flex-pack-center" onClick={this.mobileSearch}>
          通过手机验证查询
        </div>
      </div>
    );
  }
}