import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import password from '../../config/input';
require ('../../style/password.scss')

export default class SetPassword extends Component{
  constructor(props){
    super(props)
    this.state={
      psd1:'',
      psd2:'',
      psd3:'',
      psd4:''
    }
    this.changeValue=(type,event)=>{
      switch(type){
        case 'psd1':this.setState({
          psd1:event.target.value
        });
        break;
        case 'psd2':this.setState({
          psd2:event.target.value
        });
        break;
        case 'psd3':this.setState({
          psd3:event.target.value
        });
        break;
        case 'psd4':this.setState({
          psd4:event.target.value,
        });
        let psd=this.state.psd1+''+this.state.psd2+''+this.state.psd3+''+event.target.value;
        setTimeout(function() {
          localStorage.setItem('searchPsd',psd);
          hashHistory.push('/confirmPassword')
        }, 1000);
        break;
      }   
    }
  }  
  componentDidMount(){
    document.title="设置密码";
    password();
  }
  render(){
    return (
      <div className="password">
        <div className="title">请设置您的查询密码</div>
        <div className="inputCode">
          <div className="input flex flex-justify-around">
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd1} onChange={this.changeValue.bind(this,'psd1')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd2} onChange={this.changeValue.bind(this,'psd2')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd3} onChange={this.changeValue.bind(this,'psd3')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd4} onChange={this.changeValue.bind(this,'psd4')}/>
          </div>
          <div className="wrongInfo">
          </div>
        </div>
      </div>
    );
  }
}