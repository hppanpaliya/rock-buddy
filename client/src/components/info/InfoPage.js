import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

import '../../InfoPage.css';

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
		const artistData = infoData.foundArtist;
		const artistTopTracks = infoData.foundArtistTopTracks;
		return (
			<div>
			<Card style={{ 
				width: '52rem',
				align: 'center',
				marginLeft: 'auto',
				marginRight: 'auto',
				}}>
				<Card.Header>
					<h1>{artistData.name}</h1>
				</Card.Header>
				<Card.Body>
					<Card.Img style={{width: '66%'}} src={artistData.images[0].url} />
						<h3>Genres</h3>
						<ListGroup style={{width: '12rem', align: 'center', marginLeft: 'auto', marginRight: 'auto',}}>
							{ 
								artistData.genres.map((genre) => { 
									genre = genre.split(" ").map(word => { return word[0].toUpperCase() + word.substring(1)}).join(" ")
									return(
										<ListGroup.Item>{genre}</ListGroup.Item>
									)									
								})
							}
						</ListGroup>
						<h3>Followers: {artistData.followers.total}</h3>
					</Card.Body>
				</Card>

					<Carousel
						style={{
							width: '42rem',
							align: 'center',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						{
							artistTopTracks.tracks.reduce( (acc, track, index, array) => {
								if( index % 2 === 0) acc.push(array.slice(index, index + 2));
								return acc;
							}, [])
							.map((track) => {
								console.log(track);
								return (
										<Carousel.Item>
											<Stack
											    direction="horizontal"
												className="h-100 justify-content-center align-items-center"
												gap={3}
												max-width="10%"
												max-height="10%"
											>
												<Card>
													<img
														className="d-block w-100"
														src={track[0].album.images[0].url}
														alt="First slide"
														/>
														{/* <Carousel.Caption className='carousel-caption'>
															<h3>{track[0].name}</h3>
															<p>{track[0].album.name}</p>
														</Carousel.Caption>		 */}


												</Card>
												{
													track.length === 2
													?
													<Card>
														<img
															className="d-block w-100"
															src={track[1].album.images[0].url}
															alt="First slide"
															/>
														{/* <Carousel.Caption className='carousel-caption'>
															<h3>{track[1].name}</h3>
															<p>{track[1].album.name}</p>
														</Carousel.Caption> */}
													</Card>
													: null
												}

											</Stack>
										</Carousel.Item>
								)
							})
						}
					</Carousel>
			
			</div>
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

};

export default InfoPage;