import React,{Component,PropTypes} from "react";
import {Link,Router, Route, hashHistory,IndexRoute} from 'react-router';
import password from '../../config/input';
import fetchRequest from '../../config/fetch';
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
      mobileHide:'',
      style1:'none',
      style2:'block',
      count:5
      //wrongInfo:'验证码错误，请确认后再试！'
    }
    this.changeValue=(type,event)=>{
      this.setState({
        wrongInfo:''
      })
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
        console.log(Id)
        this.timer1=setTimeout(()=> {
          if(psd){
            //如果入口为忘记薪资查询密码
            if(Id == 'searchPassword'){
              if(psd.length>3){
                let params={dynamicCode:parseInt(psd)}
                fetchRequest('/salaryWeixin/validateVerifyCode.do','POST',params)
                .then( res=>{
                    //请求成功
                    console.log(res)
                    if(res.response=="ERROR"){
                      this.setState({
                        wrongInfo:res.error.message
                      })
                    }
                    if(res.response=="OK"){
                      hashHistory.push('/setPassword');
                    }
                }).catch( err=>{ 
                    //请求失败
                })
              }  
            }
            //如果入口是通过验证码查询薪资
            if(Id == 'mobileSearch'){
              if(psd.length>3){
                let params={dynamicCode:parseInt(psd)}
                fetchRequest('/salaryWeixin/validateQuerySalaryCode.do','POST',params)
                .then( res=>{
                    //请求成功
                    console.log(res)
                    if(res.response=="ERROR"){
                      this.setState({
                        wrongInfo:res.error.message
                      })
                    }
                    if(res.response=="OK"){
                      hashHistory.push('/detail')
                    }
                }).catch( err=>{ 
                    //请求失败
                })
              } 
            }
            //如果入口是忘记登录密码
            if(Id == 'loginPassword'){
              if(psd.length>3){
                let params={
                  dynamicCode:parseInt(psd),
                  mobileNo:this.state.mobile
                }
                fetchRequest('/account/validateAppResetPasswordVerifyCode.do','POST',params)
                .then( res=>{
                    //请求成功
                    console.log(res)
                    if(res.response=="ERROR"){
                      this.setState({
                        wrongInfo:res.error.message
                      })
                    }
                    if(res.response=="OK"){
                      hashHistory.push('/loginSet')
                    }
                }).catch( err=>{ 
                    //请求失败
                })
              } 
            }
          }
          //删除清除错误信息
          if(psd.length<4){
            this.setState({
              wrongInfo:''
            })
          }
        }, 1000);
        break;
      }   
    }
  }  
  componentDidMount(){
    password();
    //获取手机号
    let mobile=JSON.parse(localStorage.getItem("userInfo")).mobile;
    let mobileHide=mobile.substring(0,3)+"****"+mobile.substring(7,11); 
    this.setState({
      mobile:mobile,
      mobileHide:mobileHide
    });
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
          count = 5;
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
      let Id=this.props.location.query.entry;
      //重新发送通过短信查薪资
      if(Id==="mobileSearch"){
        let params={codeType:'APP_QUERY_SALARY'}
        fetchRequest('/account/sendDynamicCode.do','POST',params)
        .then( res=>{
          //请求成功
          if(res.response=="OK"){
            this.setState({
              wrongInfo:'短信发送成功！'
            })
          }
        }).catch( err=>{ 
            //请求失败
        })
      }
      //重新发送重置查询密码
      if(Id==="searchPassword"){
        let params={codeType:'APP_RESET_SALARY_PASSWORD'};
        fetchRequest('/account/sendDynamicCode.do','POST',params)
        .then( res=>{
          //请求成功
          if(res.response=="OK"){
            this.setState({
              wrongInfo:'短信发送成功！'
            })
          }
        }).catch( err=>{ 
            //请求失败
        })
      }
       //重新发送重置查询密码
      if(Id==="loginPassword"){
        let params={mobileNo:this.state.mobile}
        fetchRequest('/account/sendAppResetPasswordDynamicCode.do','POST',params)
        .then( res=>{
          //请求成功
          if(res.response=="OK"){
            this.setState({
              wrongInfo:'短信发送成功！'
            })
          }
        }).catch( err=>{ 
            //请求失败
        })
      }
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
        <div className="title">已发送短信验证码至 {this.state.mobileHide}</div>
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
          {this.state.count}秒后重新发送
        </div>
      </div>
    );
  }
}