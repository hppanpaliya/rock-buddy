import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InfoPage = () => { 
    
    let { id } = useParams();
    let { category } = useParams();
    let nav = useNavigate();

    const [infoData, setInfoData] = useState({});


    useEffect(() => {

        function validateParams() {
            console.log("Validating parameters");
            try { 
                if(!id || id.trim().length === 0) throw `Error: A valid ID must be provided!`;
                if(!category || category.trim().length ===0) throw `Error: A category must be provided!`;
                if(category.trim() !== "artist" && category.trim() !== "album" && category.trim() !== "track")
                    throw `Error: The category must be album, artist, or track!`;
            } catch (e) { 
                console.log("Invalid Paramter: ", e);
            }
        }

        async function fetchData() { 
            console.log("Fetching data");
            try { 
                const response = await axios.get(`http://localhost:4000/info/${category}/${id}`,
                    { headers: { "Content-Type": "application/json"}} );
                setInfoData(response.data);
            } catch (e) { 
                console.log("Failed to fetch data: ", e);
            }
        }
        validateParams();
        fetchData();

    }, [category, id]);



    return(
        <div>
            <p>I am the ArtistPage component.</p>
            <p>The id is: {id}</p>
            <p>The category is: {category}</p>
            <p>Album: {infoData.name}</p>
            <p>Genres: {infoData.genres.length !== 0 ? infoData.genres : "No Genres Listed"}</p>
            <img src={infoData.images[0].url}></img>
            <p>Release Date: {infoData.release_date}</p>
        
        </div>

    )
};

export default InfoPage;