import React, {useState, useEffect} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import noImg from '../../img/notFound.jpg'
import SpotifyAuth from './spotifyAuth';

import storage from '../firebase/storage';
import firebaseApp  from '../firebase/Firebase';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { Button } from 'react-bootstrap';


import axios from 'axios';

const Profile = (props) =>{
    
  const userInfo = useSelector((state) => state.auth).user;
  let email = userInfo.email;
  let userName = userInfo.username
  let photoURL = userInfo.photoURL
  const [profilePic, setProfilePic] = useState(photoURL)
	const [picBinary, setPicBinary] = useState(null);
  const [noFileError, setFileNoError] = useState(true)

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
                setProfilePic(url)
                firebaseApp.auth().currentUser.updateProfile({
                  photoURL: url
                })
                firebaseApp.firestore().collection("users").doc(userName).update({photoURL: url}).then(() => {console.log("Document successfully written!");}).catch((error) => {console.error("Error writing document: ", error);});
              });
            }
          );
    }

	const handlePictureUpload = async (e) => { 
		const formData = new FormData();
    if(! e.target.files){
      setFileNoError(false)
      return
    }
    if(e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png'){
      setFileNoError(false)
      return
    }

    setFileNoError(true)
		formData.append('file', e.target.files[0]);

    //1. send image to API for imagemagick
		const response = await axios.post(
			'http://localhost:4000/users/profilepic',
			formData, 
			{
				responseType: 'blob',
			}
		);
		setPicBinary(URL.createObjectURL(response.data));

    //2. upload file to firebase
    handleFBUpload(response.data);


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
                          <h1>{email}</h1>
                        </div>

                      </div>
                      <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <label for="uploadProfile" hidden={true}>Upload</label>
                          <input id="uploadProfile" type='file' name='file' onChange={(e) => { handlePictureUpload(e)}}/>
                          <div hidden={noFileError}><p>Error - must submit a png/jpg file</p></div>
			                   </div>
                        </div>
                      </div>
                      <MDBCardBody className="text-black p-4">
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
    )
    
};

export default Profile;