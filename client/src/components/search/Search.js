import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ResultCard from './ResultCard';
import SearchType from './SearchType';
import Container from 'react-bootstrap/Container';
import SearchBar from './SearchBar';
import Pagnation from './Pagnation';


const Search = (props) => {
    const [loading, setLoading] = useState(true);
    const [searchType, setSearchType] = useState('artists') //default search type upon page referesh
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
            console.log(`in fetch searchType: ${searchType}`);
    
            const data = await axios({
                method: 'GET',
                url: `http://localhost:4000/search/${searchType}?term=${searchTerm}&page=${page}`,
                headers: { "Content-Type": "application/json" }, 
            });

            if(data.data.items.length === 0){
              set404Flag(true);
            }

            else{
              setSearchData(data.data.items);
              setNext(data.data.next);
              setPrevious(data.data.previous);
              set400Flag(false);
              set404Flag(false);
            }

            setLoading(false);

          } catch (e) {
            console.log(e);
            if(e.message && e.message.indexOf('400')){
                set400Flag(true);
            }
          }
        }

        if (searchTerm) {
          console.log('searchTerm is set');
          fetchData();
        }
        else{
          setLoading(false)
        }
      }, [searchTerm, searchType, page, setPage]);

 
    if (loading) {
      return (
          <div>
            <h2>Loading....</h2>
          </div>
        );
      }

    else if(_404Flag){
      return(
        <div>
            <SearchType setSearchType={setSearchType} setSearchData={setSearchData} setPage={setPage}></SearchType>
            <SearchBar setSearchTerm={setSearchTerm} setPage={setPage} term={searchType}/>
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
          <SearchType setSearchType={setSearchType} setSearchData={setSearchData} setPage={setPage}></SearchType>
          <SearchBar setSearchTerm={setSearchTerm} setPage={setPage} term={searchType}/>
          <br />
          <br />
          <h1>400: Invalid Search Term</h1>
          <p>Please try another term</p>
        </div>
      )
    }
        
    return(
      <div>
        <SearchType setSearchType={setSearchType} setSearchData={setSearchData} setPage={setPage}></SearchType>
        <SearchBar setSearchTerm={setSearchTerm}  setPage={setPage} term={searchType}/>
        <Pagnation setPage={setPage} page={page} next={next} prev={previous}></Pagnation>
        <Container style={{alignContent: "center"}}>
          <ResultCard searchData={searchData} searchType={searchType}></ResultCard>
        </Container>    
      </div>
      )
}
   
  
export default Search;