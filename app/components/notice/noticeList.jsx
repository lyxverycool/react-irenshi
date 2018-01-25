import React, { Component, PropTypes } from "react";
import { Link, Router, Route, hashHistory, IndexRoute } from 'react-router';
import fetchRequest from '../../config/fetch';
import getQueryString from '../../config/getQueryString';
import { qaServerHost } from '../../config/serverLocal';
import Loading from '../common/loading';
require('../../style/notice.scss')

export default class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailbulletin: {},
      detailpolicy: {},
      showbulletin: false,
      showpolicy: false,
      loading: true
    }
  }
  componentWillMount() {
    document.title = "公告制度";
    const type = this.props.location.query.type;
    const id = this.props.location.query.id;
    fetchRequest('/company/' + type + '/detail?id=' + id, 'GET')
      .then(res => {
        console.log(res);
        if (type === 'policy') {
          this.setState({
            detailpolicy: res,
            showpolicy: true,
            loading: false
          })
        }
        if (type === 'bulletin') {
          this.setState({
            detailbulletin: res,
            showbulletin: true,
            loading: false
          })
        }
      }).catch(err => {
      })
  }
  render() {
    return (
      <div className="noticeList">
        <Loading isloading={this.state.loading} />
        <div style={{ display: !this.state.showbulletin ? 'none' : 'block' }}>
          <div className="noticeTitle text-center">
            {this.state.detailbulletin.title}
          </div>
          <div className="noticeType">
            <span>{this.state.detailbulletin.statusName}</span>
            <span className="noticeTime">{this.state.detailbulletin.startTime}</span>
          </div>
          <div className="noticeContent">
            <img src={qaServerHost + this.state.detailbulletin.bulletinImageUrl} onError={(e) => { e.target.src = require("../../img/notice/default.png") }} alt="" />
            <div className="noticeText" dangerouslySetInnerHTML={{ __html: this.state.detailbulletin.content }}>
            </div>
          </div>
        </div>
        <div style={{ display: !this.state.showpolicy ? 'none' : 'block' }}>
          <div className="noticeTitle text-center">
            {this.state.detailpolicy.title}
          </div>
          <div className="noticeType">
            <span>{this.state.detailpolicy.senderName}</span>
            <span className="noticeTime">{this.state.detailpolicy.createTime}</span>
          </div>
          <div className="noticeContent">
            <img src={require("../../img/notice/default.png")} alt="" />
            <div className="noticeText" dangerouslySetInnerHTML={{ __html: this.state.detailpolicy.content }}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}