//Imported the Reack and App.ccs file

import React from 'react';
import './App.css';

//Imported SerachBar, Playlist and SearchResult files
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify'



class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'MyList',
      playlistTracks: []
    }

    // binding the values
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }


    /*
      This method update the new created playlist name
      by setting the state of playlist name
    */

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }


    /*
      This method is add the song to the 
      new playlist from search Results
    */
  addTrack(track){
    if(!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)){
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }))
    }
  }

    /*
      This method is remove the song from the 
      new playlist 
      variable trackIndex get the Index of 'track' from newPlaylist
      then -> use splice method to remove that track from new list
    */
  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }



    /*
      This method generate the array 'trackURIs' form 
      playlistTracks

    */
  savePlaylist() {
    const uris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, uris);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName('MyList');
  }


    /*
     This method search song from Spotify Library 
    */
  search(term){
     Spotify.search(term)
    .then(tracks => this.setState( { searchResults: tracks } ));
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
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
