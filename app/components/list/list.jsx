import React, { Component, PropTypes } from "react";
import { Link } from 'react-router';
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
  componentWillMount() {
    this.props.getNoticeList()
  }
  render() {
    const { lists, getNoticeList } = this.props
    return (
      <div className="list">
        <Loading isloading={lists.loading} />
        <Nodata nodata={lists.nodata} />
        {/* <button type="button" className="btn btn-default" onClick={() => getNoticeList()}>清除数据</button> */}
        <div>
          {lists.data.map((list, index) => {
            return (
              <div key={index}>
                <Link className="well well-sm" to={{ pathname: '/listDetail', query: { id: list._id } }}>{list.title}</Link>
              </div>
            )
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