import React,{Component,PropTypes} from "react";

export default class Loading extends Component{
	constructor(props){
		super(props);
	}
	render(){
        let show=this.props.isloading;
		return (
			<div className="loading" style={{display:!show?'none':'block'}}></div>
		)
	}
}