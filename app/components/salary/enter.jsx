import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('./salary.scss')

export default class Enter extends Component{
  constructor(props){
        super(props);
        this.enter=()=>{
          let searchPsd=localStorage.getItem('searchPsd');
          console.log(searchPsd);
          if(searchPsd){
             hashHistory.push('/inputPassword')
          }else{
             hashHistory.push('/setPassword')
          }       
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