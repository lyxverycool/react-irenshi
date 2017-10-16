import React,{Component,PropTypes} from "react";
import Header from '../common/header_1';
import Footer from '../common/footer';
require ('./productIntroduce.scss')

export default class ProductIntroduce extends Component{
  constructor(props){
    super(props)
  }  
  componentWillMount(){
    document.title="产品介绍";
  }
  render(){
    return (
      <div className="productIntroduce">
        产品介绍
      </div>
    );
  }

}