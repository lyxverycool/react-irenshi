import React, { Component, PropTypes } from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Swiper from "swiper";
import Loading from '../common/loading';
import { kv, nav } from './indeText';
import fetchRequest from '../../config/fetch';
import getQueryString from '../../config/getQueryString';
require('../../style/index.scss');
require('../../style/swiper.min.scss');

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    document.title = 'i人事';
    //hack 第一次调用接口访问http而非https(页面载入后先请求一次)
    fetchRequest('/account/checkLogin.do', 'GET')
      .then(res => {
      }).catch(err => {
      })
    this.mySwiper();
  }
  mySwiper() {
    var swiper = new Swiper('.swiper-container', {
      autoplay: 3000,
      loop: true,
      pagination: '.swiper-pagination'
    })
  }
  skip(text) {
    //检验是否登录
    this.setState({
      loading: true
    })
    //根据路由跳不同的页面
    function selectPath(text) {
      if (text === '自助查询') {
        hashHistory.push({
          pathname: '/enter/'
        })
      }
      if (text === '我的公告') {
        hashHistory.push({
          pathname: '/notice/',
          query: {
            type: 'bulletin'
          }
        })
      }
      if (text === '我的制度') {
        hashHistory.push({
          pathname: '/notice/',
          query: {
            type: 'policy'
          }
        })
      }
    }
    fetchRequest('/account/checkLogin.do', 'GET')
      .then(res => {
        //请求成功
        if (res) {
          selectPath(text)
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
                        selectPath(text)
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
  render() {
    return (
      <div className="index">
        <Loading isloading={this.state.loading} />
        <div className="banner swiper-container">
          <div className="swiper-wrapper">
            {
              kv.length > 0 ? kv.map(
                (imgs, i) => {
                  return (<div key={i} className="swiper-slide">
                    <img src={imgs.img} alt="" />
                  </div>)
                }) : null
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <nav>
          {
            nav.length > 0 ? nav.map(
              (navList, i) => {
                return (<div key={i} className="nav-list flex flex-align-center" onClick={this.skip.bind(this, navList.title)}>
                  <img className="icon" src={navList.img} />
                  <div className="list">
                    <div className="title">{navList.title}</div>
                    <div className="text">{navList.text}</div>
                  </div>
                  <img className="right" src={require('../../img/index/right.png')} />
                </div>)
              }) : null
          }
        </nav>
      </div>
    );
  }

}