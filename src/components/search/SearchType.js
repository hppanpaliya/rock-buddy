import React from 'react';
import Form from 'react-bootstrap/Form'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SearchType = (props) =>{
    /**This component sets the search type (artists, albums, tracks) and updates the state in Search.
     * The state update hook setSearchType is passed in from Search as props
     */
    
    let setSearchType = props.setSearchType
    let setSearchData = props.setSearchData
    let setPage = props.setPage
    let searchType = props.searchType
    let setSearchTerm = props.setSearchTerm

    let onSiteChanged = (e) => {
        setPage(0) //must reset pagnation if search type changes
        setSearchData(undefined) //need to clear the old state search data when the search type is changed
        setSearchType(e.target.value) //sets new search type value in state
    };
  
    return(
      <div id="search-type-div">

        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchType}
            label="Category"
            onChange={onSiteChanged}
          >
            <MenuItem value={'artists'}>Artists</MenuItem>
            <MenuItem value={'albums'}>Albums</MenuItem>
            <MenuItem value={'songs'}>Songs</MenuItem>
          </Select>
        </FormControl>

      </div>

    )
};

export default SearchType;