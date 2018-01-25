import React, { Component, PropTypes } from "react";

export default class Nodata extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let show = this.props.nodata;
    return (
      <div className="nodata flex flex-pack-center flex-align-center" style={{ display: !show ? 'none' : 'block' }}>
        <img src={require('../../img/common/nodata.png')} alt="" />
        <div className="text">暂无数据！</div>
      </div>
    )
  }
}