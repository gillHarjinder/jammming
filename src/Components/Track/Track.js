import React from 'react';
import './Track.css';


class Track extends React.Component {
	

	// this method return - anchor if isRemoval is true and + anchor 
	// in vice versa
	renderAction(){
		// variable = (condition) ? (if True) : (else False)
		let isRemoval = this.props.OnRemove ? true : false 
		return isRemoval ? <a className="Track-action">-</a> : <a className="Track-action">+</a>

	}

	render() {
		return(
			<div className="Track">
  				<div className="Track-information">
    				<h3>{this.props.track.name}</h3>
          			<p>{this.props.track.artist} | {this.props.track.album}</p>
  				</div>
  		 	</div>			
		);
	}
}

export default Track