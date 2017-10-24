import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
import password from '../../config/input';
require ('./password.scss')

export default class InputPassword extends Component{
  constructor(props){
    super(props);
    this.state={
      psd1:'',
      psd2:'',
      psd3:'',
      psd4:'',
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
        this.timer=setTimeout(()=>{
          if(psd === localStorage.getItem('searchPsd')){
            hashHistory.push('/detail')
          }else{
            this.setState({
              wrongInfo:'查询密码错误，请重新输入！'
            })
          }
          if(psd.length<4){
            this.setState({
              wrongInfo:''
            })
          }
          console.log(psd)
        },1000);
        break;
      }   
    }
  }  
  componentDidMount(){
    password();
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  render(){
    return (
      <div className="password">
        <div className="title">请输入您的查询密码</div>
        <div className="inputCode">
          <div className="input flex flex-justify-around">
            <input type="tel"  placeholder="" maxLength="1" value={this.state.psd1} onChange={this.changeValue.bind(this,'psd1')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd2} onChange={this.changeValue.bind(this,'psd2')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd3} onChange={this.changeValue.bind(this,'psd3')}/>
            <input type="tel" placeholder="" maxLength="1" value={this.state.psd4} onChange={this.changeValue.bind(this,'psd4')}/>
          </div>
          <Link className="forgetPassWord" to={ 
              { 
                pathname:"/sendCode", 
                query:{entry:'searchPassword'} 
              } 
          }>
            忘记密码?
          </Link>
          <div className="wrongInfo flex flex-pack-center">
            <span>{this.state.wrongInfo}</span>
          </div>
        </div>
        <div className="mobile-search flex flex-pack-center"> 
          <Link to={{ 
                pathname:"/sendCode", 
                query:{entry:'mobileSearch'} 
              }} >通过手机验证查询</Link>
        </div>
      </div>
    );
  }

}