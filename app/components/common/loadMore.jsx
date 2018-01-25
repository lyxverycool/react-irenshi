import React, { Component, PropTypes } from "react";

export default class LoadMore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let showState = this.props.showState;
    let showBegin = false;
    let showLoading = false;
    let showFinsh = false;
    if (showState === 'showBegin') {
      showBegin = true;
    };
    if (showState === 'showLoading') {
      showLoading = true;
    };
    if (showState === 'showFinsh') {
      showFinsh = true;
    };
    return (
      <div className="loadMore">
        <div className="loadMoreBegin text-center" style={{ display: !showBegin ? 'none' : 'block' }}>
          <span>上滑加载更多</span>
          <img src={require('../../img/notice/Slide.png')} alt="" />
        </div>
        <div className="loadMoreBegin text-center" style={{ display: !showLoading ? 'none' : 'block' }}>
          <span>正在加载</span>
          <div className="refreshLoading"></div>
        </div>
        <div className="loadMoreFinish text-center" style={{ display: !showFinsh ? 'none' : 'block' }}>
          <img src={require('../../img/notice/markleft.png')} alt="" />
          <span>已到底部</span>
          <img src={require('../../img/notice/markright.png')} alt="" />
        </div>
      </div>
    )
  }
}