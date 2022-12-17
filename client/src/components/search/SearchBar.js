import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = (props) =>{
    /**This component builds a search bar, and dynamically sets the search term state value 
     * to whatever is currently in the search bar. the search term state is set everytime a 
     * new character is added or deleted
     */
      const handleChange = (e) => {
          props.setSearchTerm(e.target.value.trim());
      };
        
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
            />
            <Form.Text className="text-muted">
            Search {props.term}
            </Form.Text>
          </Form.Group>
        </Form>
      );
  };

  export default SearchBar;