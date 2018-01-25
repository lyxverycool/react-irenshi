import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Index from '../components/index/index';
import Notice from '../components/notice/notice';
import NoticeList from '../components/notice/noticeList';
import Enter from '../components/salary/enter';
import Detail from '../components/salary/detail';
import Login from '../components/login/login';
import Unbind from '../components/login/unbind';
import SetPassword from '../components/password/setPassword';
import InputPassword from '../components/password/inputPassword';
import ConfirmPassword from '../components/password/confirmPassword';
import SendCode from '../components/password/sendCode';
import hotcss from '../config/app';
import androidInputBugFix from '../config/autoFix';
androidInputBugFix();

require('../style/common.scss');
require('../style/normal.scss');

class Main extends Component {
  render() {
    return (
      <div className='irenshi-contianer'>{this.props.children}</div>
    );
  }
};

const route = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index} />
      <Route path="/index" component={Index} />
      <Route path="/notice" component={Notice} />
      <Route path="/noticeList" component={NoticeList} />
      <Route path="/enter" component={Enter} />
      <Route path="/detail" component={Detail} />
      <Route path="/login" component={Login} />
      <Route path="/unbind" component={Unbind} />
      <Route path="/setPassword" component={SetPassword} />
      <Route path="/sendCode" component={SendCode} />
      <Route path="/inputPassword" component={InputPassword} />
      <Route path="/confirmPassword" component={ConfirmPassword} />
    </Route>
  </Router>
)

export default route;



