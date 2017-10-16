import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory,IndexRoute} from 'react-router';
import Salary from '../components/salary/salary';
import Login from '../components/login/login';
import ProductIntroduce from '../components/productIntroduce/productIntroduce';
import hotcss from '../config/app';

require ('../style/normal.css');


class Main extends Component {
    render() {
        return (
            <div className='irenshi-contianer'>{this.props.children}</div>
        );
    }
};

const route =(
	<Router history={hashHistory}>
       <Route path="/" component={Main}>
       	   <IndexRoute component={Salary}/>
	        <Route path="/salary" component={Salary}/>
            <Route path="/login" component={Login}/>
	        <Route path="/productIntroduce" component={ProductIntroduce}/>
  	   </Route>
  	</Router>
)

export default route;



