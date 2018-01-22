import React from 'react';
import './Track.css';


class Track extends React.Component {

	renderAction(){
		//if(isRemoval){
			
		//}
	}

	render() {
		return(
			<div className="Track">
  				<div className="Track-information">
    				<h3> {this.props.track.trackName} </h3>
    				<p> {this.props.track.artistName} |  {this.props.track.albumName}</p>
  				</div>
  		 	</div>			
		);
	}
}

export default Track;