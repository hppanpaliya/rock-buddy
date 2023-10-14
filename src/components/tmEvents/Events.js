import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import EventCard from './EventCard';
import Pagnation from '../search/Pagnation';

const AllEvents = (props) =>{
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [next, setNext] = useState(true);
    const [previous, setPrevious] = useState(null)
    const [eventsData, setEventsData] = useState(undefined)
    const [_404Flag, set404Flag] = useState(false);

    useEffect(() => {
        console.log('search useEffect fired');

        async function fetchData() {
          try {
            setLoading(true)

            const data = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_BACKEND_URL}/events/all?page=${page}`,
                headers: { "Content-Type": "application/json" }, 
            });

            if(data.data._embedded.events.length === 0){
              set404Flag(true);
            }

            else{
              setEventsData(data.data._embedded.events);
              set404Flag(false);
            }

            if(page == 19){
                setNext(null)
                setPrevious(true)
            }

            else if(page > 0){
                setPrevious(true)
                setNext(true)
            }
            else if(page==0){
                setPrevious(null)
            }
           

            setLoading(false);

          } catch (e) {
            console.log(e);
            set404Flag(true)
          }
        }

        fetchData()

      }, [page, setPage]);

 
    if (loading) {
      return (
          <div>
            <img src="https://i.gifer.com/ZKZg.gif" alt="loading" id="loading"></img>
          </div>
        );
      }

    else if(_404Flag){
      return(
        <div>
            <br />
            <br />
            <h1>Sorry, no events found</h1>
        </div>
        )
      }

 
        
    return(
      <div>
        <h1>Upcoming Rock Events</h1>
        <Container style={{alignContent: "center"}}>
          <EventCard eventsData={eventsData}></EventCard>
        </Container>
        <Pagnation setPage={setPage} page={page} next={next} prev={previous}></Pagnation>
      </div>
      )


};

export default AllEvents;