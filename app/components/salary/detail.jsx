import React, { Component, PropTypes } from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Swiper from "swiper";
import fetchRequestGateway from '../../config/fetchGateway';
import Loading from '../common/loading';
import Nodata from '../common/nodata';
require('../../style/salary.scss');
require('../../style/swiper.min.scss')

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMonth: '0',
      active: true,
      loading: true,
      nodata: false,
      show: false,
      staffInfo: {},
      salaryList: [],
      detailList: {
        batchMessageList: null
      }
    }
  }
  componentDidMount() {
    document.title = '自助查询';
    let functionId = this.props.location.query.entry;
    fetchRequestGateway('/cnb/aggregate/oneclick/function/staff/month/list?functionId=' + functionId, 'GET')
      .then(res => {
        if (res.code == 0) {
          if (res.data.length <= 0) {
            this.setState({
              loading: false,
              show: false,
              nodata: true
            })
          } else {
            this.setState({
              salaryList: res.data,
              show: true
            })//请求基本信息
            fetchRequestGateway('/cnb/aggregate/oneclick/staff/info', 'GET')
              .then(res => {
                //请求成功
                if (res.code == 0) {
                  this.setState({
                    staffInfo: res.data
                  })
                }
              }).catch(err => {
                //请求失败
              })
            //请求第一个数据
            let groupId = this.state.salaryList[0].groupId;
            fetchRequestGateway('/cnb/aggregate/oneclick/function/staff/data?groupId=' + groupId + '&functionId=' + functionId, 'GET')
              .then(res => {
                //请求成功
                if (res.code == 0) {
                  this.setState({
                    detailList: res.data,
                    loading: false
                  })
                }
              }).catch(err => {
                //请求失败
              })
            //初始化swiper
            this.mySwiper(functionId);
          }
        } else {
          alert(res.error.message);
          setTimeout(function () {
            hashHistory.push('/index')
          }, 1000);
        }
      }).catch(err => {
        if (err.status === 401) {
          hashHistory.push('/index')
        }
      })
  }
  mySwiper(functionId) {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      nextButton: '.right',
      prevButton: '.left',
      slideToClickedSlide: true,
      onSlideChangeEnd: (swiper) => {
        querySalary(swiper, 'activeIndex')
      },
      onTap: (swiper) => {
        querySalary(swiper, 'clickedIndex')
      }
    })
    var querySalary = (swiper, type) => {
      if (type == "activeIndex") {
        this.setState({
          activeMonth: swiper.activeIndex,
          loading: true
        })
      }
      if (type == "clickedIndex") {
        this.setState({
          activeMonth: swiper.clickedIndex,
          loading: true
        })
      }
      let groupId = this.state.salaryList[this.state.activeMonth].groupId;
      fetchRequestGateway('/cnb/aggregate/oneclick/function/staff/data?groupId=' + groupId + '&functionId=' + functionId, 'GET')
        .then(res => {
          //请求成功
          if (res.code == 0) {
            this.setState({
              detailList: res.data,
              loading: false
            })
          }
        }).catch(err => {
          //请求失败
        })
    }
  }
  render() {
    let show = this.state.show;
    return (
      <div className="detail">
        <Loading isloading={this.state.loading} />
        <Nodata nodata={this.state.nodata} />
        <div className="detail-head" style={{ display: !show ? 'none' : 'flex' }}>
          <div className="left flex flex-align-center flex-pack-center">
            <img src={require('../../img/salary/left.png')} alt="" />
          </div>
          <div className="months swiper-container">
            <div className="swiper-wrapper">
              {
                this.state.salaryList.length > 0 ? this.state.salaryList.map(
                  (monthList, i) => {
                    return (<div key={i} className={this.state.activeMonth == i ? "swiper-slide month-select" : "swiper-slide month"}>
                      <div className="month-top flex flex-pack-center">{monthList.year}</div>
                      <div className="month-center flex flex-pack-center">{monthList.month}</div>
                    </div>)
                  }) : null
              }
            </div>
          </div>
          <div className="right flex flex-align-center flex-pack-center">
            <img src={require('../../img/salary/right.png')} alt="" />
          </div>
        </div>
        {
          this.state.detailList.batchMessageList ? <SalaryDetail staffInfo={this.state.staffInfo} detailList={this.state.detailList} /> : null
        }
      </div>
    );
  }
}

//每个月详情
class SalaryDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let staffInfo = this.props.staffInfo;
    let detailList = this.props.detailList.batchMessageList;
    return (
      <div className="salaryDetail">
        <div className="detail-lists">
          <div className="salaryAll">
            <div className="salary-left">
              <img src={require('../../img/salary/salary2.png')} alt="" />
            </div>
            <div className="salary-right">
              <div className="money">
                {staffInfo.staffName}
              </div>
              <div className="month">
                {staffInfo.mobileNo}
              </div>
            </div>
          </div>
        </div>
        {detailList.map(
          (detail, i) =>
            <ListDetail key={i} detail={detail} />
        )
        }
      </div>
    )
  }
}

//list 详情
class ListDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let detail = this.props.detail;
    return (
      <div className="classify">
        <div className="title flex flex-align-center">
          {detail.batchName}
        </div>
        <div className="detail-lists">
          {
            detail.rowCellList.map(
              (salary, i) => {
                return (
                  <div className="detail-list" key={i}>
                    <span className="list-left">{salary.name}</span>
                    <span className="list-right">{salary.value}</span>
                  </div>)
              }
            )
          }
        </div>
      </div>
    )
  }
}