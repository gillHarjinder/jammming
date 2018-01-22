import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';


const track = {
  trackName: 'Tiny Dancer',
  artistName: 'Elton John',
  albumName: 'Madman Across The Water'
};


const tracks = [
  track,
  track
];

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults tracks={tracks}/>
            <Playlist/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
