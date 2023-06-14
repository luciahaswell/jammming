import React, {useCallback} from 'react';
import TrackList from '../Tracklist/Tracklist';
import './Playlist.css'


function Playlist({playlistList,onNameUpdate,onRemove,onSave,setPlaylistName,playlistNameUpdate}){
    const handleNameUpdate = useCallback(
        (e) =>{
            setPlaylistName(e.target.value);
            onNameUpdate(e.target.value);
        },
        [onNameUpdate]
    )
    return (
        <div>
            <form>
                <input 
                    type="text" 
                    id="playlistName" 
                    placeholder='PLAYLIST NAME' 
                    onChange={handleNameUpdate}
                    autocomplete='off'
                ></input>
            </form>
                <TrackList 
                    tracks={playlistList}
                    isRemoval={true}
                    onRemove={onRemove}
                    onNameUpdate={playlistNameUpdate}
                />
            <button className="saveToSpotify" onClick={onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;