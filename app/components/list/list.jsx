import React, { Component, PropTypes } from "react";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux'
import Loading from '../common/loading';
import Nodata from '../common/nodata';
import { getNoticeList } from '../../redux/action';
import fetchRequestGateway from '../../config/fetchGateway';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nodata: false
    }
  }
  componentDidMount() {
    getNoticeList();
  }
  render() {
    const { lists, getNoticeList } = this.props
    console.log(this.props.lists)
    return (
      <div className="list">
        <Loading isloading={this.state.loading} />
        <Nodata nodata={this.state.nodata} />
        <button type="button" className="btn btn-default" onClick={() => getNoticeList()}>清除数据</button>
        <div>
          {lists.data.map((e, index) => {
            return (
              <div className="well well-sm" key={index}><a href={e.href} target="_blank">{e.text}</a></div>)
          }
          )}
        </div>
      </div>
    )
  }
}
const getList = state => {
  return {
    lists: state.getListData
  }
}

export default connect(
  getList,
  { getNoticeList }
)(List)