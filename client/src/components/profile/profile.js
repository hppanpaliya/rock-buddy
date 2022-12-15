import React, {useState} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import noImg from '../../img/notFound.jpg'
import SpotifyAuth from './spotifyAuth';

import storage from '../firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



import axios from 'axios';

const Profile = (props) =>{
    
  const userInfo = useSelector((state) => state.auth).user;
  let email = userInfo.email;
  let userName = userInfo.username
  let profilePic = userInfo.profilePic || noImg

	const [picBinary, setPicBinary] = useState(null);

  function handleFBUpload(file) {
    //this function uploads the blob to firebase
      if (!file) {
      alert("Please choose a file first!")
      }
     
      const storageRef = ref(storage, `/profiles/${userInfo.uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
            "state_changed",
            (snapshot) => {
      //         const percent = Math.round(
      //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //         );
       
              // update progress
      //         setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
              });
            }
          );

    }

	const handlePictureUpload = async (e) => { 
		const formData = new FormData();
		formData.append('file', e.target.files[0]);

    //1. send image to API for imagemagick
		const response = await axios.post(
			'http://localhost:4000/users/profilepic',
			formData, 
			{
				responseType: 'blob',
			}
		);
    console.log(response.data)
		setPicBinary(URL.createObjectURL(response.data));
		console.log(picBinary);

    //2. convert blob from API to file
    // let file = new File([response.data], `${userInfo.uid}`, { type: "image/jpeg", lastModified: Date.now() })

    // console.log(file)

    //3. upload file to firebase
    handleFBUpload(response.data)

	};


    return(
            <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
              <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol lg="9" xl="7">
                    <MDBCard>
                      <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                          <MDBCardImage src={profilePic}
                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
						</div>
                        <div className="ms-3" style={{ marginTop: '130px' }}>
                          <MDBTypography tag="h5">{userName}</MDBTypography>
                          <MDBCardText>{email}</MDBCardText>
                        </div>
                      </div>
                      <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                            Edit profile
                        </MDBBtn>

                        <SpotifyAuth></SpotifyAuth>
                    
                        </div>
                      </div>
                      <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                          <p className="lead fw-normal mb-1">About</p>
                          <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                            <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                            <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                          <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                        </div>
                        <MDBRow>
                          <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                              alt="image 1" className="w-100 rounded-3" />
                          </MDBCol>
                          <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                              alt="image 1" className="w-100 rounded-3" />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="g-2">
                          <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                              alt="image 1" className="w-100 rounded-3" />
                          </MDBCol>
                          <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                              alt="image 1" className="w-100 rounded-3" />
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
			  <div>
					<input type='file' name='file' onChange={(e) => { handlePictureUpload(e)}}/>
					{picBinary ? <img src={picBinary}></img> : "No Pic" }
			  </div>
            </div>
    )
    
};

export default Profile;