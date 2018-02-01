import fetchRequestGateway from '../config/fetchGateway';
import { GET_NOTICELIST_LOADING, GET_NOTICELIST_LOADING_SUCCESS, GET_NOTICELIST_LOADING_FAILD } from './actionText'

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

export function getListFaild(error) {
  return {
    type: GET_NOTICELIST_LOADING_FAILD,
    payload: error
  }
}

export function getNoticeList() {
  return function (dispatch) {
    dispatch(getListLoading(true));
    fetchRequestGateway('/list', 'Get')
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



