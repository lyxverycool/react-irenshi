import React, { Component, PropTypes } from "react";

export default class Refresh extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let show = this.props.isRefresh;
    return (
      <div className="loadMore" style={{ display: !show ? 'none' : 'block' }}>
        <div className="loadMoreBegin text-center">
          <span>正在刷新</span>
          <div className="refreshLoading"></div>
        </div>
      </div>
    )
  }
}