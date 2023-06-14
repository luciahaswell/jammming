import React, { useCallback } from 'react';
import './Track.css';

function Track({track,onAdd, onRemove, isRemoval}){
    
    const addTrack = useCallback(
        (event) =>{
            onAdd(track);
        },
        [onAdd, track]
    );

    const removeTrack = useCallback(
        (event) =>{
            onRemove(track);
        },
        [onRemove, track]
    );

    const addOrRemoveTrack = () =>{
        if (isRemoval){
            return (<button className='trackChange' onClick={removeTrack}>
                <h3>-</h3>
            </button>);
        }
        return (<button className='trackChange' onClick={addTrack}>
        <h3>+</h3>
        </button>);
    }
    return (
        <>
        <div className='trackItem'>
            <div class="addedSong" key={track.id} >
                <h3>{track.name}</h3>
                <h4>{track.artist} | {track.album}</h4>
            </div>
            <div class="updateTrack">
                {addOrRemoveTrack()}
            </div>
        </div>
        </>
    )
}

export default Track;