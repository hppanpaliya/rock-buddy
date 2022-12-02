import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


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


	const ArtistPage = () => {
		return (
			<Card style={{ 
				width: '52rem',
				align: 'center',
				marginLeft: 'auto',
				marginRight: 'auto',
				}}>
				<Card.Header>
					<h1>{infoData.name}</h1>
				</Card.Header>
				<Card.Body>
					<Card.Img style={{width: '66%'}} src={infoData.images[0].url} />
					<Card.Text>
						<h3>Genres</h3>
						<ListGroup style={{width: '12rem', align: 'center', marginLeft: 'auto', marginRight: 'auto',}}>
							{ 
								infoData.genres.map((genre) => { 
									genre = genre.split(" ").map(word => { return word[0].toUpperCase() + word.substring(1)}).join(" ")
									return(
										<ListGroup.Item>{genre}</ListGroup.Item>
									)									
								})
							}
						</ListGroup>
						<h3>Followers: {infoData.followers.total}</h3>
					</Card.Text>
				</Card.Body>
			</Card>
		);
	};
	const AlbumPage = () => {
		return (
			<div>
				<h2>{infoData.name}</h2>
				<p>Album ID: {id}</p>
			</div>
		);
	};
	const TrackPage = () => {
		return (
			<div>
				<h2>{infoData.name}</h2>
				<p>Track ID: {id}</p>
			</div>
		);
	};



	if(!infoData || Object.keys(infoData).length === 0) return <p>Loading, please wait... </p>;
    else {
		if(category === "artist") return <ArtistPage />;
		else if(category === "album") return <AlbumPage />;
		else if(category === "track") return <TrackPage />;
		else return <p>Invalid category</p>;

	}



        // <div>
        //     <p>I am the Info component.</p>
        //     <p>The id is: {id}</p>
        //     <p>The category is: {category}</p>
        //     <p>Album: {infoData.name}</p>
        //     {/* <p>Genres: {infoData.genres.length !== 0 ? infoData.genres : "No Genres Listed"}</p> */}
        //     <img src={infoData.images[0].url}></img>
        //     <p>Release Date: {infoData.release_date}</p>
        
        // </div>

    
};

export default InfoPage;