import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import Loading from '../common/loading';
import Nodata from '../common/nodata';
import { getNoticeDetail } from '../../redux/action';

class ListDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let id=this.props.location.query.id;
    this.props.getNoticeDetail(id)
  }
   componentWillUnmount() {
     //销毁组件时设置content为空
    this.props.listDetail.content={};
  }
  render() {
    const { listDetail, getNoticeDetail } = this.props;
    return (
      <div className="list">
       <Loading isloading={listDetail.loading} />
       <Nodata nodata={listDetail.nodata} />
        {listDetail.content.content}
      </div>
    )
  }
}
const getList = state => {
  return {
    listDetail: state.getListData
  }
}

export default connect(
  getList,
  { getNoticeDetail }
)(ListDetail)