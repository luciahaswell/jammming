import './App.css';
import React, { useCallback } from 'react';
import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/spotifyAPI';

const  App = () => {
  const [searchList,setSearchList] = useState([]);
  const [playlistList,setPlaylistList] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");

  const addTrack = useCallback(
    (track) => {
      if(playlistList.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistList((prevTracks)=> [...prevTracks, track]);
    },
    [playlistList]
  );

  const removeTrack = useCallback((track) =>{
    setPlaylistList((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
      );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, [playlistName]);

 const search = useCallback((term) => {
  Spotify.search(term).then((result) =>{
    setSearchList(result);
  });
 }, [searchList]);

 const createPlaylist = useCallback(() => {
  const trackUris = playlistList.map((track)=> track.uri);
  Spotify.createPlaylist(playlistName,trackUris).then(() =>{
    setPlaylistName("New Playlist");
    setPlaylistList([]);
  });
 }, [playlistName,playlistList]);

  return (
    <div className="App">
      <h1>JAMMMING</h1>
      <div className='searchBar'>
        <SearchBar onSearch={search} />
      </div>
      <div className='panels'>
        <div className='searched panel'>
          <SearchResults searchList={searchList} onAdd={addTrack}/>
        </div>
        <div className='playlist panel'>
          <Playlist 
            playlistList={playlistList}
            onNameUpdate={updatePlaylistName}
            onRemove={removeTrack}
            onSave={createPlaylist}
            setPlaylistName={setPlaylistName}
            playlistNameUpdate={updatePlaylistName}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
