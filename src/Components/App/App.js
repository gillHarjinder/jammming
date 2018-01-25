//Imported the Reack and App.ccs file

import React from 'react';
import './App.css';

//Imported SerachBar, Playlist and SearchResult files
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify'


const track = {
  "id": "1234",
  "name": "Tiny Dancer",
  "artist": "Elton John",
  "album": "Madman Across The Water"
};

const track1 = {
  "id": "2342",
  "name": "Tiny Dancer",
  "artist": "Tim McGraw",
  "album": "Love Story"
};



class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      searchResults: [
        track,
        track1
        
      ],
      playlistName: 'MyList',
      playlistTracks: [
        track
      ]
    }

    // binding the values
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }



  /*
     This method search song from Spotify Library 
  */
  search(term){
    Spotify.search(term).then((tracks) => {
      this.setState({
        searchResults: tracks
      })
    })
  }


  /*
      This method generate the array 'trackURIs' form playlistTracks

  */
  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri)
    
  }


  /*
      This method update the new created playlist name
      by seting the state of playlist name
  */

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  /*
      This method is add the song to the 
      new playlist from search Results
  */
  addTrack(track){
    let playlistTracks = this.state.playlistTracks;
    if(!playlistTracks.includes(track)){
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



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} 
                      onNameChange={this.updatePlaylistName} 
                      onRemove={this.removeTrack} 
                      playlistTracks={this.state.playlistTracks} 
                      playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
