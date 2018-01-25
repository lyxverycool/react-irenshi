import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import Swiper from "swiper";
import fetchRequest from '../../config/fetch';
import formatDate from '../../config/formatDate';
import Nodata from '../common/nodata';
import LoadMore from '../common/loadMore';
import Refresh from '../common/refresh';
import { qaServerHost } from '../../config/serverLocal';
require('../../style/notice.scss')

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: '',
      noData: false,
      refresh: false,
      noticeList: [],
      src: '',
      page: 2,
    }
  }
  componentWillMount() {
    document.title = "公告制度";
  }
  componentDidMount() {
    this.fetchFirst();
  }
  mySwiper(type) {
    var swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical'
    });
    var swiperScrollbar = new Swiper('.swiper-container-scrollbar', {
      scrollbar: '.swiper-container-scrollbar .swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      nested: true,
      onTouchMove: function (swiper) {		//手动滑动中触发
        if (swiperScrollbar.translate > 50) {
          refreshNoticeList2(swiper)
        }
      },
      onTouchEnd: function (swiper) {
        var _viewHeight = document.getElementsByClassName('swiper-wrapper')[1].offsetHeight;
        var _contentHeight = document.getElementsByClassName('swiper-slide')[1].offsetHeight;
        // 上拉加载
        if (swiperScrollbar.translate <= _viewHeight - _contentHeight - 50 && swiperScrollbar.translate < 0) {
          pushNoticeList(swiper)
        }
        if (swiperScrollbar.translate > 50) {
          refreshNoticeList(swiper)
        }
      }
    });
    var pushNoticeList = (swiper) => {
      this.setState({
        loadMore: 'showLoading',
      })
      const params = {
        pageSize: 5, page: this.state.page
      }
      const type = this.props.location.query.type;
      fetchRequest('/company/' + type + '/list', 'POST', params)
        .then(res => {
          if (res.length > 0) {
            res.forEach(function (item) {
              item.time = formatDate(item.time)
            });
            this.setState({
              noticeList: this.state.noticeList.concat(res),
              loadMore: 'showBegin',
              page: this.state.page + 1
            })
            swiperScrollbar.update();
          } else {
            this.setState({
              loadMore: 'showFinsh'
            })
          }
        }).catch(err => {
        })
    }
    var refreshNoticeList2 = (swiper) => {
      this.setState({
        refresh: true
      })
    }
    var refreshNoticeList = (swiper) => {
      const params = {
        pageSize: 5, page: 1
      }
      const type = this.props.location.query.type;
      fetchRequest('/company/' + type + '/list', 'POST', params)
        .then(res => {
          if (res.length > 0) {
            res.forEach(function (item) {
              item.time = formatDate(item.time)
            });
            this.setState({
              noticeList: res,
              loadMore: 'showBegin',
            })
            setTimeout(() => {
              this.setState({
                refresh: false
              })
            }, 1000);
            swiperScrollbar.update();
          } else {
            this.setState({
              noData: true
            })
          }
        }).catch(err => {
        })
    }
  }
  //请求第一页数据
  fetchFirst() {
    const params = {
      pageSize: 5, page: 1
    }
    const type = this.props.location.query.type;
    fetchRequest('/company/' + type + '/list', 'POST', params)
      .then(res => {
        if (res.length > 0) {
          res.forEach(function (item) {
            item.time = formatDate(item.time)
          });
          this.setState({
            noticeList: res,
            loadMore: 'showBegin',
          })
          this.mySwiper(type);
        } else {
          this.setState({
            noData: true
          })
        }
      }).catch(err => {
      })
  }
  //图片加载失败
  render() {
    const type = this.props.location.query.type;
    return (
      <div className="notice">
        <Nodata nodata={this.state.noData} />
        <div className="swiper-container swiper-container-v" style={{ display: this.state.noData ? 'none' : 'block' }}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="swiper-container swiper-container-scrollbar">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <Refresh isRefresh={this.state.refresh} />
                    {
                      this.state.noticeList.length > 0 ? this.state.noticeList.map(
                        (notice, i) => {
                          return (<Link className="notice-list" key={i} to={{ pathname: '/noticeList', query: { id: notice.id, type: type } }}>
                            <div className="title">{notice.title}</div>
                            <div className="time">{notice.time}</div>
                            <div className="bottom">
                              <img src={qaServerHost + notice.url} onError={(e) => { e.target.src = require("../../img/notice/default.png") }} alt="" />
                            </div>
                          </Link>)
                        }) : null
                    }
                    <LoadMore showState={this.state.loadMore} />
                  </div>
                </div>
                <div className="swiper-scrollbar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}