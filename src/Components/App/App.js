//Imported the Reack and App.ccs file

import React from 'react';
import './App.css';

//Imported SerachBar, Playlist and SearchResult files
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';


const track = {
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
        track,
        track
      ],
      playlistName: 'MyList',
      playlistTracks: [
        track
      ]
    }

  }



// add <Playlist/> under <SearchResult/>
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
