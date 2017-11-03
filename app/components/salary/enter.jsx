import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import fetchRequest from '../../config/fetch';
require ('../../style/salary.scss')

export default class Enter extends Component{
  constructor(props){
        super(props);
        this.enter=()=>{
          fetchRequest('/account/checkLogin.do','GET')
          .then( res=>{
              //请求成功
              if(res){
                hashHistory.push('/inputPassword')
              }
          }).catch( err=>{ 
              //请求失败
              console.log(err.status)
              if(err.status==401){
                hashHistory.push('/login')
              }
          })

          // let params={
          //   companyName:'魔兽争霸',
          //   mobileNo:15882060245,
          //   password:123456,
          //   weixinId:'ojWZrv3RBSyZzN1ah_qL3d1qGQmI'
          // }
          // fetchRequest('account/loginAndBindingCompany.do','POST',params)
          // .then( res=>{
          //   console.log(res.response)
          //   if(res.response === 'OK'){
          //     fetchRequest('/j_spring_security_check','POST')
          //     .then( res=>{
                
          //     }).catch( err=>{ 
          //         //请求失败
          //     })
          //   }
          // }).catch( err=>{ 
          //     //请求失败
          // })     
        }
    }
  componentDidMount() {
    document.title='i人事';
  }
  render(){
    return (
		<div className="container enters">
			<img className="logo fadeInRight" src={require('../../img/salary/logo.png')} alt=""/>
      <div className="enter fadeInBottom flex flex-align-center flex-pack-center">
        <div className="dot">
          <div className="dot2">
          </div>
        </div>
      </div>
      <div onClick={this.enter} className="middle fadeInBottoms flex flex-align-center flex-pack-center">
        <img src={require('../../img/salary/salary.png')} alt=""/>
      </div>
		</div>
    );
  }

}