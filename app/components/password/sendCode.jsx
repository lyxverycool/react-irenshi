import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
import password from '../../config/input';
require ('../../style/password.scss')

export default class SendCode extends Component{
  constructor(props){
    super(props);
    this.state={
      psd1:'',
      psd2:'',
      psd3:'',
      psd4:'',
      wrongInfo:'',
      mobile:'',
      style1:'none',
      style2:'block',
      count:60
      //wrongInfo:'验证码错误，请确认后再试！'
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
        let Id=this.props.location.query.entry;
        this.timer1=setTimeout(()=> {
          if(psd){
            if(Id == 'searchPassword'){
                hashHistory.push('/setPassword')
            }
            if(Id == 'mobileSearch'){
              hashHistory.push('/detail')
            }
            if(Id == 'loginPassword'){
              hashHistory.push('/loginSet')
            }
          }
        }, 1500);
        break;
      }   
    }
  }  
  componentDidMount(){
    password();
    //获取手机号
    let mobile=this.props.location.query.mobile;
    let mobileHide=mobile.substring(0,3)+"****"+mobile.substring(7,11); 
    this.setState({mobile:mobileHide});
    //定时器
    const sendCode=()=>{
      this.timer2 = setInterval(()=>{
        var count = this.state.count;
        count -= 1;
        if (count < 1) {
          this.setState({
            style1:'block',
            style2:'none',
          });
          count = 60;
  　　　　 clearInterval(this.timer2);
        }
        this.setState({
          count: count
        });
      }, 1000);
    }
    sendCode();
    //重新发送
    this.sendAgain=()=>{
      this.setState({
        style1:'none',
        style2:'block',
      });
      sendCode();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer1)
    clearTimeout(this.timer2)
  }
  render(){
    return (
      <div className="password">
        <div className="title">已发送短信验证码至 {this.state.mobile}</div>
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
        <div className="mobile-search" style={{display:this.state.style1}} onClick={this.sendAgain}>
            重新发送验证码
        </div>
        <div className="count" style={{display:this.state.style2}}>
          接收短信大约需要{this.state.count}秒
        </div>
      </div>
    );
  }

}