import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = (props) =>{
    /**This component builds a search bar, and dynamically sets the search term state value 
     * to whatever is currently in the search bar. the search term state is set everytime a 
     * new character is added or deleted
     */

    let setSearchData = props.setSearchData
    let setPage = props.setPage

    let events = props.events || null

    let handleChange

    if(events){
       handleChange = (e) => {
        props.setSearchTerm(e.target.value.trim());
        setPage(0) //must reset pagnation if search type changes
        setSearchData(undefined) //need to clear the old state search data when the search type is changed
       }

    }else{
        handleChange = (e) => {
        props.setSearchTerm(e.target.value.trim());
        setPage(0) //must reset pagnation if search type changes
        setSearchData(undefined) //need to clear the old state search data when the search type is changed
      };

    }

        
      return (
        <Form
          method='POST '
          onSubmit={(e) => {
            e.preventDefault();
          }}
          name='formName'
          className='center'
        >
          <Form.Group>

            <Form.Control
              autoComplete='off'
              type='text'
              name='searchTerm'
              onChange={handleChange}
              placeHolder={'Search ' + props.term}
              id='searchinput'
            />
            <Form.Label hidden={true} for='searchinput'>Search</Form.Label>
            <Form.Text className="text-muted">
            Search {props.term}
            </Form.Text>
          </Form.Group>
        </Form>
      );
  };

  export default SearchBar;