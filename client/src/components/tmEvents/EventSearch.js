import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SearchBar from "../search/SearchBar";
import Pagnation from '../search/Pagnation';
import EventCard from './EventCard';

const EventSearch = (props) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null)
    const [searchData, setSearchData] = useState(undefined)
    const [_404Flag, set404Flag] = useState(false);
    const [_400Flag, set400Flag] = useState(false);

    useEffect(() => {
        console.log('search useEffect fired');

        async function fetchData() {
          try {
            console.log(`in fetch searchTerm: ${searchTerm}`);
    
            const data = await axios({
                method: 'GET',
                url: `http://localhost:4000/search/${searchType}?term=${searchTerm}&page=${page}`,
                headers: { "Content-Type": "application/json" }, 
            });

            if(data.data._embedded.events.length === 0){
                set404Flag(true);
              }
  

            else{
                setSearchData(data.data._embedded.events);
                set404Flag(false);
                set400Flag(false)
            }

            setLoading(false);

          } catch (e) {
            console.log(e);
            set400Flag(true)
          }
        }

        if (searchTerm) {
          console.log('searchTerm is set');
          fetchData();
        }
        else{
          setLoading(false)
        }
      }, [searchTerm, page, setPage]);

 
    if (loading) {
      return (
          <div>
            <img src="https://i.gifer.com/ZKZg.gif" alt="loading"></img>
          </div>
        );
      }

    else if(_404Flag){
      return(
        <div>
            <SearchBar setSearchTerm={setSearchTerm} setPage={setPage}/>
            <br />
            <br />
            <h1>Sorry, no results found</h1>
            <p>Please try another search term.</p>
        </div>
        )
      }

    else if (_400Flag){
      return(
        <div>
          <SearchBar setSearchTerm={setSearchTerm} setPage={setPage} />
          <br />
          <br />
          <h1>400: Invalid Search Term</h1>
          <p>Please try another term</p>
        </div>
      )
    }
        
    return(
      <div>
        <SearchBar setSearchTerm={setSearchTerm}  setPage={setPage} />
        <Pagnation setPage={setPage} page={page} next={next} prev={previous}></Pagnation>
        <Container style={{alignContent: "center"}}>
            <EventCard eventsData={searchData}></EventCard>
        </Container>    
      </div>
      )
};

export default EventSearch
   