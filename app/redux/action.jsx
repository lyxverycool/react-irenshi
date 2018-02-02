import fetchRequestGateway from '../config/fetchGateway';
import { GET_NOTICELIST_LOADING, GET_DETAIL_LOADING_SUCCESS,GET_NOTICELIST_LOADING_SUCCESS, GET_NOTICELIST_LOADING_FAILD } from './actionText'

export function getListLoading(loading) {
  return {
    type: GET_NOTICELIST_LOADING,
    payload: loading
  }
}

export function getListSuccess(data) {
  return {
    type: GET_NOTICELIST_LOADING_SUCCESS,
    payload: data
  }
}

export function getDetailSuccess(data) {
  return {
    type: GET_DETAIL_LOADING_SUCCESS,
    payload: data
  }
}

export function getListFaild(error) {
  return {
    type: GET_NOTICELIST_LOADING_FAILD,
    payload: error
  }
}

//获取列表
export function getNoticeList() {
  return function (dispatch) {
    dispatch(getListLoading(true));
    fetchRequestGateway('/poetyList', 'Get')
      .then(res => {
        //请求成功
        dispatch(getListLoading(false));
        dispatch(getListSuccess(res));
      }).catch(err => {
        //请求失败
        dispatch(getListLoading(false));
        dispatch(getListFaild(err));
      })
  }
}

//获取详情
export function getNoticeDetail(id) {
  return function (dispatch) {
    dispatch(getListLoading(true));
    fetchRequestGateway('/poetyContent?id='+id, 'Get')
      .then(res => {
        //请求成功
        dispatch(getListLoading(false));
        dispatch(getDetailSuccess(res));
      }).catch(err => {
        //请求失败
        dispatch(getListLoading(false));
        dispatch(getListFaild(err));
      })
  }
}




