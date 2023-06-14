import React, {useState, useCallback} from 'react';
import './SearchBar.css'

function SearchBar({onSearch}){
    const [searchValue,setSearchValue] = useState("");

    const handleSearchChange = useCallback(
        (e) => {
            setSearchValue(e.target.value);
        }, );

    const search = useCallback(() =>{
        onSearch(searchValue);

        }, [onSearch, searchValue]);
    
    return (
        <>
        <form>
            <input 
                type="text" 
                id="searchBar" 
                name="searchbar" 
                placeholder="Song/Artist/Album"
                onChange={handleSearchChange} 
                autocomplete='off'
            />
        </form>
        <button 
            id='songSearch' 
            class="searchButton" 
            onClick={search}
        >SEARCH
        </button>
        </>
    )
}

export default SearchBar;