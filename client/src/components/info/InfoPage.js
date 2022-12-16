import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ArtistPage from './ArtistPage';
import AlbumPage from './AlbumPage';
import TrackPage from './TrackPage';

import '../../InfoPage.css';

const InfoPage = () => { 
    
    let { id } = useParams();
    let { category } = useParams();
    // let nav = useNavigate();

    const [infoData, setInfoData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        function validateParams() {
            console.log("Validating parameters");
            try { 
                if(!id || id.trim().length === 0) throw Error(`A valid ID must be provided!`);
                if(!category || category.trim().length ===0) throw new Error(`A category must be provided!`);
                if(category.trim() !== "artist" && category.trim() !== "album" && category.trim() !== "track")
                    throw new Error(`The category must be album, artist, or track!`);
            } catch (e) { 
                console.log("Invalid Paramter: ", e);
				setErrorMessage(e.message);
				// nav("/404")
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
				setErrorMessage(e.message);
            }
        }
        validateParams();
        fetchData();

    }, [category, id]);
	console.log(infoData);
	if(errorMessage) return <p>{errorMessage}</p>;
	else if(!infoData || Object.keys(infoData).length === 0) return <p>Loading, please wait... </p>;
    else {
		if(category === "artist") return <ArtistPage infoData={infoData} />;
		else if(category === "album") return <AlbumPage infoData={infoData}/>;
		else if(category === "track") return <TrackPage infoData={infoData}/>;
		else return <p>Invalid category</p>;

	}

};

export default InfoPage;