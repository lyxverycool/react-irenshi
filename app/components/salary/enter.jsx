import React, { Component, PropTypes } from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Loading from '../common/loading';
import fetchRequest from '../../config/fetch';
import getQueryString from '../../config/getQueryString';
import 'whatwg-fetch';
require('es6-promise').polyfill();
require('../../style/salary.scss')

export default class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.enter = () => {
      this.setState({
        loading: true
      })
      //检验是否登录
      fetchRequest('/account/checkLogin.do', 'GET')
        .then(res => {
          //请求成功
          if (res) {
            hashHistory.push('/inputPassword')
          } else {
            const code = getQueryString("code");
            fetchRequest('/account/index.do?code=' + code, 'GET')
              .then(res => {
                if (res) {
                  hashHistory.push('/login')
                }
              }).catch(err => {
                console.log(err)
              })
          }
        }).catch(err => {
          //请求失败,验证session
          console.log(err.status)
          if (err.status == 401) {
            //获取code
            const code = getQueryString("code");
            if (code) {
              //获取微信id
              fetchRequest('/account/index.do?code=' + code, 'GET')
                .then(res => {
                  if (res) {
                    fetchRequest('/j_spring_security_check', 'POST')
                      .then(res => {
                        if (res.success) {
                          hashHistory.push('/inputpassword')
                        } else {
                          hashHistory.push('/login')
                        }
                      }).catch(err => {
                        //请求失败
                      })
                  } else {
                    this.setState({
                      loading: false
                    })
                    alert("请在微信公众号中打开！")
                  }
                }).catch(err => {
                  console.log(err)
                })
            } else {
              this.setState({
                loading: false
              })
              alert("请在微信公众号中打开！")
            }
          }
        })
    }
  }
  componentDidMount() {
    document.title = 'i人事';
  }
  render() {
    return (
      <div className="container enters">
        <Loading isloading={this.state.loading} />
        <img className="logo fadeInRight" src={require('../../img/salary/logo.png')} alt="" />
        <div className="enter fadeInBottom flex flex-align-center flex-pack-center">
          <div className="dot">
            <div className="dot2">
            </div>
          </div>
        </div>
        <div onClick={this.enter} className="middle fadeInBottoms flex flex-align-center flex-pack-center">
          <img src={require('../../img/salary/salary.png')} alt="" />
        </div>
      </div>
    );
  }

}