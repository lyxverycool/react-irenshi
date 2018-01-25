import React, { Component, PropTypes } from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Loading from '../common/loading';
import fetchRequest from '../../config/fetch';
import fetchRequestGateway from '../../config/fetchGateway';
import getQueryString from '../../config/getQueryString';
import 'whatwg-fetch';
require('es6-promise').polyfill();
require('../../style/salary.scss')

export default class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      functionList: []
    }
    this.enter = (functionId) => {
      this.setState({
        loading: true
      })
      if (functionId === 'one.click.payroll') {
        //判断是否有查询密码
        fetchRequest('/salaryWeixin/salaryPasswordInfo.do', 'POST').then(res => {
          if (res.isHasSalaryPassword) {
            hashHistory.push('/inputPassword')
          } else {
            hashHistory.push('/setPassword')
          }
        })
      } else {
        hashHistory.push({
          pathname: '/detail',
          query: {
            entry: functionId
          }
        })
      }
    }
  }
  componentDidMount() {
    document.title = '自助查询';
    fetchRequestGateway('/oneclick/api/wechat/function/list', 'GET')
      .then(res => {
        this.setState({
          loading: false,
          functionList: res.data
        })
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="container enters">
        <Loading isloading={this.state.loading} />
        {
          this.state.functionList.length > 0 ? this.state.functionList.map(
            (functions, i) => {
              return (<div key={i} onClick={() => this.enter(functions.functionId)} className="list flex flex-align-center">
                <img src={require('../../img/salary/search.png')} alt="" />
                <span>{functions.functionName}</span>
              </div>)
            }) : null
        }
      </div>
    );
  }

}