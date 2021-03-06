import React from 'react';
import './Track.css';


class Track extends React.Component {
	
	constructor(props){
		super(props);

		this.addTrack = this.addTrack.bind(this)
    	this.removeTrack = this.removeTrack.bind(this)
	}

	// this method return - anchor if isRemovalOrAdd is true and + anchor 
	// in vice versa
	renderAction(){
		// variable = (condition) ? (if True) : (else False)
		let isRemovalOrAdd = this.props.onAdd ? true : false
		if(isRemovalOrAdd){
			return <a className="Track-action" onClick={this.addTrack}>+</a>
		}else{
			return <a className="Track-action" onClick={this.removeTrack}>-</a>
		}

	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack(){
		this.props.onRemove(this.props.track);
	}

	render() {
		return(
			<div className="Track">
  				<div className="Track-information">
  					<img src={this.props.track.imageUrl} alt="album_cover_picture"/>
  					<h3>{this.props.track.name}</h3>
          			<p>{this.props.track.artist} | {this.props.track.album}</p>
  				</div>
  				{this.renderAction()}
  		 	</div>			
		);
	}
}

export default Track