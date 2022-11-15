import React from 'react';

const SearchBar = (props) =>{
    /**This component builds a search bar, and dynamically sets the search term state value 
     * to whatever is currently in the search bar. the search term state is set everytime a 
     * new character is added or deleted
     */
      const handleChange = (e) => {
          props.setSearchTerm(e.target.value);
        };
        
      return (
        <form
          method='POST '
          onSubmit={(e) => {
            e.preventDefault();
          }}
          name='formName'
          className='center'
        >
  
        <label>
            <span>Search {props.term}: </span>
            <input
              autoComplete='off'
              type='text'
              name='searchTerm'
              onChange={handleChange}
            />
          </label>
        </form>
      );
  };

  export default SearchBar;