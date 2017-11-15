import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import fetchRequest from '../../config/fetch';
import getQueryString from '../../config/getQueryString';
require('../../style/unbind.scss')

export default class Unbind extends Component {
  constructor(props) {
    super(props);
    this.unbind = () => {
      const code = getQueryString("code");
      console.log(code)
      if (code) {
        //获取微信id
        fetchRequest('/account/index.do?code=' + code, 'GET')
          .then(res => {
            if (res) {
              fetchRequest('/account/cleanAppUser.do', 'POST')
                .then(res => {
                  if (res) {
                    alert("解绑成功！")
                    hashHistory.push('/login')
                  }
                }).catch(err => {
                  console.log(err)
                })
            }
          }).catch(err => {
            console.log(err)
          })
      } else {
        alert("请先关注i人事服务号！")
      }
    }
  }
  componentWillMount() {
    document.title = "解除绑定";
  }
  render() {
    return (
      <div className="unbind">
        <div className="head flex flex-pack-center"><img src={require('../../img/login/unbind.png')} alt="" /></div>
        <div className="unbinds"><button onClick={this.unbind}>解除绑定</button></div>
      </div>
    );
  }
}