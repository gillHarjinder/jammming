//Imported the Reack and App.ccs file

import React from 'react';
import './App.css';

//Imported SerachBar, Playlist and SearchResult files
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';


const track = {
  "id": "1234",
  "name": "Tiny Dancer",
  "artist": "Elton John",
  "album": "Madman Across The Water"
};



class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      searchResults: [
        track,
        
      ],
      playlistName: 'MyList',
      playlistTracks: [
        track
      ]
    }

    // binding the values
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }

  /**
  This method is add the song to the 
  new playlist from search Results
  */
  addTrack(track){
    let playlistTracks = this.state.playlistTracks;
    if(playlistTracks.track.id !== track.id){
      playlistTracks = playlistTracks.concat(track)
    }
    this.setState({playlistTracks});
  }

  /**
  This method is remove the song from the 
  new playlist 
  variable trackIndex get the Index of 'track' from newPlaylist
  then -> use splice method to remove that track from new list
  */
  removeTrack(track){
    let playlistTracks = this.state.playlistTracks;
    let trackIndex = playlistTracks.findIndex(valueOfIndex => valueOfIndex.id === track.id);
    playlistTracks.splice(trackIndex, 1);
    this.setState({playlistTracks})
  }


// add <Playlist/> under <SearchResult/>
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults onRemove={this.removeTrack} onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
