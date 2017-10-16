import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
require ('./salary.scss')

export default class Salary extends Component{
  constructor(props){
        super(props);
    }
   componentDidMount() {
    }
  render(){
    return (
		<div className="container index">
			<img className="logo fadeInRight" src={require('../../img/salary/logo.png')} alt=""/>
      <div className="enter fadeInBottom flex flex-align-center flex-pack-center">
        <div className="dot">
          <div className="dot2">
          </div>
        </div>
      </div>
      <div className="middle fadeInBottoms flex flex-align-center flex-pack-center">
          <img src={require('../../img/salary/salary.png')} alt=""/>
        </div>
		</div>
    );
  }

}