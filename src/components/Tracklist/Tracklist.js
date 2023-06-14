import React from 'react';
import Track from '../Track/Track';


const TrackList = ({tracks,onAdd,onRemove,isRemoval}) => {
    return (
        <div className="TrackList">
            {tracks.map((track)=> {
                return (
                    
                    <Track
                    track={track}
                    key={track.id}
                    onAdd={onAdd}
                    isRemoval={isRemoval}
                    onRemove={onRemove}
                    />
                    

            );
        })}
    </div>
);
};

export default TrackList;