import 'whatwg-fetch';
require('es6-promise').polyfill();

let common_url = '/weixin/gateway';  //服务器地址
let token = '';
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
function fetchRequestGateway(url, method, params = '') {
  let header = {
    "Content-Type": "application/json;charset=UTF-8",
    "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
  };
  console.log('request url:', url, params);  //打印请求参数
  if (params == '') {   //如果网络请求中没有参数
    return new Promise(function (resolve, reject) {
      fetch(common_url + url, {
        method: method,
        headers: header,
        credentials: 'include'
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response)
          reject({ status: response.status })
        }
      }).then((responseData) => {
        resolve(responseData);
      })
        .catch((err) => {
          reject(err);
        })
    });
  } else {   //如果网络请求中有参数
    return new Promise(function (resolve, reject) {
      fetch(common_url + url, {
        method: method,
        headers: header,
        credentials: 'include',
        body: JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response)
          reject({ status: response.status })
        }
      }).then((responseData) => {
        resolve(responseData);
      })
        .catch((err) => {
          reject(err);
        })
    });
  }
}

export default fetchRequestGateway;