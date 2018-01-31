import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
	constructor(props){
		super(props)

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePlaylistSave = this.handlePlaylistSave.bind(this);
	}

	/*
  		This method accepting an 'event' that is triggered
  		by an onChange attribute in playlist component
  	*/
    handleNameChange(event){
    	this.props.onNameChange(event.target.value);
    }

    handlePlaylistSave(e){
    	this.props.savePlaylist(this.props.playlistTracks, this.props.playlistName);
    }

	render () {
		return(
			<div className="Playlist">
  				<input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
  				<TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
  				<a className="Playlist-save" onClick={this.props.handlePlaylistSave} >SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;