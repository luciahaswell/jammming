import React from 'react';
import './SearchResults.css';
import TrackList from '../Tracklist/Tracklist';



function SearchResults({searchList,onAdd}){
 
    return (
        <>
        <h2>RESULTS</h2>
        <div>
            <TrackList tracks={searchList} onAdd={onAdd}/>
        </div>
        </>
    )
}

export default SearchResults;