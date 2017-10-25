import React,{Component,PropTypes} from "react";
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import password from '../../config/input';
require ('../../style/password.scss')

export default class ConfirmPassword extends Component{
  constructor(props){
    super(props)
    this.state={
      psd1:'',
      psd2:'',
      psd3:'',
      psd4:'',
      wrongInfo:''
    }
    this.changeValue=(type,event)=>{
      console.log(event.target.value)
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
        this.timer=setTimeout(()=> {
          if(localStorage.getItem('searchPsd')){
            if(psd===localStorage.getItem('searchPsd')){
              hashHistory.push('/detail')
            }else{
              this.setState({
                wrongInfo:'两次输入的查询密码不一致，请重新设置!'
              });
              setTimeout(function() {
                hashHistory.push('/setPassword')
              }, 1000);
            }
          }
        }, 500);
        break;
      }   
    }
  }  
  componentDidMount(){
    document.title="设置查询密码";
    password();
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render(){
    return (
      <div className="password">
        <div className="title">请再次输入以确认您的查询密码</div>
        <div className="inputCode">
          <div className="input flex flex-justify-around">
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd1} onChange={this.changeValue.bind(this,'psd1')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd2} onChange={this.changeValue.bind(this,'psd2')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd3} onChange={this.changeValue.bind(this,'psd3')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd4} onChange={this.changeValue.bind(this,'psd4')}/>
          </div>
          <div className="wrongInfo">
            {this.state.wrongInfo}
          </div>
        </div>
      </div>
    );
  }
}